
import { Facility, VehicleMovement, FacilityType } from '@/types/supply-chain';

// Cytoscape element interfaces
export interface CytoscapeNode {
  data: {
    id: string;
    label: string;
    type: FacilityType;
    details: any;
    // Additional properties for styling
    color: string;
    shape: string;
  };
}

export interface CytoscapeEdge {
  data: {
    id: string;
    source: string;
    target: string;
    label: string;
    status: string;
    // Additional properties for styling
    color: string;
    weight: number;
  };
}

/**
 * Color mapping for different facility types
 */
const FACILITY_COLORS: Record<FacilityType, string> = {
  [FacilityType.MANUFACTURING]: '#F97316', // Orange
  [FacilityType.DISTRIBUTION]: '#33C3F0',  // Sky blue
  [FacilityType.SHOWROOM]: '#9b87f5',      // Purple
  [FacilityType.SUPPLIER]: '#FFC857',      // Yellow
  [FacilityType.BUYER]: '#E07A5F'          // Coral
};

/**
 * Shape mapping for different facility types
 */
const FACILITY_SHAPES: Record<FacilityType, string> = {
  [FacilityType.MANUFACTURING]: 'ellipse',
  [FacilityType.DISTRIBUTION]: 'diamond',
  [FacilityType.SHOWROOM]: 'round-rectangle',
  [FacilityType.SUPPLIER]: 'hexagon',
  [FacilityType.BUYER]: 'pentagon'
};

/**
 * Status color mapping for edges
 */
const STATUS_COLORS: Record<string, string> = {
  'in-transit': '#00ffcc',
  'completed': '#9b87f5',
  'scheduled': '#0ec1eb',
  'default': '#8E9196'
};

/**
 * Transforms facility data into Cytoscape node format
 * @param facilities - Array of facility objects from Airways.json
 * @returns Array of Cytoscape-compatible node objects
 */
export const transformFacilitiesToNodes = (facilities: Facility[]): CytoscapeNode[] => {
  return facilities.map(facility => {
    const nodeData: CytoscapeNode = {
      data: {
        id: facility.id,
        label: facility.name,
        type: facility.type,
        details: facility,
        color: FACILITY_COLORS[facility.type] || '#ffffff',
        shape: FACILITY_SHAPES[facility.type] || 'ellipse'
      }
    };
    
    console.log(`Transformed facility to node: ${facility.id} -> ${facility.name} (${facility.type})`);
    return nodeData;
  });
};

/**
 * Transforms vehicle movement data into Cytoscape edge format
 * @param movements - Array of vehicle movement objects from Airways.json
 * @returns Array of Cytoscape-compatible edge objects
 */
export const transformMovementsToEdges = (movements: VehicleMovement[]): CytoscapeEdge[] => {
  return movements.map(movement => {
    const edgeData: CytoscapeEdge = {
      data: {
        id: `edge-${movement.id}`,
        source: movement.sourceFacilityId,
        target: movement.destinationFacilityId,
        label: movement.cargo || 'Cargo',
        status: movement.status,
        color: STATUS_COLORS[movement.status] || STATUS_COLORS.default,
        weight: movement.status === 'in-transit' ? 3 : 2
      }
    };
    
    console.log(`Transformed movement to edge: ${movement.id} (${movement.sourceFacilityId} -> ${movement.destinationFacilityId})`);
    return edgeData;
  });
};

/**
 * Main utility function to transform Airways.json data for Cytoscape
 * @param facilities - Facility data from Airways.json
 * @param movements - Movement data from Airways.json
 * @returns Complete Cytoscape elements array (nodes + edges)
 */
export const transformAirwaysDataToCytoscape = (
  facilities: Facility[],
  movements: VehicleMovement[]
): Array<CytoscapeNode | CytoscapeEdge> => {
  console.log('Starting data transformation for Cytoscape:', {
    facilitiesCount: facilities.length,
    movementsCount: movements.length
  });
  
  const nodes = transformFacilitiesToNodes(facilities);
  const edges = transformMovementsToEdges(movements);
  
  console.log('Data transformation completed:', {
    nodesGenerated: nodes.length,
    edgesGenerated: edges.length
  });
  
  return [...nodes, ...edges];
};

/**
 * Filter function for search functionality
 * @param elements - Cytoscape elements array
 * @param searchQuery - Search query string
 * @returns Filtered elements matching the search query
 */
export const filterCytoscapeElements = (
  elements: Array<CytoscapeNode | CytoscapeEdge>,
  searchQuery: string
): Array<CytoscapeNode | CytoscapeEdge> => {
  if (!searchQuery) return elements;
  
  const query = searchQuery.toLowerCase();
  
  // Filter nodes based on label and type
  const matchingNodes = elements.filter(element => {
    if ('label' in element.data) {
      return element.data.label.toLowerCase().includes(query) ||
             element.data.type?.toLowerCase().includes(query);
    }
    return false;
  }) as CytoscapeNode[];
  
  // Get IDs of matching nodes
  const matchingNodeIds = new Set(matchingNodes.map(node => node.data.id));
  
  // Filter edges that connect to matching nodes
  const matchingEdges = elements.filter(element => {
    if ('source' in element.data && 'target' in element.data) {
      return matchingNodeIds.has(element.data.source) && 
             matchingNodeIds.has(element.data.target);
    }
    return false;
  });
  
  console.log(`Filtered elements: ${matchingNodes.length} nodes, ${matchingEdges.length} edges`);
  return [...matchingNodes, ...matchingEdges];
};
