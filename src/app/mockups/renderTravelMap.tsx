import { MapPin } from "lucide-react";
import { locations } from "./dataForPage9";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const renderTravelMap = () => {
  const currentLoc = locations.find((loc) => loc.name === selectedLocation);

  return (
    <div className="space-y-6">
      <div className="mb-2 p-2 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="font-semibold text-sm">Current Location:</span>
          <span className="text-accent text-sm">{selectedLocation}</span>
        </div>
      </div>

      <Card className="bg-card border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Cultivation World Map</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="relative w-full h-80 bg-background rounded-lg border border-border/30 overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-12 text-6xl text-slate-400">
                ☯
              </div>
              <div className="absolute top-20 right-16 text-4xl text-slate-400">
                ⚡
              </div>
              <div className="absolute bottom-16 left-20 text-5xl text-slate-400">
                🏔
              </div>
              <div className="absolute bottom-12 right-12 text-4xl text-slate-400">
                🌊
              </div>
              <div className="absolute top-1/2 left-1/4 text-3xl text-slate-400">
                🔥
              </div>
              <div className="absolute top-1/3 right-1/3 text-3xl text-slate-400">
                💨
              </div>
            </div>

            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full">
                <defs>
                  <pattern
                    id="energy-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgb(148 163 184)"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#energy-grid)" />
              </svg>
            </div>

            <svg
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              {locations.map((location) =>
                location.connections.map((connectedName) => {
                  const connected = locations.find(
                    (loc) => loc.name === connectedName
                  );
                  if (!connected) return null;

                  return (
                    <line
                      key={`${location.name}-${connectedName}`}
                      x1={`${location.x}%`}
                      y1={`${location.y}%`}
                      x2={`${connected.x}%`}
                      y2={`${connected.y}%`}
                      stroke="rgb(148 163 184 / 0.4)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  );
                })
              )}
            </svg>

            {locations.map((location) => (
              <div
                key={location.name}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 group ${
                  location.name === selectedLocation ? "z-20" : "z-10"
                }`}
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onClick={() => setSelectedLocation(location.name)}
              >
                <div
                  className={`relative ${
                    location.name === selectedLocation ? "animate-pulse" : ""
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      location.name === selectedLocation
                        ? "bg-accent border-accent shadow-lg shadow-accent/50"
                        : location.travel === 0
                        ? "bg-primary border-primary"
                        : "bg-slate-600 border-slate-400 hover:bg-slate-500"
                    }`}
                  />
                  {location.name === selectedLocation && (
                    <div className="absolute -inset-2 rounded-full border-2 border-accent/50 animate-ping" />
                  )}
                </div>

                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs shadow-lg">
                    <div className="font-semibold text-foreground">
                      {location.name}
                    </div>
                    {location.travel > 0 && (
                      <div className="text-muted-foreground">
                        {location.travel}h travel
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {locations
          .filter((loc) => loc.name !== selectedLocation)
          .map((location) => (
            <Card
              key={location.name}
              className="cursor-pointer transition-all hover:scale-105 bg-muted/30 border-border/30 hover:border-accent/30"
              onClick={() => setSelectedLocation(location.name)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm">{location.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {location.travel}h
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {location.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Travel Time: {location.travel} hours</span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Travel consumes time points and may unlock new activities and
          opportunities
        </p>
      </div>
    </div>
  );
};

export const renderTravelPage = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Travel the World
        </h2>
        <p className="text-muted-foreground">
          Explore different locations and unlock new opportunities
        </p>
      </div>

      {renderTravelMap()}
    </div>
  );
};
