
import { Facility, FacilityType, VehicleMovement } from '../types/supply-chain';
import airwaysData from './Airways.json';

console.log('Raw Airways.json data loaded:', {
  facilitiesCount: airwaysData.facilities?.length || 0,
  movementsCount: airwaysData.movements?.length || 0,
  sampleFacility: airwaysData.facilities?.[0],
  sampleMovement: airwaysData.movements?.[0]
});

// Map the JSON facility data to our TypeScript types
export const facilityData: Facility[] = airwaysData.facilities.map(facility => {
  const mappedFacility = {
    id: facility.id,
    name: facility.name,
    type: facility.type as FacilityType,
    latitude: facility.latitude,
    longitude: facility.longitude,
    details: facility.details
  };
  
  console.log('Mapped facility:', mappedFacility.id, mappedFacility.name, mappedFacility.type);
  return mappedFacility;
});

// Type guard function to validate status values
const isValidStatus = (status: string): status is 'in-transit' | 'completed' | 'scheduled' => {
  return status === 'in-transit' || status === 'completed' || status === 'scheduled';
};

// Map the JSON movement data to our TypeScript types with status validation
export const vehicleMovements: VehicleMovement[] = airwaysData.movements.map(movement => {
  // Check if the status is valid, otherwise default to 'scheduled'
  const status = isValidStatus(movement.status) ? movement.status : 'scheduled';
  
  const mappedMovement = {
    id: movement.id,
    sourceFacilityId: movement.sourceFacilityId,
    destinationFacilityId: movement.destinationFacilityId,
    vehicleType: movement.vehicleType,
    status: status,
    departureTime: movement.departureTime,
    arrivalTime: movement.arrivalTime,
    cargo: movement.cargo
  };
  
  console.log('Mapped movement:', mappedMovement.id, mappedMovement.sourceFacilityId, '->', mappedMovement.destinationFacilityId);
  return mappedMovement;
});

console.log('Final mapped data:', {
  facilitiesCount: facilityData.length,
  movementsCount: vehicleMovements.length,
  facilityTypes: facilityData.reduce((acc, f) => {
    acc[f.type] = (acc[f.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
});
