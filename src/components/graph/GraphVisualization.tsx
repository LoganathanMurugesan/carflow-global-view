
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

const getNodeColor = (facilityType: FacilityType): string => {
  switch (facilityType) {
    case FacilityType.MANUFACTURING:
      return '#ff8c42';
    case FacilityType.DISTRIBUTION:
      return '#0ec1eb';
    case FacilityType.SHOWROOM:
      return '#9b87f5';
    case FacilityType.SUPPLIER:
      return '#00ffcc';
    case FacilityType.BUYER:
      return '#e5deff';
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

  // Cytoscape layout options
  const layout = {
    name: 'cose',
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  };

  // Cytoscape stylesheet
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': (ele: any) => getNodeColor(ele.data('type')),
        'label': 'data(label)',
        'color': '#ffffff',
        'text-outline-color': '#0b1420',
        'text-outline-width': 1,
        'font-size': 10,
        'width': 40,
        'height': 40,
        'text-valign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '80px',
        'border-color': '#0ec1eb',
        'border-width': (ele: any) => ele.id() === selectedNode ? 3 : 0,
        'border-opacity': 0.8
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
              return '#ffffff';
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
              return '#ffffff';
          }
        },
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': 8,
        'color': '#e5deff',
        'text-outline-color': '#0b1420',
        'text-outline-width': 2,
        'text-background-opacity': 0.7,
        'text-background-color': '#0b1420',
        'text-background-padding': 2,
        'text-wrap': 'wrap',
        'text-max-width': '120px'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'border-color': '#ffffff',
        'border-width': 3,
        'border-opacity': 1
      }
    }
  ];

  useEffect(() => {
    if (cyRef.current && selectedNode) {
      const node = cyRef.current.getElementById(selectedNode);
      if (node.length > 0) {
        const position = node.renderedPosition();
        const zoom = cyRef.current.zoom();
        
        setPanelPosition({
          x: position.x + 50,
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
        x: position.x + 50,
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
