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
  BookOpen,
  ChevronLeft,
  Sword,
  Leaf,
  Search,
  Brain,
  ArrowLeft,
  ScrollText,
  Target,
  CheckCircle,
  Users,
  Bed,
} from "lucide-react";
import { useState } from "react";

export default function IdleCultivationGame7() {
  const [activeTab, setActiveTab] = useState("Activities");
  const [selectedTimeScale, setSelectedTimeScale] = useState("Day");
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedEra, setSelectedEra] = useState(1); // 1 era = 1000 years
  const [selectedDecade, setSelectedDecade] = useState(1);
  const [calendarView, setCalendarView] = useState("month"); // month, year, decade, era

  const [timeScale, setTimeScale] = useState("day");
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

  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const [exploreView, setExploreView] = useState("main");
  const [eventLog, setEventLog] = useState([
    "You arrive at the Whispering Forest. The ancient trees seem to watch your every move.",
    "A gentle breeze carries the scent of medicinal herbs through the air.",
  ]);
  const [currentExploreLocation, setCurrentExploreLocation] =
    useState("Whispering Forest");

  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "Iron Sword",
      type: "weapon",
      rarity: "common",
      equipped: true,
    },
    {
      id: 2,
      name: "Leather Armor",
      type: "armor",
      rarity: "common",
      equipped: true,
    },
    {
      id: 3,
      name: "Health Potion",
      type: "consumable",
      rarity: "common",
      equipped: false,
    },
    {
      id: 4,
      name: "Spirit Ring",
      type: "ring",
      rarity: "rare",
      equipped: false,
    },
    {
      id: 5,
      name: "Cultivation Manual",
      type: "book",
      rarity: "epic",
      equipped: false,
    },
  ]);

  const [equippedItems, setEquippedItems] = useState({
    weapon: { id: 1, name: "Iron Sword", rarity: "common" },
    armor: { id: 2, name: "Leather Armor", rarity: "common" },
    helmet: null,
    boots: null,
    ring: null,
    amulet: null,
  });

  const [quests, setQuests] = useState({
    active: [
      {
        id: 1,
        title: "First Steps",
        description: "Complete your first cultivation session",
        progress: 1,
        maxProgress: 1,
        reward: "10 Spirit Stones",
      },
      {
        id: 2,
        title: "Forest Explorer",
        description: "Explore the Whispering Forest",
        progress: 0,
        maxProgress: 3,
        reward: "Beast Core",
      },
    ],
    completed: [
      {
        id: 0,
        title: "Awakening",
        description: "Begin your cultivation journey",
        reward: "Basic Cultivation Manual",
      },
    ],
  });

  const toggleCategory = (categoryName: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

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

  const resources = {
    money: 15420,
    gems: 847,
    spiritStones: 2340,
    pills: 156,
    artifacts: 23,
  };

  const currentLocation = "Azure Mountain Sect";

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

  const getCalendarTitle = () => {
    switch (calendarView) {
      case "era":
        return `Era ${selectedEra} (Years ${(selectedEra - 1) * 1000 + 1}-${
          selectedEra * 1000
        })`;
      case "decade":
        return `Era ${selectedEra}, Decade ${selectedDecade} (Years ${
          (selectedEra - 1) * 1000 + (selectedDecade - 1) * 10 + 1
        }-${(selectedEra - 1) * 1000 + selectedDecade * 10})`;
      case "year":
        return `Year ${
          (selectedEra - 1) * 1000 + (selectedDecade - 1) * 10 + selectedYear
        }`;
      case "month":
        return `Year ${
          (selectedEra - 1) * 1000 + (selectedDecade - 1) * 10 + selectedYear
        }, Month ${selectedMonth}`;
      default:
        return "Calendar";
    }
  };

  const events = [
    {
      date: 15,
      type: "past",
      activity: "Qi Cultivation",
      result: "Breakthrough to 8th layer",
      category: "cultivation",
    },
    {
      date: 18,
      type: "past",
      activity: "Beast Hunting",
      result: "Defeated Iron Claw Bear",
      category: "combat",
    },
    {
      date: 22,
      type: "future",
      activity: "Sect Tournament",
      result: "Preliminary rounds begin",
      category: "event",
    },
    {
      date: 25,
      type: "future",
      activity: "Auction House",
      result: "Rare pill auction",
      category: "event",
    },
    {
      date: 28,
      type: "past",
      activity: "Alchemy Work",
      result: "Crafted 5 Healing Pills",
      category: "crafting",
    },
  ];

  const currentDay = 20; // Current day in the month
  const daysInMonth = 30;

  const renderCalendarPage = () => {
    if (showDetailedView && selectedDate) {
      const dayEvents = events.filter((e) => e.date === selectedDate);
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetailedView(false)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Calendar
            </Button>
            <h3 className="text-lg font-semibold">Day {selectedDate} Events</h3>
          </div>
          <div className="space-y-2">
            {dayEvents.length > 0 ? (
              dayEvents.map((event, index) => (
                <Card
                  key={index}
                  className={`border-border/50 ${
                    event.type === "future"
                      ? "bg-violet-950/30 border-violet-500/30"
                      : "bg-muted/30"
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{event.activity}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.result}
                        </p>
                      </div>
                      <Badge
                        variant={
                          event.type === "future" ? "secondary" : "outline"
                        }
                      >
                        {event.type === "future" ? "Upcoming" : "Completed"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No events recorded for this day
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Cultivation Chronicle
          </h2>
          <p className="text-muted-foreground">
            Navigate through eons of your immortal journey
          </p>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Button
              variant={calendarView === "era" ? "default" : "outline"}
              size="sm"
              onClick={() => setCalendarView("era")}
              className="text-xs"
            >
              Era
            </Button>
            <Button
              variant={calendarView === "decade" ? "default" : "outline"}
              size="sm"
              onClick={() => setCalendarView("decade")}
              className="text-xs"
            >
              Decade
            </Button>
            <Button
              variant={calendarView === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setCalendarView("year")}
              className="text-xs"
            >
              Year
            </Button>
            <Button
              variant={calendarView === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setCalendarView("month")}
              className="text-xs"
            >
              Month
            </Button>
          </div>

          <div className="h-4 w-px bg-slate-700"></div>

          {calendarView !== "era" && (
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(Number(e.target.value))}
              className="bg-black border border-slate-700/50 rounded px-2 py-1 text-xs"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Era {i + 1}
                </option>
              ))}
            </select>
          )}

          {(calendarView === "year" || calendarView === "month") && (
            <select
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(Number(e.target.value))}
              className="bg-black border border-slate-700/50 rounded px-2 py-1 text-xs"
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Decade {i + 1}
                </option>
              ))}
            </select>
          )}

          {calendarView === "month" && (
            <>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-black border border-slate-700/50 rounded px-2 py-1 text-xs"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Year {i + 1}
                  </option>
                ))}
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="bg-black border border-slate-700/50 rounded px-2 py-1 text-xs"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Month {i + 1}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4 text-purple-400" />
              {getCalendarTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-slate-400 p-1"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const hasEvent = events.some((e) => e.date === day);
                const isCurrentDay = day === currentDay;
                const hasUpcomingEvent = events.some(
                  (e) => e.date === day && e.type === "future"
                );

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(day);
                      setShowDetailedView(true);
                    }}
                    className={`
                      relative p-2 text-sm rounded hover:bg-slate-800/50 transition-colors
                      ${
                        isCurrentDay
                          ? "bg-purple-500/20 border border-purple-500/50"
                          : ""
                      }
                      ${hasEvent ? "font-semibold" : ""}
                    `}
                  >
                    {day}
                    {isCurrentDay && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-purple-400 rounded-full"></div>
                    )}
                    {hasEvent && (
                      <div
                        className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                          hasUpcomingEvent ? "bg-violet-300" : "bg-slate-300"
                        }`}
                      ></div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStoryPage = () => {
    const storyEntries = [
      {
        time: "Day 1, Morning",
        entry:
          "You awakened as a humble farmer in the Azure Mountain region. At 23 years old, your mortal body yearns for something greater than tilling fields.",
        type: "narrative",
      },
      {
        time: "Day 1, Afternoon",
        entry:
          "While working in the fields, you discovered a strange glowing stone. Upon touching it, visions of immortal cultivators filled your mind.",
        type: "discovery",
      },
      {
        time: "Day 2, Dawn",
        entry:
          "You traveled to the Azure Mountain Sect and begged the outer disciples for a chance to join. After demonstrating your determination, Elder Chen agreed to test your spiritual roots.",
        type: "journey",
      },
      {
        time: "Day 3, Evening",
        entry:
          "Your spiritual roots were deemed 'acceptable' - not genius level, but sufficient for cultivation. You were accepted as an outer disciple.",
        type: "achievement",
      },
      {
        time: "Day 5, Night",
        entry:
          "You ventured into the Whispering Forest and hunted 47 Spirit Rabbits, earning your first combat experience and 340 Spirit Stones.",
        type: "combat",
      },
    ];

    return (
      <div className="space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Chronicle of Immortality
          </h2>
          <p className="text-muted-foreground">
            The narrative of your journey from mortal to immortal
          </p>
        </div>

        {/* Reduced spacing between story entries from space-y-3 to space-y-2 */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {storyEntries.map((entry, index) => (
            <Card key={index} className="bg-card border-border/50">
              {/* Reduced card padding from p-3 to p-2 */}
              <CardContent className="p-2">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        entry.type === "narrative"
                          ? "border-purple-500/50 text-purple-400"
                          : entry.type === "discovery"
                          ? "border-yellow-500/50 text-yellow-400"
                          : entry.type === "journey"
                          ? "border-blue-500/50 text-blue-400"
                          : entry.type === "achievement"
                          ? "border-green-500/50 text-green-400"
                          : "border-red-500/50 text-red-400"
                      }`}
                    >
                      {entry.time}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {entry.entry}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderActivitiesPage = () => {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Daily Activities
          </h2>
          <p className="text-muted-foreground">
            Manage your time and cultivation path wisely
          </p>
        </div>

        {Object.entries(categories).map(
          ([categoryName, categoryActivities]) => (
            <div key={categoryName} className="space-y-2">
              {/* Made category headers clickable to toggle collapse */}
              <button
                onClick={() => toggleCategory(categoryName)}
                className="flex items-center gap-2 text-lg font-semibold text-purple-300 capitalize hover:text-purple-200 transition-colors"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    collapsedCategories[categoryName] ? "-rotate-90" : ""
                  }`}
                />
                {categoryName}
              </button>
              {/* Added conditional rendering for collapsible categories */}
              {!collapsedCategories[categoryName] && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {categoryActivities.map((activity) => (
                    <Card
                      key={activity.key}
                      className="bg-card border-border/50"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <activity.icon className="w-4 h-4 text-purple-400" />
                          {activity.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400 font-semibold">
                            Cost
                          </span>
                          <span className="font-mono text-purple-400 text-xs">
                            {activity.cost}h
                          </span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400 font-semibold">
                            Reward
                          </span>
                          <span className="font-mono text-violet-400 text-xs">
                            {activity.reward}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400 font-semibold">
                            Allocated
                          </span>
                          <span className="font-mono text-orange-400 text-xs">
                            {
                              activities[
                                activity.key as keyof typeof activities
                              ]
                            }
                            h
                          </span>
                        </div>
                        <div className="flex justify-between items-center gap-1 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateActivity(activity.key, -1)}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateActivity(activity.key, 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    );
  };

  const renderTravelPage = () => {
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
              <MapPin className="w-4 h-4 text-purple-400" />
              <span className="text-purple-200 font-semibold">Location:</span>
              <span className="text-violet-300 font-bold">
                {currentLocation}
              </span>
            </div>
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
        {/* Stats Panel */}
        <div className="w-64 bg-black border-r border-slate-800/50 p-3 space-y-3 fixed left-0 top-28 h-[calc(100vh-7rem)] overflow-hidden">
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

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Coins className="w-4 h-4 text-yellow-400" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">
                  Gold
                </span>
                <span className="font-mono text-yellow-400 text-xs">
                  {resources.money.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">
                  Gems
                </span>
                <span className="font-mono text-blue-400 text-xs">
                  {resources.gems.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">
                  Spirit Stones
                </span>
                <span className="font-mono text-purple-400 text-xs">
                  {resources.spiritStones.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">
                  Pills
                </span>
                <span className="font-mono text-green-400 text-xs">
                  {resources.pills}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">
                  Artifacts
                </span>
                <span className="font-mono text-red-400 text-xs">
                  {resources.artifacts}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 text-green-400" />
                Living Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">
                  Housing
                </span>
                <span className="font-mono text-green-400 text-xs">
                  Simple Hut
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">
                  Meal Quality
                </span>
                <span className="font-mono text-yellow-400 text-xs">Basic</span>
              </div>
              <div className="py-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-semibold">
                    Lifestyle
                  </span>
                  <span className="text-purple-300">Poor</span>
                </div>
                <Progress
                  value={25}
                  className="h-1 bg-slate-800 [&>div]:bg-purple-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">
                  EXP Multiplier
                </span>
                <span className="font-mono text-purple-400 text-xs">x0.8</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Sidebar */}
        <div className="w-48 bg-black border-r border-slate-800/50 p-3 fixed left-64 top-28 h-[calc(100vh-7rem)] overflow-hidden">
          <nav className="space-y-1">
            {[
              { name: "Explore", icon: Compass },
              { name: "Inventory", icon: Package },
              { name: "Activities", icon: Activity },
              { name: "Quests", icon: Target },
              { name: "Travel", icon: MapPin },
              { name: "Stats", icon: BarChart3 },
              { name: "Recap", icon: Calendar },
              { name: "Story", icon: BookOpen },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                  activeTab === item.name
                    ? "bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border border-purple-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Game Zone */}
        <div
          className="flex-1 p-4 overflow-y-auto"
          style={{ marginLeft: "28rem" }}
        >
          {activeTab === "Explore" && renderExplorePage()}
          {activeTab === "Inventory" && renderInventoryPage()}
          {activeTab === "Activities" && renderActivitiesPage()}
          {activeTab === "Quests" && renderQuestsPage()}
          {activeTab === "Travel" && renderTravelPage()}
          {activeTab === "Stats" && renderStatsPage()}
          {activeTab === "Recap" && renderCalendarPage()}
          {activeTab === "Story" && renderStoryPage()}
        </div>
      </div>
    </div>
  );

  function renderInventoryPage() {
    const equipItem = (item) => {
      if (item.type in equippedItems) {
        setEquippedItems((prev) => ({ ...prev, [item.type]: item }));
        setInventoryItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, equipped: true } : i))
        );
      }
    };

    const unequipItem = (slot) => {
      const item = equippedItems[slot];
      if (item) {
        setEquippedItems((prev) => ({ ...prev, [slot]: null }));
        setInventoryItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, equipped: false } : i))
        );
      }
    };

    const getRarityColor = (rarity) => {
      switch (rarity) {
        case "common":
          return "text-slate-400";
        case "rare":
          return "text-blue-400";
        case "epic":
          return "text-purple-400";
        case "legendary":
          return "text-yellow-400";
        default:
          return "text-slate-400";
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Inventory & Equipment
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Equipment Slots */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200">
                Equipment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(equippedItems).map(([slot, item]) => (
                  <div
                    key={slot}
                    className="aspect-square border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center p-2 hover:border-purple-500/50 transition-colors cursor-pointer"
                    onClick={() => item && unequipItem(slot)}
                  >
                    <div className="text-xs text-slate-400 mb-1 capitalize">
                      {slot}
                    </div>
                    {item ? (
                      <div className="text-center">
                        <div
                          className={`text-xs font-semibold ${getRarityColor(
                            item.rarity
                          )}`}
                        >
                          {item.name}
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-600 text-xs">Empty</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Items */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200">Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                {inventoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`aspect-square border rounded-lg flex flex-col items-center justify-center p-2 cursor-pointer transition-colors ${
                      item.equipped
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-slate-600 hover:border-purple-500/50"
                    }`}
                    onClick={() => !item.equipped && equipItem(item)}
                  >
                    <div
                      className={`text-xs font-semibold text-center ${getRarityColor(
                        item.rarity
                      )}`}
                    >
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500 capitalize">
                      {item.type}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function renderQuestsPage() {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Quests
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Quests */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                Active Quests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quests.active.map((quest) => (
                <div
                  key={quest.id}
                  className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-purple-300">
                      {quest.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="border-yellow-500/50 text-yellow-400"
                    >
                      {quest.progress}/{quest.maxProgress}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">
                    {quest.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Progress
                      value={(quest.progress / quest.maxProgress) * 100}
                      className="flex-1 mr-3 h-2 bg-slate-800 [&>div]:bg-yellow-500"
                    />
                    <span className="text-xs text-green-400">
                      Reward: {quest.reward}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Completed Quests */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Completed Quests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quests.completed.map((quest) => (
                <div
                  key={quest.id}
                  className="p-3 rounded-lg bg-slate-900/30 border border-slate-700/30"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-green-300">
                      {quest.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="border-green-500/50 text-green-400"
                    >
                      Complete
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">
                    {quest.description}
                  </p>
                  <span className="text-xs text-green-400">
                    Reward: {quest.reward}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function renderExplorePage() {
    const locationData = {
      "Whispering Forest": {
        description:
          "An ancient forest filled with spiritual energy and mysterious creatures.",
        activities: [
          {
            name: "Hunt Wild Beasts",
            icon: Sword,
            danger: "Medium",
            reward: "Beast cores, Experience",
            time: "2h",
          },
          {
            name: "Gather Herbs",
            icon: Leaf,
            danger: "Low",
            reward: "Medicinal herbs, Spirit grass",
            time: "1h",
          },
          {
            name: "Explore Deeper",
            icon: Search,
            danger: "High",
            reward: "Hidden treasures, Ancient ruins",
            time: "4h",
          },
          {
            name: "Meditate",
            icon: Brain,
            danger: "None",
            reward: "Cultivation progress, Inner peace",
            time: "3h",
          },
        ],
        navigation: [
          {
            name: "Return to Village",
            location: "Peaceful Village",
            time: "30 min",
          },
        ],
      },
      "Peaceful Village": {
        description:
          "A small village where mortals and low-level cultivators live in harmony.",
        activities: [
          {
            name: "Visit Shop",
            icon: ShoppingCart,
            danger: "None",
            reward: "Equipment, Supplies",
            time: "30min",
          },
          {
            name: "Talk to Villagers",
            icon: Users,
            danger: "None",
            reward: "Information, Quests",
            time: "1h",
          },
          {
            name: "Rest at Inn",
            icon: Bed,
            danger: "None",
            reward: "Full HP, Mood boost",
            time: "8h",
          },
        ],
        navigation: [
          {
            name: "Enter Forest",
            location: "Whispering Forest",
            time: "30 min",
          },
        ],
      },
    };

    const currentLocationData =
      locationData[currentExploreLocation] || locationData["Whispering Forest"];

    if (exploreView === "shop") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Village Shop
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExploreView("main")}
              className="border-slate-600 text-slate-300"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Iron Sword",
                price: 50,
                type: "weapon",
                rarity: "common",
              },
              {
                name: "Health Potion",
                price: 10,
                type: "consumable",
                rarity: "common",
              },
              {
                name: "Leather Boots",
                price: 30,
                type: "boots",
                rarity: "common",
              },
              { name: "Spirit Ring", price: 200, type: "ring", rarity: "rare" },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-black border-slate-700/50 hover:border-purple-500/30 transition-colors cursor-pointer"
              >
                <CardContent className="p-3">
                  <div className="text-sm font-semibold text-purple-300">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-400 capitalize">
                    {item.type}
                  </div>
                  <div className="text-xs text-yellow-400 mt-2">
                    {item.price} Gold
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (exploreView === "conversation") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Village Elder
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExploreView("main")}
              className="border-slate-600 text-slate-300"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>

          <Card className="bg-black border-slate-700/50">
            <CardContent className="p-4">
              <p className="text-slate-300 mb-4">
                "Young cultivator, I sense great potential in you. The path
                ahead is treacherous, but with dedication, you may reach the
                heavens themselves."
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-slate-300 bg-transparent"
                >
                  "Tell me about cultivation"
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-slate-300 bg-transparent"
                >
                  "Are there any quests for me?"
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-slate-300 bg-transparent"
                >
                  "I must go now"
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // ... existing combat code ...

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {currentExploreLocation}
            </h2>
          </div>
          <div className="text-sm text-slate-400">
            Current Day: <span className="text-purple-300 font-bold">127</span>
          </div>
        </div>

        <Card className="bg-black border-slate-700/50">
          <CardContent className="p-3">
            <p className="text-slate-300 text-sm leading-relaxed">
              {currentLocationData.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Activities */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
                <Activity className="w-5 h-5 text-purple-400" />
                Available Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {currentLocationData.activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition-colors cursor-pointer"
                  onClick={() => {
                    if (activity.name === "Hunt Wild Beasts") {
                      setExploreView("combat");
                    } else if (activity.name === "Visit Shop") {
                      setExploreView("shop");
                    } else if (activity.name === "Talk to Villagers") {
                      setExploreView("conversation");
                    } else {
                      setEventLog((prev) => [
                        ...prev,
                        `You decided to ${activity.name.toLowerCase()}...`,
                      ]);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <activity.icon className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-sm font-semibold text-slate-200">
                        {activity.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        Time:{" "}
                        <span className="text-purple-300">{activity.time}</span>{" "}
                        | Danger:{" "}
                        <span
                          className={`font-semibold ${
                            activity.danger === "High"
                              ? "text-red-400"
                              : activity.danger === "Medium"
                              ? "text-yellow-400"
                              : activity.danger === "Low"
                              ? "text-green-400"
                              : "text-slate-400"
                          }`}
                        >
                          {activity.danger}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 text-right">
                    {activity.reward}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
                <MapPin className="w-5 h-5 text-violet-400" />
                Travel Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentLocationData.navigation.map((nav, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-violet-500/30 transition-colors cursor-pointer"
                  onClick={() => {
                    setCurrentExploreLocation(nav.location);
                    setEventLog((prev) => [
                      ...prev,
                      `You traveled to ${nav.location}.`,
                    ]);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-semibold text-slate-200">
                      {nav.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{nav.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Event Log */}
        <Card className="bg-black border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
              <ScrollText className="w-5 h-5 text-purple-400" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {eventLog.map((event, index) => (
                <div
                  key={index}
                  className="text-sm text-slate-300 p-2 rounded bg-slate-900/30 border-l-2 border-purple-500/30"
                >
                  {event}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
