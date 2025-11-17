'use client';

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { useState, useEffect } from 'react';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface CitationData {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  count: number;
}

export default function CitationMap() {
  const [citations, setCitations] = useState<CitationData[]>([]);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  useEffect(() => {
    // Parse CSV and aggregate by location
    fetch('/citation_info.csv')
      .then(res => res.text())
      .then(data => {
        const lines = data.split('\n').slice(1); // Skip header
        const locationMap = new Map<string, CitationData>();

        lines.forEach(line => {
          if (!line.trim()) return;
          
          // Simple CSV parser that handles quoted fields
          const parts: string[] = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              parts.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          parts.push(current.trim());

          // Column indices: 0=index, 1=author, 2=citing paper, 3=cited paper, 4=affiliation, 
          // 5=latitude, 6=longitude, 7=county, 8=city, 9=state, 10=country
          if (parts.length >= 11) {
            const lat = parseFloat(parts[5]);
            const lon = parseFloat(parts[6]);
            const city = parts[8] || 'Unknown';
            const country = parts[10] || 'Unknown';

            if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0 && country !== 'Unknown' && country !== '') {
              const key = `${lat.toFixed(4)},${lon.toFixed(4)}`; // Round to avoid tiny differences
              if (locationMap.has(key)) {
                const existing = locationMap.get(key)!;
                existing.count += 1;
              } else {
                locationMap.set(key, {
                  country,
                  city: city || country,
                  latitude: lat,
                  longitude: lon,
                  count: 1
                });
              }
            }
          }
        });

        console.log(`Parsed ${locationMap.size} unique locations from CSV`);
        setCitations(Array.from(locationMap.values()));
      })
      .catch(err => console.error('Error loading citation data:', err));
  }, []);

  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Global Research Impact</h3>
        <p className="text-sm text-gray-400 mt-1">
          Citations from {citations.length} locations worldwide
        </p>
      </div>
      
      <div className="relative" style={{ height: '500px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 140,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <ZoomableGroup center={[0, 20]} zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#2D3748"
                    stroke="#1A202C"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#374151', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {citations.map((citation, index) => {
              const key = `${citation.latitude},${citation.longitude}`;
              
              return (
                <Marker
                  key={index}
                  coordinates={[citation.longitude, citation.latitude]}
                  onMouseEnter={() => setHoveredMarker(key)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <circle
                    r={5}
                    fill="#3B82F6"
                    fillOpacity={0.8}
                    stroke="#60A5FA"
                    strokeWidth={1.5}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    className={hoveredMarker === key ? 'animate-pulse' : ''}
                  />
                  
                  {hoveredMarker === key && (
                    <g>
                      <rect
                        x={10}
                        y={-12}
                        width={Math.max(citation.city.length * 7, 80)}
                        height={20}
                        fill="#1F2937"
                        stroke="#3B82F6"
                        strokeWidth={1}
                        rx={4}
                      />
                      <text
                        x={15}
                        y={0}
                        fontSize={11}
                        fill="#FFFFFF"
                        fontWeight="500"
                      >
                        {citation.city}, {citation.country}
                      </text>
                    </g>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <div className="p-4 border-t border-gray-800 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-400">Citation Location</span>
          </div>
        </div>
        <span className="text-gray-500">Hover over markers for details</span>
      </div>
    </div>
  );
}
