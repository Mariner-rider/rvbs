import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/button";
import { Search, MapPin, Menu, X, Bookmark, Navigation, Send, Share2, Clock, MoreVertical } from "lucide-react";

const Maps = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxToken, setMapboxToken] = useState("India");
  const [tokenSubmitted, setTokenSubmitted] = useState(true);
  const [searchQuery, setSearchQuery] = useState("India");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [selectedPlace, setSelectedPlace] = useState({
    name: "India",
    description:
      "India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area; the most populous country since 2023...",
    previewImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400",
    photos: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300",
    ],
  });

  const savedPlaces = [
    {
      name: "India",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=100",
      coordinates: [78.9629, 20.5937],
    },
    {
      name: "Jodhpur",
      image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=100",
      coordinates: [73.0243, 26.2389],
    },
    {
      name: "Delhi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=100",
      coordinates: [77.1025, 28.7041],
    },
  ];

  useEffect(() => {
    // if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");

    savedPlaces.forEach((place) => {
      const marker = new mapboxgl.Marker({ color: "#EA4335" })
        .setLngLat(place.coordinates)
        .addTo(map.current);

      marker.getElement().addEventListener("click", () => {
        setSelectedPlace({
          name: place.name,
          description: `${place.name} is a beautiful destination in India...`,
          previewImage: place.image.replace("w=100", "w=400"),
          photos: [
            place.image.replace("w=100", "w=300"),
            place.image.replace("w=100", "w=300"),
          ],
        });
        map.current?.flyTo({
          center: place.coordinates,
          zoom: 10,
        });
      });
    });

    return () => map.current?.remove();
  }, [tokenSubmitted]);

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    if (mapboxToken.trim()) setTokenSubmitted(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="h-screen relative">
        {!tokenSubmitted ? (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-md w-full p-6 space-y-4">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-primary mx-auto" />
                <h2 className="text-2xl font-semibold">Mapbox Token Required</h2>
                <p className="text-muted-foreground">
                  Enter your Mapbox public token to use the maps feature.
                  Get yours at{" "}
                  <a
                    href="https://mapbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>

              <form onSubmit={handleTokenSubmit} className="space-y-3 ">
                <Input
                  type="text"
                  placeholder="pk.eyJ1Ijoi..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Continue to Maps
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="relative h-full flex">
            {/* Sidebar */}
            <div
              className={`absolute left-0 top-0 h-full bg-background border-r border-border z-20 transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              style={{ width: "420px" }}
            >
              <div className="flex flex-col h-full">
                {/* Search Bar */}
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarOpen(false)}
                      className="flex-shrink-0 rounded-full"
                    >
                      <Menu className="w-5 h-5" />
                    </Button>

                    <form onSubmit={handleSearch} className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Search Google Maps"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 rounded-full h-12 bg-muted/50"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </form>
                  </div>
                </div>

                {/* Place Info Scroll */}
                <div className="flex-1 overflow-y-auto">
                  <div className="px-3 mb-4">
                    <img
                      src={selectedPlace.previewImage}
                      alt={selectedPlace.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <div className="px-4 space-y-5">
                    <h1 className="text-3xl font-normal">{selectedPlace.name}</h1>

                    {/* Actions */}
                    <div className="flex items-center justify-around py-2">
                      {[
                        { Icon: Navigation, label: "Directions" },
                        { Icon: Bookmark, label: "Save" },
                        { Icon: Search, label: "Nearby" },
                        { Icon: Send, label: "Send to phone" },
                        { Icon: Share2, label: "Share" },
                      ].map(({ Icon, label }, i) => (
                        <button key={i} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs text-center">{label}</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Quick facts</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedPlace.description}
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-1 text-primary">
                        More
                      </Button>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Photos</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedPlace.photos.map((photo, idx) => (
                          <img
                            key={idx}
                            src={photo}
                            alt={`${selectedPlace.name} ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-border p-3">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex flex-col items-center gap-1">
                      <Bookmark className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Saved</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Recents</span>
                    </div>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {savedPlaces.map((place, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1 min-w-[60px]">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-12 h-12 rounded-lg object-cover border border-border cursor-pointer hover:opacity-80 transition-opacity"
                        />
                        <span className="text-xs text-center truncate">{place.name}</span>
                      </div>
                    ))}
                    <button className="flex flex-col items-center gap-1 min-w-[60px]">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-center">View more</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {!sidebarOpen && (
              <Button
                variant="default"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="absolute left-4 top-4 z-10 shadow-lg rounded-full"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}

            {/* Map */}
            <div className="flex-1 relative">
              <div ref={mapContainer} className="absolute inset-0" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Maps;
