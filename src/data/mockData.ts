
import { Facility, FacilityType, VehicleMovement } from '../types/supply-chain';

export const facilityData: Facility[] = [
  // Manufacturing facilities
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
    id: 'mf3',
    name: 'Pune Assembly Plant',
    type: FacilityType.MANUFACTURING,
    latitude: 18.5204,
    longitude: 73.8567,
    details: {
      address: 'MIDC Industrial Area, Pune 411045, India',
      capacity: 320000,
      inventory: 28400,
      manager: 'Vikram Singh',
      established: '2005-03-12',
      specialization: 'Electric Vehicle Assembly'
    }
  },
  
  // Distribution centers
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
    id: 'dc3',
    name: 'Bangalore Central Distribution',
    type: FacilityType.DISTRIBUTION,
    latitude: 12.9716,
    longitude: 77.5946,
    details: {
      address: 'Electronic City, Bangalore 560100, India',
      capacity: 42000,
      inventory: 12800,
      manager: 'Suresh Rao',
      established: '2010-07-22'
    }
  },
  {
    id: 'dc4',
    name: 'Mumbai Port Distribution',
    type: FacilityType.DISTRIBUTION,
    latitude: 18.9548,
    longitude: 72.8228,
    details: {
      address: 'Mumbai Port Trust, Mumbai 400001, India',
      capacity: 52000,
      inventory: 18600,
      manager: 'Amit Shah',
      established: '2008-11-05'
    }
  },
  
  // Showrooms
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
    id: 'sr2',
    name: 'Anna Nagar Premium Showroom',
    type: FacilityType.SHOWROOM,
    latitude: 13.0878,
    longitude: 80.2037,
    details: {
      address: '2nd Avenue, Anna Nagar, Chennai 600040, India',
      inventory: 65,
      manager: 'Vimal Krishnan',
      established: '2016-09-14'
    }
  },
  {
    id: 'sr3',
    name: 'Bangalore Indiranagar Showroom',
    type: FacilityType.SHOWROOM,
    latitude: 12.9784,
    longitude: 77.6408,
    details: {
      address: '100 Feet Road, Indiranagar, Bangalore 560038, India',
      inventory: 92,
      manager: 'Arjun Reddy',
      established: '2015-05-22'
    }
  },
  
  // Suppliers
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
    id: 'sp2',
    name: 'Hosur Mechanical Components',
    type: FacilityType.SUPPLIER,
    latitude: 12.7409,
    longitude: 77.8253,
    details: {
      address: 'SIPCOT Industrial Park, Hosur 635126, India',
      capacity: 280000,
      manager: 'Meena Kumari',
      established: '2007-11-30',
      specialization: 'Precision Mechanical Parts'
    }
  },
  {
    id: 'sp3',
    name: 'Coimbatore Textile & Upholstery',
    type: FacilityType.SUPPLIER,
    latitude: 11.0168,
    longitude: 76.9558,
    details: {
      address: 'SIDCO Industrial Estate, Coimbatore 641021, India',
      capacity: 180000,
      manager: 'Rajesh Kumar',
      established: '2012-04-18',
      specialization: 'Interior Fabrics & Upholstery'
    }
  },
  {
    id: 'sp4',
    name: 'Pune Battery Technologies',
    type: FacilityType.SUPPLIER,
    latitude: 18.5810,
    longitude: 73.9266,
    details: {
      address: 'Chakan Industrial Area, Pune 410501, India',
      capacity: 350000,
      manager: 'Neha Desai',
      established: '2013-08-24',
      specialization: 'EV Batteries & Power Systems'
    }
  },
  
  // Buyers
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
  },
  {
    id: 'by2',
    name: 'Bangalore Airport Taxi Services',
    type: FacilityType.BUYER,
    latitude: 13.1986,
    longitude: 77.7066,
    details: {
      address: 'Kempegowda International Airport, Bangalore 560300, India',
      manager: 'Sanjay Gupta',
      established: '2017-05-18'
    }
  },
  {
    id: 'by3',
    name: 'Hyderabad Corporate Leasing',
    type: FacilityType.BUYER,
    latitude: 17.4399,
    longitude: 78.4983,
    details: {
      address: 'HITEC City, Hyderabad 500081, India',
      manager: 'Kiran Reddy',
      established: '2018-01-15'
    }
  },
  {
    id: 'by4',
    name: 'Mumbai Ride Share Company',
    type: FacilityType.BUYER,
    latitude: 19.0760,
    longitude: 72.8777,
    details: {
      address: 'Bandra Kurla Complex, Mumbai 400051, India',
      manager: 'Priyanka Shah',
      established: '2019-03-22'
    }
  }
];

