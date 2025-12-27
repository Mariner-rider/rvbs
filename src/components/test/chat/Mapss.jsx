// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const Mapss = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current) return; // prevent multiple init

//     const map = L.map("map").setView([20.5937, 78.9629], 5);

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution: '&copy; OpenStreetMap Contributors'
//     }).addTo(map);

//     const places = [
//       { name: "India", coords: [20.5937, 78.9629] },
//     //   { name: "Delhi", coords: [28.7041, 77.1025] },
//       { name: "Jodhpur", coords: [26.2389, 73.0243] },
//     ];

//     places.forEach((place) => {
//       L.marker(place.coords)
//         .addTo(map)
//         .bindPopup(`<b>${place.name}</b>`);
//     });

//     mapRef.current = map;
//   }, []);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <div id="map" style={{ height: "100%", width: "100%" }}></div>
//     </div>
//   );
// };

// export default Mapss;

// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const Mapss = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current) return;

//     const map = L.map("map", {
//       zoomControl: false,
//     }).setView([20.5937, 78.9629], 5);

//     L.tileLayer(
//       "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
//       {
//         maxZoom: 20,
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
//       }
//     ).addTo(map);

//     L.control.zoom({ position: "bottomright" }).addTo(map);

//     const markerIcon = L.icon({
//       iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//       iconSize: [35, 35],
//       iconAnchor: [17, 35],
//     });

//     L.marker([28.6139, 77.2090], { icon: markerIcon })
//       .addTo(map)
//       .bindPopup("New Delhi");

//     mapRef.current = map;
//   }, []);

//   return (
//     <div id="map" style={{ width: "100%", height: "90vh" }} />
//   );
// };

// export default Mapss;


import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Mapss = () => {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (mapRef.current) return;
    const defaultLocation = [28.6139, 77.2090];

    const map = L.map("map", { zoomControl: false, attributionControl: false }).setView([20.5937, 78.9629], 5);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution: "" //  Attribution hidden
      }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapRef.current = map;
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
    );
    const results = await res.json();

    if (results.length > 0) {
      const { lat, lon, display_name } = results[0];

      const markerIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
      });

      L.marker([lat, lon], { icon: markerIcon })
        .addTo(mapRef.current)
        .bindPopup(display_name)
        .openPopup();

      mapRef.current.flyTo([lat, lon], 12);
    } else {
      alert("Location not found!");
    }
  };

  return (
    <div style={{ width: "100%", height: "90.6vh", position: "relative" }}>
      {/* Search Box UI */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search a place..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            position: "absolute",
            top: "20px",
            left: "15%",
            transform: "translateX(-50%)",
            width: "260px",
            height: "40px",
            padding: "0 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            zIndex: 1000,
          }}
        />
        
      </form>

      {/* Map */}
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default Mapss;
