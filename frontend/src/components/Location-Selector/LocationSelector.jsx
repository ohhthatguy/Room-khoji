import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


function LocationMarker({ onAddressChange }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);

      // Reverse geocoding API call to Nominatim
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      onAddressChange({
        address: data.display_name,
        lat,
        lng,
      });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapSelector({ onAddressChange }) {
  const [location, setLocation] = useState(null);

  return (
    <div>
      {location && (
        <div>
          <strong>Selected Location:</strong><br />
          {location.address} <br />
        </div>
      )}

      <MapContainer
        center={[27.7172, 85.3240]}
        zoom={13}
        style={{ height: '200px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          onAddressChange={(loc) => {
            setLocation(loc);            // for local state display
            onAddressChange?.(loc);      // call parent prop if provided
          }}
        />
      </MapContainer>
    </div>
  );
}


// export default function MapSelector() {
//   const [location, setLocation] = useState(null);

//   return (
//     <div >

//            {location && (
//         <div >
//           <strong>Selected Location:</strong><br />
//         {location.address} <br />
          
//         </div>
//       )}


//       <MapContainer
//         center={[27.7172, 85.3240]}
//         zoom={13}
//         style={{ height: '400px', width: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocationMarker onAddressChange={(loc) => setLocation(loc)} />
//       </MapContainer>

   
//     </div>
//   );
// }
