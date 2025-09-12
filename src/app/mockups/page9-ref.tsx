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
  Smile,
  BarChart3,
  BookOpen,
  ChevronLeft,
  Sword,
  Leaf,
  ScrollText,
  Target,
  CheckCircle,
  ShoppingBag,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

export default function IdleCultivationGameRef() {
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
  const [resourcesCollapsed, setResourcesCollapsed] = useState(false);
  const [livingCollapsed, setLivingCollapsed] = useState(false);

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

  const activeQuests = [
    {
      id: 1,
      title: "Clear the Forest",
      description: "Eliminate the wild beasts in the Whispering Forest.",
      progress: 60,
      reward: "150 Spirit Stones",
      timeLeft: "2 days",
    },
    {
      id: 2,
      title: "Gather Rare Herbs",
      description: "Collect 10 rare herbs for the village alchemist.",
      progress: 35,
      reward: "Elixir of Minor Healing",
      timeLeft: "4 days",
    },
  ];

  const completedQuests = [
    {
      id: 3,
      title: "Protect the Village",
      description: "Defend the village from a bandit raid.",
      reward: "Reputation with the villagers",
      completedDate: "2024-01-15",
    },
    {
      id: 4,
      title: "Find Lost Artifact",
      description: "Recover an ancient artifact from the ruins.",
      reward: "Mysterious Amulet",
      completedDate: "2024-01-10",
    },
  ];

  const storyEntries = [
    {
      text: "You arrived in the village and started your new life.",
      timestamp: "2024-01-20 10:30",
    },
    {
      text: "You completed your first quest and earned the villagers' trust.",
      timestamp: "2024-01-22 14:45",
    },
    {
      text: "You discovered a hidden path in the forest.",
      timestamp: "2024-01-25 08:12",
    },
  ];

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
            <Card key={index} className="bg-card border-border/50 py-0">
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
        <div className="w-64 bg-black border-r border-slate-800/50 p-3 space-y-3 fixed left-0 top-32 h-[calc(100vh-8rem)] overflow-hidden py-6 flex-col leading-7">
          <Card className="border-slate-700/50 bg-black py-3.5">
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
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      statsCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CardTitle>
            </CardHeader>
            {!statsCollapsed && (
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Age/Lifespan:</span>
                  <span className="text-purple-300 font-bold">23/150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mood:</span>
                  <span className="text-violet-300 font-bold">Content</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">HP:</span>
                    <span className="text-green-300 font-bold">100/100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hunger:</span>
                    <span className="text-orange-300 font-bold">75/100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className="bg-orange-500 h-1.5 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="border-slate-700/50 bg-black">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm flex items-center justify-between text-slate-200">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  Resources
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setResourcesCollapsed(!resourcesCollapsed)}
                  className="w-6 h-6 p-0"
                >
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      resourcesCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CardTitle>
            </CardHeader>
            {!resourcesCollapsed && (
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Gold:</span>
                  <span className="text-yellow-300 font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Spirit Stones:</span>
                  <span className="text-cyan-300 font-bold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gems:</span>
                  <span className="text-purple-300 font-bold">23</span>
                </div>
                <div className="border-t border-slate-700/50 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Daily Income:</span>
                    <span className="text-green-300 font-bold">+45g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Daily Expenses:</span>
                    <span className="text-red-300 font-bold">-32g</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300">Net Income:</span>
                    <span className="text-green-400">+13g</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="border-slate-700/50 bg-black leading-7 flex-col px-0 py-3.5">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm flex items-center justify-between text-slate-200">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-green-400" />
                  Living Conditions
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLivingCollapsed(!livingCollapsed)}
                  className="w-6 h-6 p-0"
                >
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      livingCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CardTitle>
            </CardHeader>
            {!livingCollapsed && (
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Housing:</span>
                  <span className="text-green-300 font-bold">
                    Small Cottage
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Meal Quality:</span>
                  <span className="text-yellow-300 font-bold">Average</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lifestyle:</span>
                    <span className="text-blue-300 font-bold">
                      Modest (65%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">XP Multiplier:</span>
                  <span className="text-purple-300 font-bold">1.2x</span>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Navigation Sidebar */}
        <div className="w-48 bg-black border-r border-slate-800/50 p-3 fixed left-64 top-32 h-[calc(100vh-8rem)] overflow-hidden px-3 py-6">
          <nav className="space-y-1">
            {[
              { name: "Explore", icon: Compass },
              { name: "Inventory", icon: Package },
              { name: "Activities", icon: Activity },
              { name: "Quests", icon: Target },
              { name: "Lifestyle", icon: Home },
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
          {activeTab === "Lifestyle" && renderLifestylePage()}
          {activeTab === "Travel" && renderTravelPage()}
          {activeTab === "Stats" && renderStatsPage()}
          {activeTab === "Recap" && renderCalendarPage()}
          {activeTab === "Story" && renderStoryPage()}
        </div>
      </div>
    </div>
  );

  function renderExplorePage() {
    if (exploreView === "shop") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setExploreView("main")}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {currentExploreLocation}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Merchant's Shop
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-black border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-200">
                  Available Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "Iron Sword",
                    price: "50 Gold",
                    stats: "+10 Attack",
                    icon: Sword,
                  },
                  {
                    name: "Health Potion",
                    price: "20 Gold",
                    stats: "Restores 100 HP",
                    icon: Heart,
                  },
                  {
                    name: "Spirit Herb",
                    price: "15 Gold",
                    stats: "+5 Qi Recovery",
                    icon: Leaf,
                  },
                  {
                    name: "Cultivation Manual",
                    price: "200 Gold",
                    stats: "+50 XP",
                    icon: ScrollText,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="font-semibold text-slate-200">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.stats}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-amber-400">
                        {item.price}
                      </div>
                      <button className="text-xs text-purple-400 hover:text-purple-300">
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-black border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-200">
                  Merchant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    "Welcome, young cultivator! I have the finest wares from
                    across the realm. What catches your eye today?"
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm transition-colors">
                      Browse Weapons
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm transition-colors">
                      Ask About Rumors
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    if (exploreView === "conversation") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setExploreView("main")}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {currentExploreLocation}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Encounter
            </h2>
          </div>

          <Card className="bg-black border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-200">
                Arrogant Young Master
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                "How dare a mere mortal like you walk the same path as this
                young master! Do you not know who I am? Kneel and apologize, or
                face the consequences!"
              </p>

              <div className="space-y-2">
                <button
                  className="w-full p-3 rounded-lg bg-red-900/50 border border-red-700/50 hover:border-red-500/50 text-red-300 text-sm transition-colors"
                  onClick={() =>
                    setEventLog((prev) => [
                      ...prev,
                      "You chose to fight the arrogant young master!",
                    ])
                  }
                >
                  🗡️ Fight - "I bow to no one!"
                </button>
                <button
                  className="w-full p-3 rounded-lg bg-blue-900/50 border border-blue-700/50 hover:border-blue-500/50 text-blue-300 text-sm transition-colors"
                  onClick={() =>
                    setEventLog((prev) => [
                      ...prev,
                      "You apologized to avoid conflict.",
                    ])
                  }
                >
                  🙏 Apologize - "Forgive this humble one's offense."
                </button>
                <button
                  className="w-full p-3 rounded-lg bg-yellow-900/50 border border-yellow-700/50 hover:border-yellow-500/50 text-yellow-300 text-sm transition-colors"
                  onClick={() =>
                    setEventLog((prev) => [
                      ...prev,
                      "You quickly fled from the dangerous situation.",
                    ])
                  }
                >
                  🏃 Flee - "I have urgent business elsewhere!"
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (exploreView === "combat") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setExploreView("main")}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {currentExploreLocation}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Sword className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Combat
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Player */}
            <Card className="bg-black border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-400">You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">HP</span>
                    <span className="text-green-400">85/100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-slate-400">STR</div>
                    <div className="text-red-400 font-bold">15</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">DEX</div>
                    <div className="text-blue-400 font-bold">12</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">SPD</div>
                    <div className="text-yellow-400 font-bold">10</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enemy */}
            <Card className="bg-black border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-400">
                  Shadow Wolf
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">HP</span>
                    <span className="text-red-400">60/80</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-slate-400">STR</div>
                    <div className="text-red-400 font-bold">12</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">DEX</div>
                    <div className="text-blue-400 font-bold">18</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">SPD</div>
                    <div className="text-yellow-400 font-bold">16</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Combat Actions */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-200">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 rounded-lg bg-red-900/50 border border-red-700/50 hover:border-red-500/50 text-red-300 text-sm transition-colors">
                  ⚔️ Attack
                </button>
                <button className="p-3 rounded-lg bg-blue-900/50 border border-blue-700/50 hover:border-blue-500/50 text-blue-300 text-sm transition-colors">
                  🛡️ Defend
                </button>
                <button className="p-3 rounded-lg bg-purple-900/50 border border-purple-700/50 hover:border-purple-500/50 text-purple-300 text-sm transition-colors">
                  ✨ Use Skill
                </button>
                <button className="p-3 rounded-lg bg-yellow-900/50 border border-yellow-700/50 hover:border-yellow-500/50 text-yellow-300 text-sm transition-colors">
                  🏃 Flee
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Main explore view
    const locationData = {
      "Whispering Forest": {
        description:
          "A mysterious forest filled with ancient trees and hidden dangers.",
        activities: [
          {
            name: "Gather Herbs",
            time: "2h",
            reward: "5 Spirit Herbs",
            icon: Leaf,
          },
          {
            name: "Hunt Beasts",
            time: "4h",
            reward: "2 Beast Cores",
            icon: Sword,
          },
          {
            name: "Explore Ruins",
            time: "6h",
            reward: "Ancient Scroll",
            icon: ScrollText,
          },
        ],
        locations: [
          {
            name: "Merchant's Stall",
            action: () => setExploreView("shop"),
            icon: ShoppingBag,
          },
          {
            name: "Encounter Stranger",
            action: () => setExploreView("conversation"),
            icon: Users,
          },
          {
            name: "Fight Monster",
            action: () => setExploreView("combat"),
            icon: Sword,
          },
        ],
      },
      "Jade City": {
        description:
          "A bustling cultivation city with towering pagodas and busy markets.",
        activities: [
          {
            name: "Visit Market",
            time: "1h",
            reward: "Trade Opportunities",
            icon: ShoppingBag,
          },
          {
            name: "Sect Recruitment",
            time: "3h",
            reward: "Sect Token",
            icon: Users,
          },
          {
            name: "Alchemy Hall",
            time: "2h",
            reward: "Pill Recipe",
            icon: Leaf,
          },
        ],
        locations: [
          {
            name: "Grand Market",
            action: () => setExploreView("shop"),
            icon: ShoppingBag,
          },
          {
            name: "Meet Young Master",
            action: () => setExploreView("conversation"),
            icon: Users,
          },
          {
            name: "Arena Challenge",
            action: () => setExploreView("combat"),
            icon: Sword,
          },
        ],
      },
    };

    const currentLocationData =
      locationData[currentExploreLocation] || locationData["Whispering Forest"];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Explore - {currentExploreLocation}
          </h2>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {currentLocationData.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Available Activities */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
                <Activity className="w-5 h-5 text-purple-400" />
                Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentLocationData.activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition-colors cursor-pointer"
                  onClick={() =>
                    setEventLog((prev) => [
                      ...prev,
                      `You completed ${activity.name} and gained ${activity.reward}.`,
                    ])
                  }
                >
                  <div className="flex items-center gap-3">
                    <activity.icon className="w-4 h-4 text-purple-400" />
                    <div>
                      <span className="text-sm font-semibold text-slate-200">
                        {activity.name}
                      </span>
                      <div className="text-xs text-slate-400">
                        {activity.time} • {activity.reward}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Locations */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
                <MapPin className="w-5 h-5 text-purple-400" />
                Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentLocationData.locations.map((location, index) => (
                <button
                  key={index}
                  onClick={location.action}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition-colors text-left"
                >
                  <location.icon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-slate-200">
                    {location.name}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Event Log */}
        <Card className="bg-black border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
              <ScrollText className="w-5 h-5 text-purple-400" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-40 overflow-y-auto">
            {eventLog.slice(-8).map((event, index) => (
              <p
                key={index}
                className="text-sm text-slate-400 leading-relaxed border-l-2 border-purple-500/30 pl-3"
              >
                {event}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

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

          <Card className="bg-black border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200">
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {inventoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                      item.equipped
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-slate-600 hover:border-purple-500/50 bg-slate-900/30"
                    }`}
                    onClick={() => !item.equipped && equipItem(item)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-bold ${
                          item.rarity === "legendary"
                            ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                            : item.rarity === "epic"
                            ? "border-purple-400 bg-purple-400/10 text-purple-400"
                            : item.rarity === "rare"
                            ? "border-blue-400 bg-blue-400/10 text-blue-400"
                            : "border-slate-400 bg-slate-400/10 text-slate-400"
                        }`}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-semibold ${getRarityColor(
                            item.rarity
                          )}`}
                        >
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 capitalize">
                          {item.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {item.equipped ? "Equipped" : "Click to equip"}
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

        <div className="space-y-6">
          {/* Active Quests */}
          <Card className="bg-black border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                Active Quests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-purple-300">
                        {quest.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {quest.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="text-xs text-slate-500">
                          Progress: {quest.progress}%
                        </div>
                        <div className="text-xs text-yellow-400">
                          Reward: {quest.reward}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {quest.timeLeft}
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-purple-500 h-1.5 rounded-full"
                      style={{ width: `${quest.progress}%` }}
                    ></div>
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
            <CardContent className="space-y-2">
              {completedQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="p-2 rounded-lg bg-slate-900/30 border border-slate-700/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-green-300 text-sm">
                        {quest.title}
                      </h3>
                      <div className="text-xs text-slate-500">
                        Completed: {quest.completedDate}
                      </div>
                    </div>
                    <div className="text-xs text-green-400">{quest.reward}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function renderLifestylePage() {
    const lifestyleOptions = [
      {
        category: "Housing",
        options: [
          {
            name: "Shabby Hut",
            cost: 0,
            current: false,
            description: "Basic shelter, no comfort bonus",
          },
          {
            name: "Small Cottage",
            cost: 500,
            current: true,
            description: "Modest living, +10% XP bonus",
          },
          {
            name: "Comfortable House",
            cost: 2000,
            current: false,
            description: "Good living, +25% XP bonus",
          },
          {
            name: "Luxurious Manor",
            cost: 10000,
            current: false,
            description: "Excellent living, +50% XP bonus",
          },
        ],
      },
      {
        category: "Meals",
        options: [
          {
            name: "Bread & Water",
            cost: 5,
            current: false,
            description: "Survival rations, no bonus",
          },
          {
            name: "Simple Meals",
            cost: 15,
            current: true,
            description: "Basic nutrition, +5% XP bonus",
          },
          {
            name: "Quality Cuisine",
            cost: 50,
            current: false,
            description: "Good food, +15% XP bonus",
          },
          {
            name: "Gourmet Delicacies",
            cost: 200,
            current: false,
            description: "Finest meals, +30% XP bonus",
          },
        ],
      },
      {
        category: "Transportation",
        options: [
          {
            name: "Walking",
            cost: 0,
            current: true,
            description: "Free but slow travel",
          },
          {
            name: "Horse",
            cost: 300,
            current: false,
            description: "Faster travel, -25% travel time",
          },
          {
            name: "Carriage",
            cost: 1500,
            current: false,
            description: "Comfortable travel, -50% travel time",
          },
          {
            name: "Flying Sword",
            cost: 5000,
            current: false,
            description: "Instant travel between known locations",
          },
        ],
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Home className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Lifestyle Management
          </h2>
        </div>

        <div className="grid gap-6">
          {lifestyleOptions.map((category) => (
            <Card
              key={category.category}
              className="bg-black border-slate-700/50"
            >
              <CardHeader>
                <CardTitle className="text-lg text-slate-200">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      option.current
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-slate-600 hover:border-purple-500/50 bg-slate-900/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-purple-300">
                          {option.name}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                          {option.description}
                        </p>
                      </div>
                      <div className="text-right">
                        {option.current ? (
                          <span className="text-green-400 font-semibold">
                            Current
                          </span>
                        ) : (
                          <span className="text-yellow-400 font-semibold">
                            {option.cost}g
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
