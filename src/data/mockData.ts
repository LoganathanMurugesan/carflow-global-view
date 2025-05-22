
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

// Map the JSON movement data to our TypeScript types
export const vehicleMovements: VehicleMovement[] = airwaysData.movements.map(movement => ({
  id: movement.id,
  sourceFacilityId: movement.sourceFacilityId,
  destinationFacilityId: movement.destinationFacilityId,
  vehicleType: movement.vehicleType,
  status: movement.status,
  departureTime: movement.departureTime,
  arrivalTime: movement.arrivalTime,
  cargo: movement.cargo
}));
