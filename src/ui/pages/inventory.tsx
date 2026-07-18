import { Lock } from "lucide-react";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import type { InventoryItem } from "@/game/types/domain";
import { useState } from "react";
import { text, type ContentKey } from "@/game/content/text";
import { PALETTE } from "@/game/data/sectionColors";
import { CurrencyIcon, Glyph } from "@/ui/components/StatIcon";
import { PageHeader } from "@/ui/components/PageHeader";
import { formatNumber } from "@/game/utils/formatNumber";

type StorageLocation = "personal" | "bank" | "barn";

const CATEGORY_ORDER = ["currency", "herbs", "minerals", "consumable", "artifact", "book", "material"];

const CATEGORY_LABEL_KEYS: Record<string, ContentKey> = {
  currency: "inventory.category.currency",
  herbs: "inventory.category.herbs",
  minerals: "inventory.category.minerals",
  consumable: "inventory.category.consumable",
  artifact: "inventory.category.artifact",
  book: "inventory.category.book",
  material: "inventory.category.material",
};

function categoryLabel(category: string): string {
  const key = CATEGORY_LABEL_KEYS[category];
  return key ? text(key) : category;
}

// Rarity identity draws from the shared palette (free axes + neutral);
// gold stays reserved for the top tier where "caution" reads as "treasure".
const RARITY_COLORS: Record<string, string> = {
  common: "#98A29A",
  rare: PALETTE.sky,
  epic: PALETTE.violet,
  legendary: PALETTE.gold,
};

export function RenderInventoryPage() {
  const currency = useInventoryStore((state) => state.currency);
  const inventoryItems = useInventoryStore((state) => state.inventoryItems);
  const [activeLocation, setActiveLocation] = useState<StorageLocation>("personal");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<InventoryItem | null>(null);

  const bankUnlocked = false;
  const barnUnlocked = false;

  const groupedItems = inventoryItems.reduce((acc, item) => {
    const category = item.type || "material";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  const sortedCategories = CATEGORY_ORDER.filter((category) => groupedItems[category]);
  const displayCategory = selectedCategory || sortedCategories[0] || "material";
  const itemsToDisplay = groupedItems[displayCategory] || [];

  const PERSONAL_CAPACITY = 12;

  return (
    <div className="max-w-4xl space-y-4">
      <PageHeader
        glyph="囊"
        title={text("page.inventory.title")}
        color="text-accent-gold"
        subtitle={text("page.inventory.subtitle")}
      />

      {/* storage location tabs */}
      <div className="flex gap-2">
        {[
          { id: "personal", label: text("inventory.location.personal"), glyph: "身", unlocked: true },
          { id: "bank", label: text("inventory.location.bank"), glyph: "庫", unlocked: bankUnlocked },
          { id: "barn", label: text("inventory.location.barn"), glyph: "倉", unlocked: barnUnlocked },
        ].map((location) => {
          const isActive = activeLocation === location.id;
          return (
            <button
              key={location.id}
              onClick={() => location.unlocked && setActiveLocation(location.id as StorageLocation)}
              disabled={!location.unlocked}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-colors ${
                isActive
                  ? "bg-accent-gold/15 border-accent-gold/40 text-accent-gold font-semibold"
                  : location.unlocked
                    ? "border-line text-ink-2 hover:text-ink hover:bg-panel-2"
                    : "border-line text-ink-3 opacity-60 cursor-not-allowed"
              }`}
            >
              {location.unlocked ? <Glyph char={location.glyph} size={16} /> : <Lock className="w-4 h-4" />}
              {location.label}
            </button>
          );
        })}
      </div>

      <div className="bg-panel border border-line rounded-lg p-4 space-y-4">
        {/* currency */}
        <div className="flex items-center gap-3 pb-4 border-b border-line">
          <CurrencyIcon className="text-accent-silver" size={24} />
          <div>
            <div className="text-[11px] text-ink-2 uppercase tracking-widest">{text("inventory.label.currency")}</div>
            <div className="text-xl font-bold font-mono text-accent-silver">{formatNumber(currency)}</div>
          </div>
        </div>

        {/* category selection */}
        <div className="space-y-2">
          <div className="text-[11px] text-ink-2 uppercase tracking-widest">{text("inventory.label.categories")}</div>
          <div className="flex flex-wrap gap-1.5">
            {sortedCategories.map((category) => {
              const isActive = displayCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ${
                    isActive
                      ? "bg-accent-jade/15 border-accent-jade/40 text-accent-jade font-semibold"
                      : "border-line text-ink-2 hover:text-ink hover:bg-panel-2"
                  }`}
                >
                  {categoryLabel(category)}
                  <span className="text-[11px] font-mono opacity-70">{groupedItems[category]?.length || 0}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* items */}
        <div className="relative space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-ink">{categoryLabel(displayCategory)}</div>
            {activeLocation === "personal" && (
              <div className="text-xs text-ink-2 font-mono">
                {inventoryItems.length} / {PERSONAL_CAPACITY} {text("inventory.label.carried")}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {itemsToDisplay.map((item) => {
              const rarityHex = RARITY_COLORS[item.rarity] || RARITY_COLORS.common;
              return (
                <div
                  key={item.id}
                  className="relative rounded-md p-2.5 bg-panel-2 border transition-transform hover:-translate-y-0.5 cursor-pointer"
                  style={{ borderColor: `${rarityHex}66` }}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div
                    className="aspect-square mb-1.5 rounded-sm flex items-center justify-center"
                    style={{ background: `radial-gradient(circle, ${rarityHex}22, transparent)` }}
                  >
                    <div
                      className="text-2xl font-bold font-[family-name:var(--font-display)]"
                      style={{ color: rarityHex }}
                    >
                      {item.name.charAt(0)}
                    </div>
                  </div>
                  <div className="h-8 flex items-center justify-center text-center text-xs text-ink leading-tight">
                    {item.name}
                  </div>
                  {item.rarity !== "common" && (
                    <div
                      className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: rarityHex }}
                    />
                  )}
                </div>
              );
            })}

            {activeLocation === "personal" &&
              Array.from({
                length: Math.max(0, PERSONAL_CAPACITY - inventoryItems.length)
              }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="aspect-square rounded-md border-2 border-dashed border-line-2"
                />
              ))
            }
          </div>

          {hoveredItem && (
            <div className="absolute z-20 pointer-events-none bottom-full left-1/2 -translate-x-1/2 mb-3">
              <div
                className="px-4 py-3 min-w-[200px] rounded-md bg-background border"
                style={{ borderColor: RARITY_COLORS[hoveredItem.rarity] || RARITY_COLORS.common }}
              >
                <div
                  className="font-bold text-sm mb-1 font-[family-name:var(--font-display)]"
                  style={{ color: RARITY_COLORS[hoveredItem.rarity] || RARITY_COLORS.common }}
                >
                  {hoveredItem.name}
                </div>
                <div className="text-xs text-ink-2 capitalize mb-0.5">{hoveredItem.type}</div>
                <div
                  className="text-xs capitalize font-semibold"
                  style={{ color: RARITY_COLORS[hoveredItem.rarity] || RARITY_COLORS.common }}
                >
                  {hoveredItem.rarity}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
