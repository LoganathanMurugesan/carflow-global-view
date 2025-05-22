import { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import { facilityData, vehicleMovements } from '@/data/mockData';
import { FacilityType } from '@/types/supply-chain';
import NodeDetailsPanel from './NodeDetailsPanel';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';
import LayoutController from './LayoutController';

// Import layout extensions
import cola from 'cytoscape-cola';
import dagre from 'cytoscape-dagre';
import klay from 'cytoscape-klay';
import cise from 'cytoscape-cise';

// Register extensions
Cytoscape.use(cola);
Cytoscape.use(dagre);
Cytoscape.use(klay);
Cytoscape.use(cise);

interface GraphVisualizationProps {
  searchQuery: string;
  selectedNode: string | null;
  onNodeSelect: (nodeId: string) => void;
  zoomLevel: number;
}

interface GraphNode {
  data: {
    id: string;
    label: string;
    type: string;
    details?: any;
  };
}

interface GraphEdge {
  data: {
    id: string;
    source: string;
    target: string;
    label: string;
    status?: string;
  };
}

// New, more vibrant color scheme inspired by the image
const getNodeColor = (facilityType: FacilityType): string => {
  switch (facilityType) {
    case FacilityType.MANUFACTURING:
      return '#F97316'; // Bright orange from image
    case FacilityType.DISTRIBUTION:
      return '#33C3F0'; // Vibrant sky blue from image
    case FacilityType.SHOWROOM:
      return '#9b87f5'; // Purple
    case FacilityType.SUPPLIER:
      return '#FFC857'; // Yellow
    case FacilityType.BUYER:
      return '#E07A5F'; // Coral
    default:
      return '#ffffff';
  }
};

const LAYOUTS = {
  cose: {
    name: 'cose',
    idealEdgeLength: 120,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 50,
    randomize: false,
    componentSpacing: 120,
    nodeRepulsion: 450000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  },
  cola: {
    name: 'cola',
    animate: true,
    refresh: 1,
    maxSimulationTime: 4000,
    fit: true,
    padding: 30,
    nodeDimensionsIncludeLabels: false,
    convergenceThreshold: 0.01
  },
  dagre: {
    name: 'dagre',
    rankDir: 'TB',
    ranker: 'tight-tree',
    nodeSep: 50,
    rankSep: 100,
    padding: 10,
    spacingFactor: 1.2
  },
  klay: {
    name: 'klay',
    nodeDimensionsIncludeLabels: true,
    fit: true,
    padding: 20,
    klay: {
      spacing: 40,
      direction: 'DOWN'
    }
  },
  cise: {
    name: 'cise',
    fit: true,
    padding: 30,
    clusters: [],
    randomize: true
  },
  breadthfirst: {
    name: 'breadthfirst',
    directed: true,
    fit: true,
    padding: 30,
    spacingFactor: 1.2,
    avoidOverlap: true
  },
  concentric: {
    name: 'concentric',
    fit: true,
    padding: 30,
    startAngle: 3/2 * Math.PI,
    sweep: undefined,
    clockwise: true,
    equidistant: false,
    minNodeSpacing: 50
  }
};

const GraphVisualization = ({ searchQuery, selectedNode, onNodeSelect, zoomLevel }: GraphVisualizationProps) => {
  const cyRef = useRef<Cytoscape.Core | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any>(null);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [currentLayout, setCurrentLayout] = useState<string>('cose');
  const [expandedNeighborhoods, setExpandedNeighborhoods] = useState<Set<string>>(new Set());
  const [contextMenuPosition, setContextMenuPosition] = useState<{x: number, y: number} | null>(null);
  const [contextMenuNode, setContextMenuNode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Convert facility data to graph nodes
  const nodes: GraphNode[] = facilityData.map(facility => ({
    data: {
      id: facility.id,
      label: facility.name,
      type: facility.type,
      details: facility,
      expanded: expandedNeighborhoods.has(facility.id)
    }
  }));

  // Convert vehicle movements to graph edges
  const edges: GraphEdge[] = vehicleMovements.map(movement => ({
    data: {
      id: `edge-${movement.id}`,
      source: movement.sourceFacilityId,
      target: movement.destinationFacilityId,
      label: movement.cargo,
      status: movement.status
    }
  }));

  // Filter nodes based on search query
  const filteredNodes = searchQuery
    ? nodes.filter(node => 
        node.data.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.data.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : nodes;

  // Filter edges based on filtered nodes
  const filteredNodeIds = new Set(filteredNodes.map(node => node.data.id));
  const filteredEdges = edges.filter(edge => 
    filteredNodeIds.has(edge.data.source) && filteredNodeIds.has(edge.data.target)
  );

  // Enhanced stylesheet for better visualization
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': (ele: any) => getNodeColor(ele.data('type')),
        'label': 'data(label)',
        'color': '#ffffff',
        'text-outline-color': '#0b1420',
        'text-outline-width': 1,
        'font-size': 11,
        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '100px',
        'width': 80,
        'height': 80,
        'border-color': '#ffffff',
        'border-width': (ele: any) => ele.id() === selectedNode ? 3 : 1,
        'border-opacity': (ele: any) => ele.id() === selectedNode ? 1 : 0.5,
        'text-margin-y': 0,
        'shape': (ele: any) => {
          switch(ele.data('type')) {
            case FacilityType.MANUFACTURING: return 'ellipse';
            case FacilityType.DISTRIBUTION: return 'diamond';
            case FacilityType.SHOWROOM: return 'round-rectangle';
            case FacilityType.SUPPLIER: return 'hexagon';
            case FacilityType.BUYER: return 'pentagon';
            default: return 'ellipse';
          }
        }
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': (ele: any) => {
          switch (ele.data('status')) {
            case 'in-transit':
              return '#00ffcc';
            case 'completed':
              return '#9b87f5';
            case 'scheduled':
              return '#0ec1eb';
            default:
              return '#8E9196'; // Light gray color from image
          }
        },
        'target-arrow-color': (ele: any) => {
          switch (ele.data('status')) {
            case 'in-transit':
              return '#00ffcc';
            case 'completed':
              return '#9b87f5';
            case 'scheduled':
              return '#0ec1eb';
            default:
              return '#8E9196';
          }
        },
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': 10,
        'color': '#e5deff',
        'text-outline-color': '#0b1420',
        'text-outline-width': 2,
        'text-background-opacity': 0.7,
        'text-background-color': '#0b1420',
        'text-background-padding': 3,
        'text-wrap': 'wrap',
        'text-max-width': '120px',
        'edge-text-rotation': 'autorotate',
        'text-rotation': 'none',
        'arrow-scale': 1.5,
        'target-distance-from-node': 5,
        // Position text away from the edge line to avoid intersection
        'text-margin-y': -10,
        'source-endpoint': 'outside-to-node',
        'target-endpoint': 'outside-to-node'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'border-color': '#ffffff',
        'border-width': 3,
        'border-opacity': 1,
        'background-opacity': 0.9,
        'shadow-blur': 10,
        'shadow-color': '#ffffff',
        'shadow-opacity': 0.5,
        'shadow-offset-x': 0,
        'shadow-offset-y': 0
      }
    },
    {
      selector: 'node.highlighted',
      style: {
        'border-color': '#00ffcc',
        'border-width': 3,
        'border-opacity': 1,
        'background-opacity': 1,
        'shadow-blur': 15,
        'shadow-color': '#00ffcc',
        'shadow-opacity': 0.6,
        'shadow-offset-x': 0,
        'shadow-offset-y': 0,
        'z-index': 999
      }
    },
    {
      selector: 'edge.highlighted',
      style: {
        'width': 3,
        'line-color': '#00ffcc',
        'target-arrow-color': '#00ffcc',
        'shadow-blur': 10,
        'shadow-color': '#00ffcc',
        'shadow-opacity': 0.5,
        'shadow-offset-x': 0,
        'shadow-offset-y': 0,
        'z-index': 999
      }
    }
  ];

  // Effect for when selected node changes
  useEffect(() => {
    if (cyRef.current && selectedNode) {
      const node = cyRef.current.getElementById(selectedNode);
      if (node.length > 0) {
        const position = node.renderedPosition();
        
        setPanelPosition({
          x: position.x + 100,
          y: position.y - 50
        });
      }
    }
  }, [selectedNode]);

  // Apply zoom level
  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.zoom(zoomLevel);
      cyRef.current.center();
    }
  }, [zoomLevel]);

  // Apply layout
  useEffect(() => {
    if (cyRef.current) {
      // @ts-ignore
      const layoutOptions = LAYOUTS[currentLayout];
      const layout = cyRef.current.layout(layoutOptions);
      layout.run();
      toast(`Applied ${currentLayout} layout`);
    }
  }, [currentLayout]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    const container = document.getElementById('graph-container');
    
    if (!document.fullscreenElement) {
      if (container?.requestFullscreen) {
        container.requestFullscreen().catch(err => {
          toast.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Handle expanding/collapsing neighborhoods
  const toggleNeighborhood = (nodeId: string) => {
    if (cyRef.current) {
      const node = cyRef.current.getElementById(nodeId);
      const neighbors = node.neighborhood();
      
      // Toggle highlight state
      if (expandedNeighborhoods.has(nodeId)) {
        // Remove highlighting
        neighbors.removeClass('highlighted');
        node.removeClass('highlighted');
        
        // Update state
        const newExpanded = new Set(expandedNeighborhoods);
        newExpanded.delete(nodeId);
        setExpandedNeighborhoods(newExpanded);
      } else {
        // Add highlighting
        neighbors.addClass('highlighted');
        node.addClass('highlighted');
        
        // Update state
        const newExpanded = new Set(expandedNeighborhoods);
        newExpanded.add(nodeId);
        setExpandedNeighborhoods(newExpanded);
      }
    }
  };

  // Handle Cytoscape instance creation
  const handleCytoscapeRef = (cy: Cytoscape.Core) => {
    cyRef.current = cy;
    
    // Register node click event
    cy.on('tap', 'node', (event) => {
      const node = event.target;
      onNodeSelect(node.id());
      setNodeDetails(node.data('details'));
      
      const position = node.renderedPosition();
      setPanelPosition({
        x: position.x + 100,
        y: position.y - 50
      });
    });
    
    // Register background click event
    cy.on('tap', (event) => {
      if (event.target === cy) {
        onNodeSelect('');
        setNodeDetails(null);
        setContextMenuPosition(null);
        setContextMenuNode(null);
      }
    });

    // Register right click for context menu
    cy.on('cxttap', 'node', (event) => {
      const node = event.target;
      const position = event.renderedPosition;
      setContextMenuPosition({
        x: position.x,
        y: position.y
      });
      setContextMenuNode(node.id());
      event.preventDefault();
    });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && contextMenuPosition) {
        setContextMenuPosition(null);
        setContextMenuNode(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenuPosition]);

  return (
    <div id="graph-container" className="w-full h-[calc(100vh-220px)] relative">
      {/* Layout controls using LayoutController */}
      <div className="absolute top-2 left-2 z-10">
        <LayoutController 
          currentLayout={currentLayout}
          onLayoutChange={setCurrentLayout}
          availableLayouts={Object.keys(LAYOUTS)}
        />
      </div>
      
      {/* Fullscreen toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 z-10 bg-[#0b1420]/90 border border-[#0ec1eb]/30"
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </Button>

      {/* Main graph visualization */}
      <CytoscapeComponent
        elements={[...filteredNodes, ...filteredEdges]}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={LAYOUTS[currentLayout]}
        cy={handleCytoscapeRef}
        minZoom={0.1}
        maxZoom={3}
        boxSelectionEnabled={true}
      />

      {/* Context menu */}
      {contextMenuPosition && contextMenuNode && (
        <div
          className="absolute z-50 bg-[#0b1420]/95 border border-[#0ec1eb]/30 rounded-md shadow-lg p-2 w-48"
          style={{
            left: `${contextMenuPosition.x}px`,
            top: `${contextMenuPosition.y}px`,
          }}
        >
          <button
            className="w-full text-left px-3 py-2 text-sm text-[#0ec1eb] hover:bg-[#121a2b] rounded-md"
            onClick={() => {
              toggleNeighborhood(contextMenuNode);
              setContextMenuPosition(null);
            }}
          >
            {expandedNeighborhoods.has(contextMenuNode) ? 'Collapse Neighborhood' : 'Expand Neighborhood'}
          </button>
          <button
            className="w-full text-left px-3 py-2 text-sm text-[#0ec1eb] hover:bg-[#121a2b] rounded-md"
            onClick={() => {
              if (cyRef.current) {
                cyRef.current.center(cyRef.current.getElementById(contextMenuNode));
                cyRef.current.zoom(1.5);
              }
              setContextMenuPosition(null);
            }}
          >
            Center & Zoom
          </button>
          <button
            className="w-full text-left px-3 py-2 text-sm text-[#0ec1eb] hover:bg-[#121a2b] rounded-md"
            onClick={() => {
              onNodeSelect(contextMenuNode);
              setNodeDetails(cyRef.current?.getElementById(contextMenuNode).data('details'));
              setContextMenuPosition(null);
            }}
          >
            Show Details
          </button>
        </div>
      )}

      {/* Node details panel */}
      {nodeDetails && (
        <NodeDetailsPanel 
          details={nodeDetails} 
          position={panelPosition} 
          onClose={() => {
            onNodeSelect('');
            setNodeDetails(null);
          }}
        />
      )}
    </div>
  );
};

export default GraphVisualization;
