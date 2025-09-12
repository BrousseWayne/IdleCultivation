import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { useGameState } from "../contexts/gameStateContext";

export function RenderInventoryPage() {
  const { setEquippedItems, setInventoryItems, equippedItems, inventoryItems } =
    useGameState();
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
            <CardTitle className="text-lg text-slate-200">Equipment</CardTitle>
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
            <CardTitle className="text-lg text-slate-200">Inventory</CardTitle>
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
