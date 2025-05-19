import { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import { facilityData, vehicleMovements } from '@/data/mockData';
import { FacilityType } from '@/types/supply-chain';
import NodeDetailsPanel from './NodeDetailsPanel';

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

const GraphVisualization = ({ searchQuery, selectedNode, onNodeSelect, zoomLevel }: GraphVisualizationProps) => {
  const cyRef = useRef<Cytoscape.Core | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any>(null);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });

  // Convert facility data to graph nodes
  const nodes: GraphNode[] = facilityData.map(facility => ({
    data: {
      id: facility.id,
      label: facility.name,
      type: facility.type,
      details: facility
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

  // Improved layout options for better visualization
  const layout = {
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
  };

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
        'text-margin-y': 0
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
    }
  ];

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
      }
    });
  };

  return (
    <div className="w-full h-[calc(100vh-220px)] relative">
      <CytoscapeComponent
        elements={[...filteredNodes, ...filteredEdges]}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={layout}
        cy={handleCytoscapeRef}
      />
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
