
import { useState } from 'react';
import SupplyChainMap from '../components/SupplyChainMap';
import Header from '../components/Header';
import { Facility } from '../types/supply-chain';
import { facilityData, vehicleMovements } from '../data/mockData';

const Index = () => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0b1420]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-hidden">
          <SupplyChainMap 
            facilities={facilityData} 
            vehicleMovements={vehicleMovements}
            onSelectFacility={setSelectedFacility}
            selectedFacility={selectedFacility}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
