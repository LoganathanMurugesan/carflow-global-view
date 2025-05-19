
import { Facility, FacilityType, VehicleMovement } from '../types/supply-chain';

export const facilityData: Facility[] = [
  {
    id: 'mf1',
    name: 'Chennai Central Manufacturing',
    type: FacilityType.MANUFACTURING,
    latitude: 13.0827,
    longitude: 80.2707,
    details: {
      address: 'Anna Salai, Chennai, Tamil Nadu 600002, India',
      capacity: 180000,
      inventory: 15600,
      manager: 'Raj Sharma',
      established: '1998-06-15',
      specialization: 'Sedan Manufacturing'
    }
  },
  {
    id: 'mf2',
    name: 'Ambattur Industrial Estate',
    type: FacilityType.MANUFACTURING,
    latitude: 13.1143,
    longitude: 80.1548,
    details: {
      address: 'Ambattur Industrial Estate, Chennai 600058, India',
      capacity: 250000,
      inventory: 22800,
      manager: 'Priya Patel',
      established: '2002-11-23',
      specialization: 'SUV & Hatchback Assembly'
    }
  },
  {
    id: 'dc1',
    name: 'Madhavaram Distribution Center',
    type: FacilityType.DISTRIBUTION,
    latitude: 13.1482,
    longitude: 80.2315,
    details: {
      address: 'Madhavaram High Road, Chennai 600060, India',
      capacity: 35000,
      inventory: 7800,
      manager: 'Anand Kumar',
      established: '2006-08-12'
    }
  },
  {
    id: 'sr1',
    name: 'T. Nagar Showroom',
    type: FacilityType.SHOWROOM,
    latitude: 13.0418,
    longitude: 80.2341,
    details: {
      address: 'Pondy Bazaar, T. Nagar, Chennai 600017, India',
      inventory: 85,
      manager: 'Lakshmi Narayan',
      established: '2010-04-30'
    }
  },
  {
    id: 'sp1',
    name: 'Sriperumbudur Electronics Supplier',
    type: FacilityType.SUPPLIER,
    latitude: 12.9675,
    longitude: 79.9428,
    details: {
      address: 'SIPCOT Industrial Park, Sriperumbudur 602105, India',
      capacity: 420000,
      manager: 'Harish Reddy',
      established: '2008-07-15',
      specialization: 'Electronic Components & Systems'
    }
  },
  {
    id: 'dc2',
    name: 'Guindy Logistics Hub',
    type: FacilityType.DISTRIBUTION,
    latitude: 13.0067,
    longitude: 80.2206,
    details: {
      address: 'Industrial Estate, Guindy, Chennai 600032, India',
      capacity: 28000,
      inventory: 9200,
      manager: 'Deepa Venkatesh',
      established: '2014-03-18'
    }
  },
  {
    id: 'by1',
    name: 'OMR Fleet Services',
    type: FacilityType.BUYER,
    latitude: 12.9010,
    longitude: 80.2279,
    details: {
      address: 'Rajiv Gandhi Salai, OMR, Chennai 600119, India',
      manager: 'Vikram Mehta',
      established: '2016-12-05'
    }
  }
];

export const vehicleMovements: VehicleMovement[] = [
  {
    id: 'vm1',
    sourceFacilityId: 'mf1',
    destinationFacilityId: 'dc1',
    vehicleType: 'Delivery Truck',
    status: 'in-transit',
    departureTime: '2025-05-15T08:30:00Z',
    arrivalTime: '2025-05-15T10:00:00Z',
    cargo: 'Sedans (35 units)'
  },
  {
    id: 'vm2',
    sourceFacilityId: 'mf2',
    destinationFacilityId: 'dc2',
    vehicleType: 'Transport Truck',
    status: 'completed',
    departureTime: '2025-05-14T06:15:00Z',
    arrivalTime: '2025-05-14T08:45:00Z',
    cargo: 'SUVs (22 units)'
  },
  {
    id: 'vm3',
    sourceFacilityId: 'dc1',
    destinationFacilityId: 'sr1',
    vehicleType: 'Light Truck',
    status: 'scheduled',
    departureTime: '2025-05-16T10:00:00Z',
    cargo: 'Sedans (8 units)'
  },
  {
    id: 'vm4',
    sourceFacilityId: 'sp1',
    destinationFacilityId: 'mf1',
    vehicleType: 'Supply Chain Truck',
    status: 'in-transit',
    departureTime: '2025-05-15T12:40:00Z',
    arrivalTime: '2025-05-15T14:20:00Z',
    cargo: 'Electronic Components (2500 units)'
  },
  {
    id: 'vm5',
    sourceFacilityId: 'dc2',
    destinationFacilityId: 'by1',
    vehicleType: 'Delivery Truck',
    status: 'in-transit',
    departureTime: '2025-05-15T13:15:00Z',
    arrivalTime: '2025-05-15T15:45:00Z',
    cargo: 'Mixed Fleet Vehicles (12 units)'
  }
];
