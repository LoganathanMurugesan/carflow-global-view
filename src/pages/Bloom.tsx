import { useState, useEffect } from 'react';
import Header from '../components/Header';
import GraphVisualization from '../components/graph/GraphVisualization';
import GraphControls from '../components/graph/GraphControls';
import GraphSearch from '../components/graph/GraphSearch';
import GraphLegend from '../components/graph/GraphLegend';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { ChevronsRight, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { FacilityType } from '@/types/supply-chain';
import { facilityData, vehicleMovements } from '@/data/mockData';

const Bloom = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    types: Object.values(FacilityType),
    connectionStatus: ['in-transit', 'completed', 'scheduled']
  });
  const [graphStats, setGraphStats] = useState({
    nodes: facilityData.length,
    edges: vehicleMovements.length,
    nodeTypes: new Map<FacilityType, number>()
  });
  
  useEffect(() => {
    // Calculate statistics for the graph based on Airways.json data
    const nodeTypeCounts = new Map<FacilityType, number>();
    
    facilityData.forEach(facility => {
      const count = nodeTypeCounts.get(facility.type) || 0;
      nodeTypeCounts.set(facility.type, count + 1);
    });
    
    setGraphStats({
      nodes: facilityData.length,
      edges: vehicleMovements.length,
      nodeTypes: nodeTypeCounts
    });
    
    console.log('Airways.json data loaded:', {
      facilities: facilityData.length,
      movements: vehicleMovements.length,
      nodeTypes: Object.fromEntries(nodeTypeCounts)
    });
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const handleZoomChange = (zoom: number) => {
    setZoomLevel(zoom);
  };
  
  const handleFilterChange = (filters: any) => {
    setSelectedFilters(filters);
    toast.info(`Applied ${filters.types.length} type filters and ${filters.connectionStatus.length} status filters`);
  };
  
  const handleExportGraph = (format: string) => {
    toast.success(`Exporting graph as ${format.toUpperCase()}`);
    // Implementation would download the graph in the specified format
  };
  
  const handleViewReset = () => {
    setZoomLevel(1);
    toast.info("View reset to default");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0b1420]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full flex flex-col">
          <div className="p-4 border-b border-[#0ec1eb]/30">
            <Tabs defaultValue="visualization" className="w-full">
              <TabsList className="bg-[#121a2b] text-[#0ec1eb]">
                <TabsTrigger value="visualization" className="data-[state=active]:bg-[#0b1420] data-[state=active]:text-[#00ffcc]">
                  Graph Visualization
                </TabsTrigger>
                <TabsTrigger value="data" className="data-[state=active]:bg-[#0b1420] data-[state=active]:text-[#00ffcc]">
                  Data View
                </TabsTrigger>
              </TabsList>
              <TabsContent value="visualization" className="p-0 border-none">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <GraphSearch onSearch={handleSearch} onFilterChange={handleFilterChange} />
                    <div className="flex items-center gap-2 ml-auto">
                      <GraphControls 
                        onZoomChange={handleZoomChange} 
                        zoomLevel={zoomLevel}
                        onViewReset={handleViewReset}
                        onExportGraph={handleExportGraph}
                      />

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#121a2b] border-[#0ec1eb]/30 text-[#0ec1eb] hover:bg-[#182338]"
                          >
                            <Settings size={16} className="mr-1" />
                            <span className="text-xs">Details</span>
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="bg-[#0b1420] border-l border-[#0ec1eb]/30 text-white">
                          <SheetHeader>
                            <SheetTitle className="text-[#0ec1eb]">Airways Data Insights</SheetTitle>
                            <SheetDescription className="text-[#e1e1e6]">
                              Analysis and statistics about the Airways supply chain network.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 space-y-6">
                            <div className="space-y-4">
                              <h3 className="text-sm font-medium text-[#0ec1eb]">Overview</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#121a2b] p-4 rounded-md border border-[#0ec1eb]/30">
                                  <div className="text-xs text-[#0ec1eb]/70">Facilities</div>
                                  <div className="text-xl font-bold text-[#00ffcc]">{graphStats.nodes}</div>
                                </div>
                                <div className="bg-[#121a2b] p-4 rounded-md border border-[#0ec1eb]/30">
                                  <div className="text-xs text-[#0ec1eb]/70">Movements</div>
                                  <div className="text-xl font-bold text-[#00ffcc]">{graphStats.edges}</div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-sm font-medium text-[#0ec1eb]">Facility Types</h3>
                              <div className="space-y-2">
                                {Array.from(graphStats.nodeTypes.entries()).map(([type, count]) => (
                                  <div key={type} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: getNodeTypeColor(type) }}
                                      ></div>
                                      <span className="text-sm">{type}</span>
                                    </div>
                                    <span className="text-sm font-medium text-[#0ec1eb]">{count}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {selectedNode && (
                              <div className="space-y-4">
                                <h3 className="text-sm font-medium text-[#0ec1eb]">Selected Facility</h3>
                                <div className="bg-[#121a2b] p-4 rounded-md border border-[#0ec1eb]/30">
                                  <div className="text-xs text-[#0ec1eb]/70">ID</div>
                                  <div className="text-sm font-medium">{selectedNode}</div>
                                  <div className="text-xs text-[#0ec1eb]/70 mt-2">Connections</div>
                                  <div className="text-sm font-medium">
                                    {vehicleMovements.filter(m => 
                                      m.sourceFacilityId === selectedNode || 
                                      m.destinationFacilityId === selectedNode
                                    ).length}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                  <div className="flex flex-1">
                    <div className="flex-1 relative overflow-hidden rounded-md border border-[#0ec1eb]/30">
                      <GraphVisualization 
                        searchQuery={searchQuery}
                        onNodeSelect={handleNodeSelect}
                        selectedNode={selectedNode}
                        zoomLevel={zoomLevel}
                      />
                    </div>
                    <div className="w-64 ml-4">
                      <GraphLegend />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="data" className="border-none">
                <div className="bg-[#0b1420] p-4 rounded-md border border-[#0ec1eb]/30 h-[calc(100vh-220px)] overflow-auto">
                  <h3 className="text-[#0ec1eb] mb-4">Airways Supply Chain Data</h3>
                  <pre className="text-white text-sm whitespace-pre-wrap">
                    {JSON.stringify(
                      { 
                        facilities: facilityData.map(f => ({ 
                          id: f.id, 
                          type: f.type, 
                          name: f.name,
                          location: `${f.latitude}, ${f.longitude}`,
                          details: f.details
                        })),
                        movements: vehicleMovements.map(m => ({
                          id: m.id,
                          source: m.sourceFacilityId,
                          target: m.destinationFacilityId,
                          status: m.status,
                          vehicle: m.vehicleType,
                          cargo: m.cargo
                        }))
                      }, 
                      null, 2
                    )}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color for node types based on Airways.json data
const getNodeTypeColor = (facilityType: FacilityType): string => {
  switch (facilityType) {
    case FacilityType.MANUFACTURING:
      return '#F97316'; // Bright orange
    case FacilityType.DISTRIBUTION:
      return '#33C3F0'; // Vibrant sky blue
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

export default Bloom;
