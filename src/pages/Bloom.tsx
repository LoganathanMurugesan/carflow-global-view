
import { useState } from 'react';
import Header from '../components/Header';
import GraphVisualization from '../components/graph/GraphVisualization';
import GraphControls from '../components/graph/GraphControls';
import GraphSearch from '../components/graph/GraphSearch';
import GraphLegend from '../components/graph/GraphLegend';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Bloom = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const handleZoomChange = (zoom: number) => {
    setZoomLevel(zoom);
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
                  <div className="flex items-center gap-4 mb-4">
                    <GraphSearch onSearch={handleSearch} />
                    <GraphControls onZoomChange={handleZoomChange} zoomLevel={zoomLevel} />
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
                  <h3 className="text-[#0ec1eb] mb-4">Supply Chain Data</h3>
                  <pre className="text-white text-sm whitespace-pre-wrap">
                    {JSON.stringify(
                      { nodes: "Facilities and entities in the supply chain", edges: "Connections and movements" }, 
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

export default Bloom;
