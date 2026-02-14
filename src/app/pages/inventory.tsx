import { Package } from "lucide-react";
import { useInventoryStore } from "../stores/inventoryStore";
import type { EquippedItems } from "../types/states";
import type { InventoryItem } from "../types/domain";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

const RARITY_STYLES: Record<string, { border: string; bg: string; text: string }> = {
  common: { border: "border-slate-500", bg: "bg-slate-500/10", text: "text-slate-400" },
  rare: { border: "border-blue-400", bg: "bg-blue-400/10", text: "text-blue-400" },
  epic: { border: "border-accent-violet", bg: "bg-accent-violet/10", text: "text-accent-violet" },
  legendary: { border: "border-accent-gold", bg: "bg-accent-gold/10", text: "text-accent-gold" },
};

function getRarityStyle(rarity: string) {
  return RARITY_STYLES[rarity] || RARITY_STYLES.common;
}

export function RenderInventoryPage() {
  const inventoryItems = useInventoryStore((s) => s.inventoryItems);
  const equippedItems = useInventoryStore((s) => s.equippedItems);
  const equipItem = useInventoryStore((s) => s.equipItem);
  const unequipItem = useInventoryStore((s) => s.unequipItem);
  const [hoveredItem, setHoveredItem] = useState<InventoryItem | null>(null);

  const isEquipped = (itemId: number): keyof EquippedItems | null => {
    for (const [slot, slotItem] of Object.entries(equippedItems)) {
      if (slotItem?.id === itemId) return slot as keyof EquippedItems;
    }
    return null;
  };

  const handleEquip = (item: InventoryItem) => {
    if (item.type in equippedItems) {
      equipItem(item.id, item.type as keyof EquippedItems);
    }
  };

  const handleUnequip = (slot: keyof EquippedItems) => {
    unequipItem(slot);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        icon={Package}
        title="Inventory & Equipment"
        color="text-accent-gold"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h3 className="text-sm font-semibold text-slate-300 mb-2">Equipment</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(equippedItems).map(([slot, item]) => {
              const style = item ? getRarityStyle(item.rarity) : null;
              return (
                <div
                  key={slot}
                  className={`h-16 border rounded-md flex flex-col items-center justify-center p-1.5 transition-colors cursor-pointer ${
                    style
                      ? `${style.border} ${style.bg} hover:brightness-125`
                      : "border-dashed border-slate-600 hover:border-accent-gold/50"
                  }`}
                  onClick={() => item && handleUnequip(slot as keyof EquippedItems)}
                >
                  <div className="text-[10px] text-slate-500 capitalize">{slot}</div>
                  {item ? (
                    <div className={`text-xs font-semibold truncate max-w-full ${style!.text}`}>
                      {item.name}
                    </div>
                  ) : (
                    <div className="text-slate-600 text-[10px]">Empty</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-300 mb-2">Items</h3>
          <div className="relative">
            <div className="grid grid-cols-5 gap-1.5">
              {inventoryItems.map((item) => {
                const style = getRarityStyle(item.rarity);
                const equipped = isEquipped(item.id);
                return (
                  <div
                    key={item.id}
                    className={`relative h-12 w-full rounded border flex items-center justify-center cursor-pointer transition-colors ${
                      equipped
                        ? `${style.border} ${style.bg} ring-1 ring-accent-gold/50`
                        : `${style.border}/50 ${style.bg} hover:${style.border}`
                    }`}
                    onClick={() => !equipped && handleEquip(item)}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className={`text-sm font-bold ${style.text}`}>
                      {item.name.charAt(0)}
                    </span>
                    {equipped && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-gold" />
                    )}
                  </div>
                );
              })}
            </div>

            {hoveredItem && (
              <div className="absolute z-10 bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border rounded-md px-3 py-2 text-xs whitespace-nowrap pointer-events-none">
                <div className={`font-semibold ${getRarityStyle(hoveredItem.rarity).text}`}>
                  {hoveredItem.name}
                </div>
                <div className="text-slate-400 capitalize">{hoveredItem.type}</div>
                <div className="text-slate-500 capitalize">{hoveredItem.rarity}</div>
                {isEquipped(hoveredItem.id) && (
                  <div className="text-accent-gold mt-0.5">Equipped</div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
