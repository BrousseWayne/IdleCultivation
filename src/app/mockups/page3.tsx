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
  ChevronDown,
  Play,
  Pause,
  FastForward,
  ChevronUp,
  Smile,
  BarChart3,
  FileText,
} from "lucide-react";
import { useState } from "react";

export default function IdleGameInterface() {
  const [timeScale, setTimeScale] = useState("day");
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const timeScales = {
    day: { label: "Day", multiplier: 1, unit: "day" },
    week: { label: "Week", multiplier: 7, unit: "week" },
    month: { label: "Month", multiplier: 30, unit: "month" },
  };

  const currentScale = timeScales[timeScale as keyof typeof timeScales];
  const maxTimePoints = 24 * currentScale.multiplier;
  const [timePoints, setTimePoints] = useState(maxTimePoints);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [statsCollapsed, setStatsCollapsed] = useState(false);

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

    if (currentTotal <= maxTimePoints) {
      setActivities((prev) => ({ ...prev, [key]: newValue }));
      setTimePoints(maxTimePoints - currentTotal);
    }
  };

  const handleTimeScaleChange = (newScale: string) => {
    setTimeScale(newScale);
    const newMaxPoints =
      24 * timeScales[newScale as keyof typeof timeScales].multiplier;
    setTimePoints(newMaxPoints);
    setActivities({
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
  };

  const totalUsed = Object.entries(activities).reduce((sum, [key, value]) => {
    const activity = activityData.find((a) => a.key === key);
    return sum + value * (activity?.cost || 0);
  }, 0);

  const freeTime = maxTimePoints - totalUsed - 8; // 8 hours for sleep/eating
  const moodBonus = Math.floor(freeTime * 2); // 2 mood points per free hour
  const currentTask = "Qi Cultivation";

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

  const renderStatsPage = () => {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Cultivator Statistics
          </h2>
          <p className="text-muted-foreground">
            Comprehensive overview of your cultivation progress and abilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="w-4 h-4 text-purple-400" />
                Core Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-slate-400 font-semibold">
                  Cultivation Progress
                </span>
                <span className="font-mono text-primary text-sm">
                  2,847/3,000
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-slate-400 font-semibold">
                  Body Tempering
                </span>
                <span className="font-mono text-accent text-sm">78/100</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
              <div className="py-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400 font-semibold">HP</span>
                </div>
                <div className="relative group cursor-help">
                  <Progress
                    value={100}
                    className="h-2 bg-slate-800 [&>div]:bg-green-500"
                  />
                  <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                    100/100 HP
                  </div>
                </div>
              </div>
              <div className="py-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400 font-semibold">Hunger</span>
                </div>
                <div className="relative group cursor-help">
                  <Progress
                    value={85}
                    className="h-2 bg-slate-800 [&>div]:bg-orange-500"
                  />
                  <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                    85/100 Hunger
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Briefcase className="w-4 h-4 text-secondary" />
                Skills & Abilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Crafting Skill
                </span>
                <span className="font-mono text-primary text-sm">67/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Trading Skill
                </span>
                <span className="font-mono text-accent text-sm">34/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Cooking Skill
                </span>
                <span className="font-mono text-secondary text-sm">45/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Musical Skill
                </span>
                <span className="font-mono text-destructive text-sm">
                  12/100
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Heart className="w-4 h-4 text-accent" />
                Social & Mental
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Relationship Points
                </span>
                <span className="font-mono text-primary text-sm">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Knowledge</span>
                <span className="font-mono text-accent text-sm">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Strategic Thinking
                </span>
                <span className="font-mono text-secondary text-sm">43</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Artistic Skill
                </span>
                <span className="font-mono text-destructive text-sm">28</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCalendarPage = () => {
    const years = Array.from({ length: 100 }, (_, i) => i + 1); // First 100 years
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const events = [
      {
        day: "Day 1",
        activity: "Qi Cultivation",
        result: "Breakthrough to 8th layer",
      },
      {
        day: "Day 2",
        activity: "Beast Hunting",
        result: "Defeated Iron Claw Bear",
      },
      {
        day: "Day 3",
        activity: "Alchemy Work",
        result: "Crafted 5 Healing Pills",
      },
      {
        day: "Day 4",
        activity: "Sect Duties",
        result: "Earned 960 Spirit Stones",
      },
      { day: "Day 5", activity: "Meditation", result: "Soul Strength +30" },
    ];

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Cultivation Journal
          </h2>
          <p className="text-muted-foreground">
            Record of your cultivation journey and daily activities
          </p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-black border border-slate-700/50 rounded px-2 py-1 text-sm"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Month:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-black border border-slate-700/50 rounded px-2 py-1 text-sm"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  Month {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4 text-purple-400" />
              Events - Year {selectedYear}, Month {selectedMonth}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/30"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.day}
                    </Badge>
                    <span className="font-medium text-sm">
                      {event.activity}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {event.result}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-foreground dark">
      <header className="sticky top-0 z-50 h-20 bg-black/95 backdrop-blur-sm border-b border-slate-800/50 flex flex-col px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Immortal Cultivation
            </h1>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-slate-900 text-purple-300 border-purple-500/30 text-xs"
              >
                <Mountain className="w-3 h-3" />
                Human: Mortal
              </Badge>
              <Badge
                variant="outline"
                className="border-violet-500/30 text-violet-400 text-xs"
              >
                Qi Condensation 9th Layer
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-purple-200 font-semibold">
                Current Task:
              </span>
              <span className="text-violet-300 font-bold">{currentTask}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-purple-200 font-semibold">Free Time:</span>
              <span className="text-violet-300 font-bold">{freeTime}h</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Smile className="w-4 h-4 text-violet-400" />
              <span className="text-violet-200 font-semibold">Mood Bonus:</span>
              <span className="text-purple-300 font-bold">+{moodBonus}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="sticky top-20 z-40 bg-black/90 backdrop-blur-sm border-b border-slate-800/50 px-4 py-2">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-3 bg-purple-500/10 px-3 py-2 rounded-lg border border-purple-500/30">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-sm">
              Available Time Points:
            </span>
            <span className="text-xl font-bold text-purple-400 font-mono">
              {timePoints}/{maxTimePoints}
            </span>
            <div className="w-32 relative">
              <Progress
                value={(timePoints / maxTimePoints) * 100}
                className="h-2"
              />
              <div
                className="absolute top-0 right-0 h-2 bg-slate-500/60 rounded-r group cursor-help border border-slate-400/40"
                style={{ width: `${(8 / maxTimePoints) * 100}%` }}
                title="Sleep: 7h, Eating: 1h"
              >
                <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                  Sleep: 7h, Eating: 1h
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700/50">
            <Calendar className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 font-bold text-sm">Day 127</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700/50">
            <Button
              size="sm"
              variant={isPlaying ? "default" : "outline"}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-7 h-7 p-0"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
            </Button>
            <Button
              size="sm"
              variant={gameSpeed > 1 ? "default" : "outline"}
              onClick={() =>
                setGameSpeed(gameSpeed === 1 ? 2 : gameSpeed === 2 ? 4 : 1)
              }
              className="w-7 h-7 p-0"
            >
              <FastForward className="w-3 h-3" />
            </Button>
            {gameSpeed > 1 && (
              <span className="text-xs text-muted-foreground">
                {gameSpeed}x
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700/50">
            <span className="text-sm font-medium">Planning Scale:</span>
            <div className="relative">
              <select
                value={timeScale}
                onChange={(e) => handleTimeScaleChange(e.target.value)}
                className="appearance-none bg-black border border-slate-700/50 rounded px-2 py-1 text-sm font-medium pr-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {Object.entries(timeScales).map(([key, scale]) => (
                  <option key={key} value={key}>
                    {scale.label} ({24 * scale.multiplier}h)
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <aside className="sticky top-44 h-[calc(100vh-11rem)] overflow-y-auto w-60 backdrop-blur-sm border-slate-800/50 p-3 space-y-3 bg-black leading-6 border-r">
          <Card className="border-slate-700/50 bg-black">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm flex items-center justify-between text-slate-200">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-400" />
                  Cultivator Status
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStatsCollapsed(!statsCollapsed)}
                  className="w-6 h-6 p-0"
                >
                  {statsCollapsed ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            {!statsCollapsed && (
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-slate-400 font-semibold">
                    Age / Lifespan
                  </span>
                  <span className="font-mono text-sm">
                    <span className="text-purple-300 font-bold">23</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-violet-400">150</span>
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-slate-400 font-semibold">
                    Mood
                  </span>
                  <span className="font-mono text-purple-300 font-bold text-sm">
                    Content (+{moodBonus})
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
                <div className="py-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400 font-semibold">HP</span>
                  </div>
                  <div className="relative group cursor-help">
                    <Progress
                      value={100}
                      className="h-2 bg-slate-800 [&>div]:bg-green-500"
                    />
                    <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border/50 rounded px-2 py-1 text-xs whitespace-nowrap">
                      100/100 HP
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400 font-semibold">Hunger</span>
                  </div>
                  <div className="relative group cursor-help">
                    <Progress
                      value={85}
                      className="h-2 bg-slate-800 [&>div]:bg-orange-500"
                    />
                    <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border/50 rounded px-2 py-1 text-xs whitespace-nowrap">
                      85/100 Hunger
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </aside>

        <aside className="sticky top-44 h-[calc(100vh-11rem)] w-48 bg-black/40 backdrop-blur-sm border-r border-slate-800/50 p-3">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              size="sm"
            >
              <Compass className="w-4 h-4 mr-2" />
              Explore
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              size="sm"
            >
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </Button>
            <Button
              variant={activeTab === "Activities" ? "default" : "ghost"}
              className={
                activeTab === "Activities"
                  ? "w-full justify-start bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
                  : "w-full justify-start text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }
              size="sm"
              onClick={() => setActiveTab("Activities")}
            >
              <Activity className="w-4 h-4 mr-2" />
              Activities
            </Button>
            <Button
              variant={activeTab === "Stats" ? "default" : "ghost"}
              className={
                activeTab === "Stats"
                  ? "w-full justify-start bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
                  : "w-full justify-start text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }
              size="sm"
              onClick={() => setActiveTab("Stats")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Stats
            </Button>
            <Button
              variant={activeTab === "Recap" ? "default" : "ghost"}
              className={
                activeTab === "Recap"
                  ? "w-full justify-start bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
                  : "w-full justify-start text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }
              size="sm"
              onClick={() => setActiveTab("Recap")}
            >
              <FileText className="w-4 h-4 mr-2" />
              Recap/Calendar
            </Button>
            <Button
              variant={activeTab === "Travel" ? "default" : "ghost"}
              className={
                activeTab === "Travel"
                  ? "w-full justify-start bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
                  : "w-full justify-start text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }
              size="sm"
              onClick={() => setActiveTab("Travel")}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Travel
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-4 overflow-y-auto">
          {activeTab === "Activities" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  Time Currency Activities
                </h2>
                <p className="text-slate-400">
                  Allocate your daily time points across various cultivation and
                  life activities
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-slate-700 bg-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-purple-400" />
                      Time Points Budget
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {Object.entries(categories).map(
                        ([categoryName, categoryActivities]) => (
                          <Card
                            key={categoryName}
                            className="bg-black/30 border-slate-700"
                          >
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg capitalize flex items-center gap-2">
                                {categoryName === "work" && (
                                  <Briefcase className="w-5 h-5 text-purple-400" />
                                )}
                                {categoryName === "training" && (
                                  <Dumbbell className="w-5 h-5 text-pink-400" />
                                )}
                                {categoryName === "study" && (
                                  <Book className="w-5 h-5 text-cyan-400" />
                                )}
                                {categoryName === "social" && (
                                  <Heart className="w-5 h-5 text-red-400" />
                                )}
                                {categoryName === "life" && (
                                  <Home className="w-5 h-5 text-purple-400" />
                                )}
                                {categoryName === "hobby" && (
                                  <Music className="w-5 h-5 text-pink-400" />
                                )}
                                {categoryName === "adventure" && (
                                  <Compass className="w-5 h-5 text-cyan-400" />
                                )}
                                {categoryName} Activities
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {categoryActivities.map((activity) => (
                                <div
                                  key={activity.key}
                                  className="flex items-center justify-between p-3 bg-black rounded border border-purple-500/30 hover:border-purple-400/50 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <activity.icon className="w-4 h-4 text-purple-400" />
                                    <div>
                                      <h4 className="font-bold text-sm text-purple-200">
                                        {activity.name}
                                      </h4>
                                      <p className="text-xs text-slate-400">
                                        <span className="font-semibold">
                                          {activity.cost} points
                                        </span>{" "}
                                        • {activity.reward}
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
                                      className="border-purple-600/50 hover:border-purple-500 text-purple-300 hover:text-purple-200"
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
                                      className="border-purple-600/50 hover:border-purple-500 text-purple-300 hover:text-purple-200"
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

          {activeTab === "Stats" && renderStatsPage()}
          {activeTab === "Recap" && renderCalendarPage()}

          {activeTab === "Travel" && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  Cultivation World Travel
                </h2>
                <p className="text-slate-400">
                  Explore different realms and continents in your cultivation
                  journey
                </p>
              </div>
              {renderTravelMap()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
