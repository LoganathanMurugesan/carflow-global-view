
import { Facility, FacilityType, VehicleMovement } from '../types/supply-chain';
import airwaysData from './Airways.json';

// Map the JSON facility data to our TypeScript types
export const facilityData: Facility[] = airwaysData.facilities.map(facility => ({
  id: facility.id,
  name: facility.name,
  type: facility.type as FacilityType,
  latitude: facility.latitude,
  longitude: facility.longitude,
  details: facility.details
}));

// Type guard function to validate status values
const isValidStatus = (status: string): status is 'in-transit' | 'completed' | 'scheduled' => {
  return status === 'in-transit' || status === 'completed' || status === 'scheduled';
};

// Map the JSON movement data to our TypeScript types with status validation
export const vehicleMovements: VehicleMovement[] = airwaysData.movements.map(movement => {
  // Check if the status is valid, otherwise default to 'scheduled'
  const status = isValidStatus(movement.status) ? movement.status : 'scheduled';
  
  return {
    id: movement.id,
    sourceFacilityId: movement.sourceFacilityId,
    destinationFacilityId: movement.destinationFacilityId,
    vehicleType: movement.vehicleType,
    status: status,
    departureTime: movement.departureTime,
    arrivalTime: movement.arrivalTime,
    cargo: movement.cargo
  };
});
