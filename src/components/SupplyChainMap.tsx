
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Facility, VehicleMovement } from '../types/supply-chain';
import FacilityMarker from './markers/FacilityMarker';
import FacilityPopup from './FacilityPopup';
import { createRoot } from 'react-dom/client';
import { useToast } from '@/hooks/use-toast';

interface SupplyChainMapProps {
  facilities: Facility[];
  vehicleMovements: VehicleMovement[];
  onSelectFacility: (facility: Facility | null) => void;
  selectedFacility: Facility | null;
}

const SupplyChainMap = ({ 
  facilities, 
  vehicleMovements, 
  onSelectFacility,
  selectedFacility
}: SupplyChainMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{[key: string]: mapboxgl.Marker}>({});
  const linesRef = useRef<{[key: string]: mapboxgl.GeoJSONSource}>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    // Try to get token from localStorage on initial load
    return localStorage.getItem('mapbox_token') || '';
  });
  const [selectedMarkerPosition, setSelectedMarkerPosition] = useState<{x: number, y: number} | null>(null);
  const { toast } = useToast();

  // Chennai, India coordinates
  const CHENNAI_LONGITUDE = 80.2707;
  const CHENNAI_LATITUDE = 13.0827;

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    try {
      // Only try to initialize the map if we have a token
      if (mapboxToken) {
        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11', // Changed to dark style
          center: [CHENNAI_LONGITUDE, CHENNAI_LATITUDE],
          zoom: 10,
          projection: 'mercator'
        });

        map.current.addControl(
          new mapboxgl.NavigationControl({
            showCompass: false,
            visualizePitch: false
          }),
          'top-right'
        );

        map.current.on('load', () => {
          setMapLoaded(true);
          toast({
            title: "Map Loaded",
            description: "Supply chain visualization centered on Chennai, India",
          });
        });
      }
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        variant: "destructive",
        title: "Map Error",
        description: "Could not load the map. Please check your connection or API token.",
      });
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken, toast]);

  // Add markers for facilities
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clean up previous markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    facilities.forEach((facility) => {
      // Create a DOM element for the custom marker
      const el = document.createElement('div');
      el.className = 'marker-container';
      
      // Create a React root and render the FacilityMarker component
      const root = createRoot(el);
      root.render(
        <FacilityMarker 
          facility={facility}
          isSelected={selectedFacility?.id === facility.id} 
          onClick={() => {
            // Get pixel coordinates of the marker
            if (map.current) {
              const markerLngLat = [facility.longitude, facility.latitude];
              const markerPoint = map.current.project(markerLngLat);
              
              setSelectedMarkerPosition({
                x: markerPoint.x,
                y: markerPoint.y
              });
              
              onSelectFacility(facility);
            }
          }} 
        />
      );

      // Add marker to map
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([facility.longitude, facility.latitude])
        .addTo(map.current!);
      
      markersRef.current[facility.id] = marker;
    });
  }, [facilities, mapLoaded, onSelectFacility, selectedFacility]);

  // Add lines for vehicle movements
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Remove previous lines
    vehicleMovements.forEach((movement) => {
      const sourceId = `route-${movement.id}`;
      if (map.current?.getSource(sourceId)) {
        map.current.removeLayer(`route-line-${movement.id}`);
        map.current.removeSource(sourceId);
      }
    });

    // Add new lines for vehicle movements
    vehicleMovements.forEach((movement) => {
      const source = facilities.find(f => f.id === movement.sourceFacilityId);
      const destination = facilities.find(f => f.id === movement.destinationFacilityId);
      
      if (source && destination) {
        const sourceId = `route-${movement.id}`;
        
        // Add GeoJSON source for the route
        map.current?.addSource(sourceId, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {
              'movementId': movement.id,
              'status': movement.status
            },
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [source.longitude, source.latitude],
                [destination.longitude, destination.latitude]
              ]
            }
          }
        });

        // Add the route line to the map with neon glow style
        map.current?.addLayer({
          'id': `route-line-${movement.id}`,
          'type': 'line',
          'source': sourceId,
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': movement.status === 'completed' ? '#00ffcc' : 
                          movement.status === 'in-transit' ? '#0ec1eb' : 
                          '#ff5d5d',
            'line-width': 1.5,
            'line-opacity': 0.8,
            'line-blur': 2
          }
        });

        // Add glow effect
        map.current?.addLayer({
          'id': `route-glow-${movement.id}`,
          'type': 'line',
          'source': sourceId,
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': movement.status === 'completed' ? '#00ffcc' : 
                          movement.status === 'in-transit' ? '#0ec1eb' : 
                          '#ff5d5d',
            'line-width': 4,
            'line-opacity': 0.4,
            'line-blur': 6
          }
        });

        // Store the source for later updates
        if (map.current?.getSource(sourceId)) {
          linesRef.current[movement.id] = map.current?.getSource(sourceId) as mapboxgl.GeoJSONSource;
        }
      }
    });
  }, [vehicleMovements, facilities, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" style={{ background: '#0b1420' }} />
      
      <div className="absolute top-0 left-0 right-0 z-50 bg-[#0b1420] p-2 text-center text-sm border-b border-[#0ec1eb]/30">
        <p className="mb-1 text-[#0ec1eb] font-medium">A Mapbox token is required to display the map</p>
        <input
          type="text"
          className="px-2 py-1 border border-[#0ec1eb]/50 bg-[#0b1420]/90 text-[#0ec1eb] rounded w-64"
          placeholder="Enter your Mapbox token"
          value={mapboxToken}
          onChange={(e) => setMapboxToken(e.target.value)}
        />
        <button 
          className="ml-2 px-2 py-1 bg-[#0ec1eb]/20 border border-[#0ec1eb]/50 rounded text-[#0ec1eb] hover:bg-[#0ec1eb]/30 transition-colors"
          onClick={() => {
            if (mapboxToken) {
              localStorage.setItem('mapbox_token', mapboxToken);
              window.location.reload();
            }
          }}
        >
          Set Token
        </button>
        <p className="mt-1 text-xs text-[#0ec1eb]/70">
          Visit <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a> to create an account and get your public token
        </p>
      </div>
      
      {selectedFacility && selectedMarkerPosition && (
        <FacilityPopup 
          facility={selectedFacility} 
          onClose={() => onSelectFacility(null)}
          mapPosition={selectedMarkerPosition} 
        />
      )}
    </div>
  );
};

export default SupplyChainMap;
