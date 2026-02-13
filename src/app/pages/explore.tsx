import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  ArrowLeft,
  Compass,
  MapPin,
  ScrollText,
  ShoppingBag,
  Sword,
  Users,
} from "lucide-react";
import { useGameStore } from "../stores/gameStore";
import { locationData, shopItems } from "../data/exploreLocations";

export function RenderExplorePage() {
  const exploreView = useGameStore((s) => s.exploreView);
  const setExploreView = useGameStore((s) => s.setExploreView);
  const eventLog = useGameStore((s) => s.eventLog);
  const addEventLog = useGameStore((s) => s.addEventLog);
  const currentExploreLocation = useGameStore((s) => s.currentExploreLocation);
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
          <ShoppingBag className="w-6 h-6 text-accent-gold" />
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-gold">
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
              {shopItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-accent-cinnabar/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-accent-cinnabar" />
                    <div>
                      <div className="font-semibold text-slate-200">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-400">{item.stats}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-accent-gold">
                      {item.price}
                    </div>
                    <button
                      className="text-xs text-accent-cinnabar hover:text-accent-cinnabar/80"
                      onClick={() => addEventLog(`You purchased ${item.name} for ${item.price}.`)}
                    >
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
                  <button className="px-3 py-1 rounded-lg bg-accent-cinnabar/80 hover:bg-accent-cinnabar text-white text-sm transition-colors">
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
          <Users className="w-6 h-6 text-accent-cinnabar" />
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-cinnabar">
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
                  addEventLog("You chose to fight the arrogant young master!")
                }
              >
                Fight - "I bow to no one!"
              </button>
              <button
                className="w-full p-3 rounded-lg bg-blue-900/50 border border-blue-700/50 hover:border-blue-500/50 text-blue-300 text-sm transition-colors"
                onClick={() =>
                  addEventLog("You apologized to avoid conflict.")
                }
              >
                Apologize - "Forgive this humble one's offense."
              </button>
              <button
                className="w-full p-3 rounded-lg bg-yellow-900/50 border border-yellow-700/50 hover:border-yellow-500/50 text-yellow-300 text-sm transition-colors"
                onClick={() =>
                  addEventLog("You quickly fled from the dangerous situation.")
                }
              >
                Flee - "I have urgent business elsewhere!"
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
          <Sword className="w-6 h-6 text-accent-cinnabar" />
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] bg-gradient-to-r from-accent-cinnabar to-orange-400 bg-clip-text text-transparent">
            Combat
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

          <Card className="bg-black border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-accent-cinnabar">
                Shadow Wolf
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">HP</span>
                  <span className="text-accent-cinnabar">60/80</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-accent-cinnabar h-2 rounded-full"
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

        <Card className="bg-black border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-slate-200">Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-3 rounded-lg bg-red-900/50 border border-red-700/50 hover:border-red-500/50 text-red-300 text-sm transition-colors">
                Attack
              </button>
              <button className="p-3 rounded-lg bg-blue-900/50 border border-blue-700/50 hover:border-blue-500/50 text-blue-300 text-sm transition-colors">
                Defend
              </button>
              <button className="p-3 rounded-lg bg-accent-violet/20 border border-accent-violet/30 hover:border-accent-violet/50 text-accent-violet text-sm transition-colors">
                Use Skill
              </button>
              <button className="p-3 rounded-lg bg-yellow-900/50 border border-yellow-700/50 hover:border-yellow-500/50 text-yellow-300 text-sm transition-colors">
                Flee
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentLocationData =
    locationData[currentExploreLocation] || locationData["Whispering Forest"];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Compass className="w-6 h-6 text-accent-cinnabar" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-cinnabar">
          Explore - {currentExploreLocation}
        </h2>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-4">
        {currentLocationData.description}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-black border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
              <Activity className="w-5 h-5 text-accent-cinnabar" />
              Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentLocationData.activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-accent-cinnabar/30 transition-colors cursor-pointer"
                onClick={() => {
                  for (const effect of activity.effects) {
                    if (effect.type === "log") addEventLog(effect.message);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <activity.icon className="w-4 h-4 text-accent-cinnabar" />
                  <div>
                    <span className="text-sm font-semibold text-slate-200">
                      {activity.name}
                    </span>
                    <div className="text-xs text-slate-400">
                      {activity.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-black border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
              <MapPin className="w-5 h-5 text-accent-cinnabar" />
              Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentLocationData.locations.map((location, index) => (
              <button
                key={index}
                onClick={() => setExploreView(location.view)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-accent-cinnabar/30 transition-colors text-left"
              >
                <location.icon className="w-4 h-4 text-accent-cinnabar" />
                <span className="text-sm font-semibold text-slate-200">
                  {location.name}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black border-slate-700/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-200">
            <ScrollText className="w-5 h-5 text-accent-cinnabar" />
            Recent Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-40 overflow-y-auto">
          {eventLog.slice(-8).map((event, index) => (
            <p
              key={index}
              className="text-sm text-slate-400 leading-relaxed border-l-2 border-accent-cinnabar/30 pl-3"
            >
              {event}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