export const vehicleMovements: VehicleMovement[] = [
  // Manufacturing to Distribution
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
    sourceFacilityId: 'mf3',
    destinationFacilityId: 'dc3',
    vehicleType: 'Heavy Transport',
    status: 'scheduled',
    departureTime: '2025-05-17T07:00:00Z',
    cargo: 'Electric Vehicles (18 units)'
  },
  {
    id: 'vm4',
    sourceFacilityId: 'mf2',
    destinationFacilityId: 'dc4',
    vehicleType: 'Car Carrier',
    status: 'in-transit',
    departureTime: '2025-05-15T05:30:00Z',
    arrivalTime: '2025-05-16T14:30:00Z',
    cargo: 'Hatchbacks (42 units)'
  },
  {
    id: 'vm5',
    sourceFacilityId: 'mf1',
    destinationFacilityId: 'dc3',
    vehicleType: 'Transport Truck',
    status: 'scheduled',
    departureTime: '2025-05-18T09:15:00Z',
    cargo: 'Sedans (28 units)'
  },
  
  // Distribution to Showroom
  {
    id: 'vm6',
    sourceFacilityId: 'dc1',
    destinationFacilityId: 'sr1',
    vehicleType: 'Light Truck',
    status: 'scheduled',
    departureTime: '2025-05-16T10:00:00Z',
    cargo: 'Sedans (8 units)'
  },
  {
    id: 'vm7',
    sourceFacilityId: 'dc2',
    destinationFacilityId: 'sr2',
    vehicleType: 'Light Truck',
    status: 'completed',
    departureTime: '2025-05-13T11:30:00Z',
    arrivalTime: '2025-05-13T13:15:00Z',
    cargo: 'SUVs (6 units)'
  },
  {
    id: 'vm8',
    sourceFacilityId: 'dc3',
    destinationFacilityId: 'sr3',
    vehicleType: 'Delivery Van',
    status: 'in-transit',
    departureTime: '2025-05-15T14:00:00Z',
    arrivalTime: '2025-05-15T16:30:00Z',
    cargo: 'Electric Vehicles (5 units)'
  },
  {
    id: 'vm9',
    sourceFacilityId: 'dc4',
    destinationFacilityId: 'sr1',
    vehicleType: 'Car Carrier',
    status: 'scheduled',
    departureTime: '2025-05-17T08:45:00Z',
    cargo: 'Premium Sedans (4 units)'
  },
  
  // Supplier to Manufacturing
  {
    id: 'vm10',
    sourceFacilityId: 'sp1',
    destinationFacilityId: 'mf1',
    vehicleType: 'Supply Chain Truck',
    status: 'in-transit',
    departureTime: '2025-05-15T12:40:00Z',
    arrivalTime: '2025-05-15T14:20:00Z',
    cargo: 'Electronic Components (2500 units)'
  },
  {
    id: 'vm11',
    sourceFacilityId: 'sp2',
    destinationFacilityId: 'mf2',
    vehicleType: 'Cargo Truck',
    status: 'completed',
    departureTime: '2025-05-14T09:20:00Z',
    arrivalTime: '2025-05-14T11:45:00Z',
    cargo: 'Mechanical Components (1800 units)'
  },
  {
    id: 'vm12',
    sourceFacilityId: 'sp3',
    destinationFacilityId: 'mf3',
    vehicleType: 'Delivery Truck',
    status: 'scheduled',
    departureTime: '2025-05-16T08:00:00Z',
    cargo: 'Interior Materials (950 units)'
  },
  {
    id: 'vm13',
    sourceFacilityId: 'sp4',
    destinationFacilityId: 'mf3',
    vehicleType: 'Specialized Transport',
    status: 'in-transit',
    departureTime: '2025-05-15T07:30:00Z',
    arrivalTime: '2025-05-16T12:30:00Z',
    cargo: 'EV Batteries (650 units)'
  },
  {
    id: 'vm14',
    sourceFacilityId: 'sp1',
    destinationFacilityId: 'mf2',
    vehicleType: 'Supply Chain Truck',
    status: 'scheduled',
    departureTime: '2025-05-17T10:15:00Z',
    cargo: 'Electronic Systems (1200 units)'
  },
  {
    id: 'vm15',
    sourceFacilityId: 'sp2',
    destinationFacilityId: 'mf1',
    vehicleType: 'Cargo Truck',
    status: 'completed',
    departureTime: '2025-05-12T14:30:00Z',
    arrivalTime: '2025-05-12T17:00:00Z',
    cargo: 'Precision Parts (2100 units)'
  },
  
  // Distribution to Buyer
  {
    id: 'vm16',
    sourceFacilityId: 'dc2',
    destinationFacilityId: 'by1',
    vehicleType: 'Delivery Truck',
    status: 'in-transit',
    departureTime: '2025-05-15T13:15:00Z',
    arrivalTime: '2025-05-15T15:45:00Z',
    cargo: 'Mixed Fleet Vehicles (12 units)'
  },
  {
    id: 'vm17',
    sourceFacilityId: 'dc3',
    destinationFacilityId: 'by2',
    vehicleType: 'Car Carrier',
    status: 'completed',
    departureTime: '2025-05-13T09:45:00Z',
    arrivalTime: '2025-05-13T14:30:00Z',
    cargo: 'Taxi Fleet (25 units)'
  },
  {
    id: 'vm18',
    sourceFacilityId: 'dc1',
    destinationFacilityId: 'by3',
    vehicleType: 'Car Carrier',
    status: 'scheduled',
    departureTime: '2025-05-18T07:00:00Z',
    cargo: 'Corporate Fleet (16 units)'
  },
  {
    id: 'vm19',
    sourceFacilityId: 'dc4',
    destinationFacilityId: 'by4',
    vehicleType: 'Car Carrier',
    status: 'in-transit',
    departureTime: '2025-05-15T08:00:00Z',
    arrivalTime: '2025-05-16T10:00:00Z',
    cargo: 'Ride Share Vehicles (30 units)'
  },
  
  // Direct Manufacturing to Buyer (for large orders)
  {
    id: 'vm20',
    sourceFacilityId: 'mf3',
    destinationFacilityId: 'by2',
    vehicleType: 'Specialized Transport',
    status: 'scheduled',
    departureTime: '2025-05-19T06:30:00Z',
    cargo: 'Electric Taxis (45 units)'
  }
];
