
declare module '*.json' {
  interface AirwaysFacility {
    id: string;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
    details: {
      address: string;
      capacity?: number;
      inventory?: number;
      manager: string;
      established: string;
      specialization?: string;
    };
  }

  interface AirwaysMovement {
    id: string;
    sourceFacilityId: string;
    destinationFacilityId: string;
    vehicleType: string;
    status: string;
    departureTime: string;
    arrivalTime?: string;
    cargo: string;
  }

  interface AirwaysData {
    facilities: AirwaysFacility[];
    movements: AirwaysMovement[];
  }

  const value: AirwaysData;
  export default value;
}
