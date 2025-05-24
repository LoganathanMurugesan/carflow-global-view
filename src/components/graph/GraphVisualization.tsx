
import { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { facilityData, vehicleMovements } from '@/data/mockData';
import NodeDetailsPanel from './NodeDetailsPanel';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';
import LayoutController from './LayoutController';
import { 
  transformAirwaysDataToCytoscape, 
  filterCytoscapeElements,
  CytoscapeNode,
  CytoscapeEdge
} from '@/utils/cytoscapeDataTransform';

interface GraphVisualizationProps {
  searchQuery: string;
  selectedNode: string | null;
  onNodeSelect: (nodeId: string) => void;
  zoomLevel: number;
}

// Enhanced layout configurations optimized for Airways data
const LAYOUTS = {
  breadthfirst: {
    name: 'breadthfirst',
    directed: true,
    fit: true,
    padding: 50,
    spacingFactor: 1.5,
    avoidOverlap: true,
    animate: true,
    animationDuration: 500
  },
  grid: {
    name: 'grid',
    fit: true,
    padding: 40,
    avoidOverlap: true,
    rows: 3,
    columns: 5,
    animate: true,
    animationDuration: 500
  },
  cose: {
    name: 'cose',
    idealEdgeLength: 150,
    nodeOverlap: 30,
    refresh: 20,
    fit: true,
    padding: 60,
    randomize: false,
    componentSpacing: 150,
    nodeRepulsion: 500000,
    edgeElasticity: 120,
    animate: true,
    animationDuration: 1000
  },
  concentric: {
    name: 'concentric',
    fit: true,
    padding: 50,
    startAngle: 3/2 * Math.PI,
    clockwise: true,
    equidistant: false,
    minNodeSpacing: 80,
    animate: true,
    animationDuration: 800
  }
};

const GraphVisualization = ({ searchQuery, selectedNode, onNodeSelect, zoomLevel }: GraphVisualizationProps) => {
  const cyRef = useRef<any>(null);
  const [nodeDetails, setNodeDetails] = useState<any>(null);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [currentLayout, setCurrentLayout] = useState<string>('breadthfirst');
  const [contextMenuPosition, setContextMenuPosition] = useState<{x: number, y: number} | null>(null);
  const [contextMenuNode, setContextMenuNode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Transform Airways.json data using utility function
  const cytoscapeElements = transformAirwaysDataToCytoscape(facilityData, vehicleMovements);
  
  // Apply search filtering
  const filteredElements = filterCytoscapeElements(cytoscapeElements, searchQuery);
  
  console.log('GraphVisualization render:', {
    totalElements: cytoscapeElements.length,
    filteredElements: filteredElements.length,
    searchQuery,
    currentLayout
  });

  // Enhanced stylesheet using transformed data properties
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': (ele: any) => ele.data('color'),
        'label': 'data(label)',
        'color': '#ffffff',
        'text-outline-color': '#0b1420',
        'text-outline-width': 2,
        'font-size': 12,
        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '120px',
        'width': 90,
        'height': 90,
        'border-color': (ele: any) => ele.id() === selectedNode ? '#00ffcc' : '#ffffff',
        'border-width': (ele: any) => ele.id() === selectedNode ? 4 : 2,
        'border-opacity': 0.8,
        'shape': (ele: any) => ele.data('shape'),
        'transition-property': 'border-width, border-color',
        'transition-duration': '0.3s'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': (ele: any) => ele.data('weight') || 2,
        'line-color': (ele: any) => ele.data('color'),
        'target-arrow-color': (ele: any) => ele.data('color'),
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': 10,
        'color': '#e5deff',
        'text-outline-color': '#0b1420',
        'text-outline-width': 2,
        'text-background-opacity': 0.8,
        'text-background-color': '#0b1420',
        'text-background-padding': 4,
        'arrow-scale': 1.8,
        'source-endpoint': 'outside-to-node',
        'target-endpoint': 'outside-to-node',
        'transition-property': 'width, line-color',
        'transition-duration': '0.3s'
      }
    },
    {
      selector: 'node:hover',
      style: {
        'border-width': 5,
        'border-color': '#00ffcc',
        'border-opacity': 1,
        'z-index': 999
      }
    },
    {
      selector: 'edge:hover',
      style: {
        'width': 4,
        'z-index': 999
      }
    },
    {
      selector: 'node.highlighted',
      style: {
        'border-color': '#00ffcc',
        'border-width': 6,
        'border-opacity': 1,
        'background-opacity': 1,
        'z-index': 999
      }
    }
  ];

  // Enhanced node selection with details panel positioning
  useEffect(() => {
    if (cyRef.current && selectedNode) {
      const node = cyRef.current.getElementById(selectedNode);
      if (node.length > 0) {
        const position = node.renderedPosition();
        setPanelPosition({
          x: position.x + 120,
          y: position.y - 60
        });
        
        // Highlight connected edges
        const connectedEdges = node.connectedEdges();
        connectedEdges.addClass('highlighted');
        
        // Auto-center on selected node
        cyRef.current.animate({
          center: { eles: node },
          zoom: Math.max(zoomLevel, 1.2)
        }, {
          duration: 500
        });
      }
    }
  }, [selectedNode, zoomLevel]);

  // Apply zoom level with smooth animation
  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.animate({
        zoom: zoomLevel,
        center: cyRef.current.center()
      }, {
        duration: 300
      });
    }
  }, [zoomLevel]);

  // Apply layout with enhanced animations
  useEffect(() => {
    if (cyRef.current) {
      // @ts-ignore
      const layoutOptions = LAYOUTS[currentLayout];
      const layout = cyRef.current.layout(layoutOptions);
      layout.run();
      toast(`Applied ${currentLayout} layout`);
    }
  }, [currentLayout, filteredElements.length]);

  // Toggle fullscreen functionality
  const toggleFullscreen = () => {
    const container = document.getElementById('graph-container');
    
    if (!document.fullscreenElement) {
      if (container?.requestFullscreen) {
        container.requestFullscreen().catch(err => {
          toast.error(`Error enabling fullscreen: ${err.message}`);
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

  // Enhanced Cytoscape event handling
  const handleCytoscapeRef = (cy: any) => {
    cyRef.current = cy;
    
    console.log('Cytoscape initialized with elements:', {
      nodes: cy.nodes().length,
      edges: cy.edges().length
    });
    
    // Node click event with enhanced details
    cy.on('tap', 'node', (event: any) => {
      const node = event.target;
      const nodeId = node.id();
      onNodeSelect(nodeId);
      setNodeDetails(node.data('details'));
      
      // Clear previous highlights
      cy.elements().removeClass('highlighted');
      
      // Highlight clicked node and connections
      node.addClass('highlighted');
      node.connectedEdges().addClass('highlighted');
      
      const position = node.renderedPosition();
      setPanelPosition({
        x: position.x + 120,
        y: position.y - 60
      });
      
      toast(`Selected: ${node.data('label')}`);
    });
    
    // Background click to clear selection
    cy.on('tap', (event: any) => {
      if (event.target === cy) {
        onNodeSelect('');
        setNodeDetails(null);
        setContextMenuPosition(null);
        setContextMenuNode(null);
        cy.elements().removeClass('highlighted');
      }
    });

    // Enhanced hover effects
    cy.on('mouseover', 'node', (event: any) => {
      const node = event.target;
      setHoveredNode(node.id());
      document.body.style.cursor = 'pointer';
    });

    cy.on('mouseout', 'node', (event: any) => {
      setHoveredNode(null);
      document.body.style.cursor = 'default';
    });

    // Right-click context menu
    cy.on('cxttap', 'node', (event: any) => {
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setContextMenuPosition(null);
        setContextMenuNode(null);
        if (cyRef.current) {
          cyRef.current.elements().removeClass('highlighted');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="graph-container" className="w-full h-[calc(100vh-220px)] relative">
      {/* Layout controls */}
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

      {/* Main Cytoscape visualization */}
      <CytoscapeComponent
        elements={filteredElements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={LAYOUTS[currentLayout]}
        cy={handleCytoscapeRef}
        minZoom={0.2}
        maxZoom={4}
        boxSelectionEnabled={true}
        wheelSensitivity={0.3}
      />

      {/* Context menu */}
      {contextMenuPosition && contextMenuNode && (
        <div
          className="absolute z-50 bg-[#0b1420]/95 border border-[#0ec1eb]/30 rounded-md shadow-lg p-2 w-52"
          style={{
            left: `${contextMenuPosition.x}px`,
            top: `${contextMenuPosition.y}px`,
          }}
        >
          <button
            className="w-full text-left px-3 py-2 text-sm text-[#0ec1eb] hover:bg-[#121a2b] rounded-md"
            onClick={() => {
              if (cyRef.current) {
                const node = cyRef.current.getElementById(contextMenuNode);
                cyRef.current.animate({
                  center: { eles: node },
                  zoom: 2
                }, { duration: 500 });
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
          <button
            className="w-full text-left px-3 py-2 text-sm text-[#0ec1eb] hover:bg-[#121a2b] rounded-md"
            onClick={() => {
              if (cyRef.current) {
                const node = cyRef.current.getElementById(contextMenuNode);
                const neighbors = node.neighborhood();
                neighbors.addClass('highlighted');
                node.addClass('highlighted');
              }
              setContextMenuPosition(null);
            }}
          >
            Highlight Connections
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
            if (cyRef.current) {
              cyRef.current.elements().removeClass('highlighted');
            }
          }}
        />
      )}
    </div>
  );
};

export default GraphVisualization;
