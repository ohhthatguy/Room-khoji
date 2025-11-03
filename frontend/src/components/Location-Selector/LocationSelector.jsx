import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import toast from 'react-hot-toast';
import { API } from '../../services/Api';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


// function LocationMarker({ onAddressChange }) {

 
//   const [position, setPosition] = useState(null);

//   useMapEvents({
//     click: async (e) => {
//       const { lat, lng } = e.latlng;
//       setPosition(e.latlng);

//       // Reverse geocoding API call to Nominatim
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
//       );
//       const data = await res.json();
//       onAddressChange({
//         address: data.display_name,
//         lat,
//         lng,
//       });
//     },
//   });

//   return position ? <Marker position={position} /> : null;
// }

function LocationMarker({ onAddressChange }) {
  const [position, setPosition] = useState(null);
  const key= "AIzaSyDLCq_LiZFbAa42lMRcURJdqNmqLNdGhEQ";

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);

      try {
        // const res = await fetch(
        //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        // );

        const res = await API.getLocation({lat,lng})
        console.log(res)
       

        //  const res = await fetch(
        //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        //   {
        //     headers: {
        //       "User-Agent": "RoomKhojiApp/1.0",
        //       "Accept-Language": "en",
        //     },
        //   })  

//           const res = await fetch(
//   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
// );



        // Detect status issues
        if (!res.isSuccess) {
          if (res?.code === 403) {
            console.error("⚠️ Reverse geocoding request blocked (403). Possibly rate-limited.");
            onAddressChange({
              address: "Location lookup blocked. Please try again later.",
              lat,
              lng,
            });
            return;
          }
          throw new Error(`Reverse geocoding failed with status ${res}`);
        }


        onAddressChange({
          address: res.data.address.display_name || "Address not found",
          lat,
          lng,
        });

      } catch (err) {
        toast.error("Error during reverse geocoding");
        console.log("Geocodin err: ", err)

        // Graceful fallback when ANY failure occurs
        onAddressChange({
          address: "Unable to fetch address",
          lat,
          lng,
        });
      }
    },
  });

  return position ? <Marker position={position} /> : null;
}


export default function MapSelector({ onAddressChange,location, setLocation }) {
  // const [location, setLocation] = useState(null);

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
