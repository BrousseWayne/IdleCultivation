import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  ArrowLeft,
  Compass,
  Heart,
  Leaf,
  MapPin,
  ScrollText,
  ShoppingBag,
  Sword,
  Users,
} from "lucide-react";
import { useGameState } from "./dataForPage9";

export function RenderExplorePage() {
  const {
    exploreView,
    setExploreView,
    eventLog,
    setEventLog,
    currentExploreLocation,
  } = useGameState();
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
                      <div className="text-xs text-slate-400">{item.stats}</div>
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
              <CardTitle className="text-lg text-slate-200">Merchant</CardTitle>
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
              "How dare a mere mortal like you walk the same path as this young
              master! Do you not know who I am? Kneel and apologize, or face the
              consequences!"
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
