
export enum FacilityType {
  MANUFACTURING = 'manufacturing',
  DISTRIBUTION = 'distribution',
  SHOWROOM = 'showroom',
  SUPPLIER = 'supplier',
  BUYER = 'buyer'
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  latitude: number;
  longitude: number;
  details: {
    address?: string;
    capacity?: number;
    inventory?: number;
    manager?: string;
    established?: string;
    specialization?: string;
  };
}

export interface VehicleMovement {
  id: string;
  sourceFacilityId: string;
  destinationFacilityId: string;
  vehicleType: string;
  status: 'in-transit' | 'completed' | 'scheduled';
  departureTime: string;
  arrivalTime?: string;
  cargo: string;
}
