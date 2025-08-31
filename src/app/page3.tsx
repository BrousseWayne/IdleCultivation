"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  Zap,
  Settings,
  User,
  Star,
  Flame,
  Mountain,
  Wind,
  Calendar,
  Package,
  Activity,
  Compass,
  Clock,
  Briefcase,
  Dumbbell,
  Plus,
  Minus,
  MapPin,
  Book,
  Hammer,
  Heart,
  Music,
  Gamepad2,
  Utensils,
  ShoppingCart,
  Home,
  GraduationCap,
  Palette,
  TreePine,
  Fish,
  Bike,
} from "lucide-react";
import { useState } from "react";

export default function IdleGameInterface4() {
  const [timePoints, setTimePoints] = useState(24);
  const [activeTab, setActiveTab] = useState("Activities");
  const [selectedLocation, setSelectedLocation] = useState("Eastern Continent");
  const [activities, setActivities] = useState({
    sectDuties: 0,
    alchemyWork: 0,
    martialArts: 0,
    qiCultivation: 0,
    beastHunting: 0,
    herbGathering: 0,
    meditation: 0,
    socializing: 0,
    reading: 0,
    crafting: 0,
    cooking: 0,
    shopping: 0,
    resting: 0,
    studying: 0,
    painting: 0,
    music: 0,
    gaming: 0,
    exploring: 0,
    fishing: 0,
    exercise: 0,
  });

  const activityData = [
    {
      key: "sectDuties",
      name: "Sect Duties",
      icon: Briefcase,
      cost: 8,
      reward: "+960 Spirit Stones",
      category: "work",
    },
    {
      key: "alchemyWork",
      name: "Alchemy Work",
      icon: Flame,
      cost: 6,
      reward: "+5 Alchemy Skill",
      category: "work",
    },
    {
      key: "martialArts",
      name: "Martial Arts",
      icon: Dumbbell,
      cost: 4,
      reward: "+60 Body Tempering",
      category: "training",
    },
    {
      key: "qiCultivation",
      name: "Qi Cultivation",
      icon: Mountain,
      cost: 6,
      reward: "+90 Cultivation Progress",
      category: "training",
    },
    {
      key: "beastHunting",
      name: "Beast Hunting",
      icon: Zap,
      cost: 8,
      reward: "+200 Beast Cores",
      category: "training",
    },
    {
      key: "herbGathering",
      name: "Herb Gathering",
      icon: TreePine,
      cost: 4,
      reward: "+50 Spirit Herbs",
      category: "work",
    },
    {
      key: "meditation",
      name: "Meditation",
      icon: Wind,
      cost: 2,
      reward: "+30 Soul Strength",
      category: "training",
    },
    {
      key: "socializing",
      name: "Socializing",
      icon: Heart,
      cost: 3,
      reward: "+20 Relationship Points",
      category: "social",
    },
    {
      key: "reading",
      name: "Reading Scrolls",
      icon: Book,
      cost: 2,
      reward: "+15 Knowledge",
      category: "study",
    },
    {
      key: "crafting",
      name: "Weapon Crafting",
      icon: Hammer,
      cost: 5,
      reward: "+40 Crafting Skill",
      category: "work",
    },
    {
      key: "cooking",
      name: "Spiritual Cooking",
      icon: Utensils,
      cost: 2,
      reward: "+25 Cooking Skill",
      category: "life",
    },
    {
      key: "shopping",
      name: "Market Trading",
      icon: ShoppingCart,
      cost: 1,
      reward: "+10 Trading Skill",
      category: "life",
    },
    {
      key: "resting",
      name: "Resting",
      icon: Home,
      cost: 1,
      reward: "+5 Health Recovery",
      category: "life",
    },
    {
      key: "studying",
      name: "Technique Study",
      icon: GraduationCap,
      cost: 3,
      reward: "+35 Technique Mastery",
      category: "study",
    },
    {
      key: "painting",
      name: "Spirit Painting",
      icon: Palette,
      cost: 2,
      reward: "+20 Artistic Skill",
      category: "hobby",
    },
    {
      key: "music",
      name: "Cultivation Music",
      icon: Music,
      cost: 2,
      reward: "+15 Musical Skill",
      category: "hobby",
    },
    {
      key: "gaming",
      name: "Strategy Games",
      icon: Gamepad2,
      cost: 1,
      reward: "+10 Strategic Thinking",
      category: "hobby",
    },
    {
      key: "exploring",
      name: "Local Exploration",
      icon: Compass,
      cost: 3,
      reward: "+25 Discovery Points",
      category: "adventure",
    },
    {
      key: "fishing",
      name: "Spirit Fishing",
      icon: Fish,
      cost: 2,
      reward: "+30 Spirit Fish",
      category: "hobby",
    },
    {
      key: "exercise",
      name: "Physical Exercise",
      icon: Bike,
      cost: 2,
      reward: "+20 Stamina",
      category: "training",
    },
  ];

  const locations = [
    {
      name: "Eastern Continent",
      travel: 0,
      description: "Current Location - Peaceful cultivation lands",
      x: 50,
      y: 40,
      connections: ["Central Plains", "Northern Mountains"],
    },
    {
      name: "Western Desert",
      travel: 12,
      description: "Harsh desert with ancient ruins",
      x: 15,
      y: 60,
      connections: ["Central Plains", "Forbidden Valley"],
    },
    {
      name: "Northern Mountains",
      travel: 8,
      description: "Dangerous peaks with rare herbs",
      x: 50,
      y: 15,
      connections: ["Eastern Continent", "Sky Realm"],
    },
    {
      name: "Southern Seas",
      travel: 16,
      description: "Mysterious islands and sea beasts",
      x: 40,
      y: 85,
      connections: ["Central Plains", "Underworld Gates"],
    },
    {
      name: "Central Plains",
      travel: 6,
      description: "Bustling trade hub and sects",
      x: 35,
      y: 50,
      connections: ["Eastern Continent", "Western Desert", "Southern Seas"],
    },
    {
      name: "Forbidden Valley",
      travel: 24,
      description: "Legendary cultivation ground",
      x: 20,
      y: 30,
      connections: ["Western Desert", "Sky Realm"],
    },
    {
      name: "Sky Realm",
      travel: 48,
      description: "Floating islands in the clouds",
      x: 70,
      y: 20,
      connections: ["Northern Mountains", "Forbidden Valley"],
    },
    {
      name: "Underworld Gates",
      travel: 36,
      description: "Dark realm of shadows",
      x: 80,
      y: 75,
      connections: ["Southern Seas"],
    },
  ];

  const updateActivity = (key: string, change: number) => {
    const activity = activityData.find((a) => a.key === key);
    if (!activity) return;

    const newValue = Math.max(
      0,
      activities[key as keyof typeof activities] + change
    );
    const currentTotal = Object.entries(activities).reduce(
      (sum, [actKey, value]) => {
        const actData = activityData.find((a) => a.key === actKey);
        return (
          sum +
          (actKey === key
            ? newValue * activity.cost
            : value * (actData?.cost || 0))
        );
      },
      0
    );

    if (currentTotal <= 24) {
      setActivities((prev) => ({ ...prev, [key]: newValue }));
      setTimePoints(24 - currentTotal);
    }
  };

  const totalUsed = Object.entries(activities).reduce((sum, [key, value]) => {
    const activity = activityData.find((a) => a.key === key);
    return sum + value * (activity?.cost || 0);
  }, 0);

  const categorizeActivities = () => {
    const categories = {
      work: [] as typeof activityData,
      training: [] as typeof activityData,
      study: [] as typeof activityData,
      social: [] as typeof activityData,
      life: [] as typeof activityData,
      hobby: [] as typeof activityData,
      adventure: [] as typeof activityData,
    };

    activityData.forEach((activity) => {
      categories[activity.category as keyof typeof categories].push(activity);
    });

    return categories;
  };

  const categories = categorizeActivities();

  const renderTravelMap = () => {
    const currentLoc = locations.find((loc) => loc.name === selectedLocation);

    return (
      <div className="space-y-6">
        <div className="mb-4 p-3 bg-accent/10 rounded-lg border border-accent/40">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="font-semibold">Current Location:</span>
            <span className="text-accent">{selectedLocation}</span>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Cultivation World Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-background rounded-lg border border-border overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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

                  <div
                    className={`absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                      location.name === selectedLocation
                        ? "block"
                        : "hidden group-hover:block"
                    }`}
                  >
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations
            .filter((loc) => loc.name !== selectedLocation)
            .map((location) => (
              <Card
                key={location.name}
                className="cursor-pointer transition-all hover:scale-105 bg-muted/30 border-border hover:border-accent/50"
                onClick={() => setSelectedLocation(location.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{location.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {location.travel}h
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {location.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
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

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground dark">
      <header className="sticky top-0 z-50 h-20 bg-card/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Immortal Cultivation
          </h1>
          <Badge
            variant="secondary"
            className="flex items-center gap-2 bg-muted text-primary border-primary/40"
          >
            <Mountain className="w-4 h-4" />
            Foundation Establishment
          </Badge>
          <Badge variant="outline" className="border-accent/40 text-accent">
            Realm: Qi Condensation 9th Layer
          </Badge>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-mono text-primary/80">
              {timePoints}/24 Time Points
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Coins className="w-5 h-5 text-primary" />
            <span className="font-mono text-primary/80">
              1,234,567 Spirit Stones
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="font-mono text-secondary/80">89/100 Qi</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Flame className="w-5 h-5 text-accent" />
            <span className="font-mono text-accent/80">
              45 Cultivation Points
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wind className="w-5 h-5 text-destructive" />
            <span className="font-mono text-destructive/80">
              12 Dao Insights
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="sticky top-20 z-40 bg-card/90 backdrop-blur-sm border-b border-border px-6 py-2">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4 bg-primary/10 px-4 py-2 rounded-lg border border-primary/40">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold">Available Time Points:</span>
            <span className="text-xl font-bold text-primary font-mono">
              {timePoints}/24
            </span>
            <div className="w-32">
              <Progress value={(timePoints / 24) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <aside className="sticky top-40 h-[calc(100vh-10rem)] overflow-y-auto w-64 bg-sidebar backdrop-blur-sm border-r border-sidebar-border p-4 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                <User className="w-4 h-4 text-primary" />
                Cultivator Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Cultivation Progress
                  </span>
                  <span className="font-mono text-primary">2,847/3,000</span>
                </div>
                <Progress value={94.9} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Body Tempering</span>
                  <span className="font-mono text-accent">78/100</span>
                </div>
                <Progress value={78} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Soul Strength</span>
                  <span className="font-mono text-secondary">45/80</span>
                </div>
                <Progress value={56.25} className="h-2 bg-muted" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-card-foreground">
                Spiritual Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  Spirit Stones
                </span>
                <span className="font-mono text-primary">1,234,567</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  Immortal Crystals
                </span>
                <span className="font-mono text-secondary">2,847</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">Qi Energy</span>
                <span className="font-mono text-muted-foreground">89/100</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  Spirit Herbs
                </span>
                <span className="font-mono text-accent">456</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  Beast Cores
                </span>
                <span className="font-mono text-destructive">234</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                <Star className="w-4 h-4 text-primary" />
                Dao Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="w-full justify-start border-primary/40 text-primary"
                >
                  First Breakthrough
                </Badge>
                <Badge
                  variant="outline"
                  className="w-full justify-start border-secondary/40 text-secondary"
                >
                  Spirit Stone Hoarder
                </Badge>
                <Badge
                  variant="secondary"
                  className="w-full justify-start bg-muted text-muted-foreground"
                >
                  Realm Ascender
                </Badge>
              </div>
            </CardContent>
          </Card>
        </aside>

        <aside className="sticky top-40 h-[calc(100vh-10rem)] w-48 bg-sidebar/60 backdrop-blur-sm border-r border-sidebar-border p-4">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              <Compass className="w-4 h-4 mr-2" />
              Explore
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </Button>
            <Button
              variant={activeTab === "Activities" ? "default" : "ghost"}
              className={
                activeTab === "Activities"
                  ? "w-full justify-start bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  : "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              }
              size="sm"
              onClick={() => setActiveTab("Activities")}
            >
              <Activity className="w-4 h-4 mr-2" />
              Activities
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            <Button
              variant={activeTab === "Travel" ? "default" : "ghost"}
              className={
                activeTab === "Travel"
                  ? "w-full justify-start bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  : "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              }
              size="sm"
              onClick={() => setActiveTab("Travel")}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Travel
            </Button>
          </nav>
        </aside>

        <main className="flex-1">
          <div className="h-full bg-background p-6">
            {activeTab === "Activities" && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    Time Currency Activities
                  </h2>
                  <p className="text-muted-foreground">
                    Allocate your daily time points across various cultivation
                    and life activities
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-primary" />
                        Time Points Budget
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Object.entries(categories).map(
                          ([categoryName, categoryActivities]) => (
                            <Card
                              key={categoryName}
                              className="bg-muted/30 border-border"
                            >
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg capitalize flex items-center gap-2">
                                  {categoryName === "work" && (
                                    <Briefcase className="w-5 h-5 text-primary" />
                                  )}
                                  {categoryName === "training" && (
                                    <Dumbbell className="w-5 h-5 text-secondary" />
                                  )}
                                  {categoryName === "study" && (
                                    <Book className="w-5 h-5 text-accent" />
                                  )}
                                  {categoryName === "social" && (
                                    <Heart className="w-5 h-5 text-destructive" />
                                  )}
                                  {categoryName === "life" && (
                                    <Home className="w-5 h-5 text-primary" />
                                  )}
                                  {categoryName === "hobby" && (
                                    <Music className="w-5 h-5 text-secondary" />
                                  )}
                                  {categoryName === "adventure" && (
                                    <Compass className="w-5 h-5 text-accent" />
                                  )}
                                  {categoryName} Activities
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                {categoryActivities.map((activity) => (
                                  <div
                                    key={activity.key}
                                    className="flex items-center justify-between p-3 bg-background rounded border"
                                  >
                                    <div className="flex items-center gap-2">
                                      <activity.icon className="w-4 h-4 text-muted-foreground" />
                                      <div>
                                        <h4 className="font-semibold text-sm">
                                          {activity.name}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                          {activity.cost} points •{" "}
                                          {activity.reward}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          updateActivity(activity.key, -1)
                                        }
                                        disabled={
                                          activities[
                                            activity.key as keyof typeof activities
                                          ] === 0
                                        }
                                      >
                                        <Minus className="w-4 h-4" />
                                      </Button>
                                      <span className="w-8 text-center font-mono text-sm">
                                        {
                                          activities[
                                            activity.key as keyof typeof activities
                                          ]
                                        }
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          updateActivity(activity.key, 1)
                                        }
                                        disabled={timePoints < activity.cost}
                                      >
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "Travel" && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    Cultivation World Travel
                  </h2>
                  <p className="text-muted-foreground">
                    Explore different realms and continents in your cultivation
                    journey
                  </p>
                </div>
                {renderTravelMap()}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
