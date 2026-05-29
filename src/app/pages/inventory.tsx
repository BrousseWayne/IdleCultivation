import { Coins, Warehouse, Home, Lock } from "lucide-react";
import { useInventoryStore } from "../stores/inventoryStore";
import type { InventoryItem } from "../types/domain";
import { useState } from "react";

type StorageLocation = "personal" | "bank" | "barn";

const CATEGORY_ORDER = ["currency", "herbs", "minerals", "consumable", "artifact", "book", "material"];

const CATEGORY_LABELS: Record<string, string> = {
  currency: "Currency & Valuables",
  herbs: "Medicinal Herbs",
  minerals: "Ores & Minerals",
  consumable: "Consumables",
  artifact: "Artifacts & Tools",
  book: "Books & Scrolls",
  material: "Raw Materials",
};

const RARITY_COLORS: Record<string, string> = {
  common: "#8B7355",
  rare: "#4A90A4",
  epic: "#7B68A6",
  legendary: "#D4AF37",
};

export function RenderInventoryPage() {
  const spiritStones = useInventoryStore((s) => s.spiritStones);
  const inventoryItems = useInventoryStore((s) => s.inventoryItems);
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

  const sortedCategories = CATEGORY_ORDER.filter(cat => groupedItems[cat]);
  const displayCategory = selectedCategory || sortedCategories[0] || "material";
  const itemsToDisplay = groupedItems[displayCategory] || [];

  const PERSONAL_CAPACITY = 12;

  return (
    <div
      className="min-h-screen p-6"
      style={{
        fontFamily: "'Crimson Pro', serif",
        background: `
          linear-gradient(135deg, #F5EFE0 0%, #EDE4D3 100%)
        `,
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Crimson+Pro:wght@400;600&family=Ma+Shan+Zheng&display=swap');

          @keyframes unfurl {
            from {
              opacity: 0;
              transform: translateY(-20px) rotateX(10deg);
            }
            to {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }

          @keyframes inkBleed {
            from {
              opacity: 0;
              filter: blur(3px);
            }
            to {
              opacity: 1;
              filter: blur(0);
            }
          }

          @keyframes sealStamp {
            0% {
              opacity: 0;
              transform: scale(0) rotate(-15deg);
            }
            50% {
              opacity: 1;
              transform: scale(1.1) rotate(2deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          .scroll-container {
            animation: unfurl 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .ink-bleed {
            animation: inkBleed 0.6s ease-out forwards;
          }

          .seal-stamp {
            animation: sealStamp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          }

          .item-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .item-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(139, 69, 19, 0.25);
          }

          .paper-texture {
            background-image:
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(139, 115, 85, 0.03) 2px,
                rgba(139, 115, 85, 0.03) 4px
              );
          }

          .brush-border {
            position: relative;
          }

          .brush-border::before {
            content: '';
            position: absolute;
            inset: -2px;
            border: 2px solid #8B4513;
            opacity: 0.6;
            border-radius: 4px;
            mask-image: repeating-linear-gradient(
              90deg,
              transparent,
              transparent 5px,
              black 5px,
              black 8px
            );
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto scroll-container">
        {/* Header */}
        <div className="mb-8 text-center relative">
          <h1
            className="text-5xl mb-2 ink-bleed"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#8B4513",
              textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
              letterSpacing: "0.05em"
            }}
          >
            Possessions
          </h1>
          <p
            className="text-lg ink-bleed"
            style={{
              color: "#A0826D",
              animationDelay: "0.2s",
              fontFamily: "'Ma Shan Zheng', cursive"
            }}
          >
            What Fortune Has Bestowed
          </p>
        </div>

        {/* Storage Location Tabs */}
        <div className="flex gap-3 mb-6 justify-center">
          {[
            { id: "personal", label: "Personal", icon: Home, unlocked: true },
            { id: "bank", label: "Bank Vault", icon: Warehouse, unlocked: bankUnlocked },
            { id: "barn", label: "Barn Storage", icon: Warehouse, unlocked: barnUnlocked },
          ].map((location, idx) => (
            <button
              key={location.id}
              onClick={() => location.unlocked && setActiveLocation(location.id as StorageLocation)}
              disabled={!location.unlocked}
              className="relative px-6 py-3 transition-all ink-bleed"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                background: activeLocation === location.id
                  ? "linear-gradient(135deg, #C84B31 0%, #A03A24 100%)"
                  : location.unlocked
                    ? "#EDE4D3"
                    : "#D9CFC1",
                color: activeLocation === location.id
                  ? "#F5EFE0"
                  : location.unlocked
                    ? "#8B4513"
                    : "#A0826D",
                border: `2px solid ${activeLocation === location.id ? "#8B4513" : "#C9B8A1"}`,
                borderRadius: "2px",
                boxShadow: activeLocation === location.id
                  ? "0 4px 12px rgba(200, 75, 49, 0.4)"
                  : "none",
                cursor: location.unlocked ? "pointer" : "not-allowed",
                opacity: location.unlocked ? 1 : 0.5,
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-2">
                {location.unlocked ? (
                  <location.icon size={16} />
                ) : (
                  <Lock size={16} />
                )}
                {location.label}
              </div>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div
          className="p-8 paper-texture"
          style={{
            background: "linear-gradient(to bottom, #FDFBF7 0%, #F5EFE0 100%)",
            border: "3px solid #8B4513",
            borderRadius: "4px",
            boxShadow: `
              0 10px 40px rgba(139, 69, 19, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.6)
            `,
          }}
        >
          {/* Currency Display */}
          <div className="mb-8 pb-6 border-b-2" style={{ borderColor: "#C9B8A1" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Coins size={32} style={{ color: "#D4AF37" }} />
                <div>
                  <div
                    className="text-sm uppercase tracking-wider mb-1"
                    style={{
                      color: "#A0826D",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.7rem"
                    }}
                  >
                    Spirit Stones
                  </div>
                  <div
                    className="text-3xl font-bold"
                    style={{
                      color: "#8B4513",
                      fontFamily: "'Cinzel', serif"
                    }}
                  >
                    {spiritStones.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Physical representation */}
              <div className="flex gap-2">
                {Array.from({ length: Math.min(Math.floor(spiritStones / 100), 5) }).map((_, i) => (
                  <div
                    key={i}
                    className="seal-stamp"
                    style={{
                      width: "40px",
                      height: "28px",
                      background: "linear-gradient(135deg, #F4E4C1 0%, #D4AF37 100%)",
                      border: "2px solid #B8941F",
                      borderRadius: "2px",
                      boxShadow: "0 2px 8px rgba(212, 175, 55, 0.4)",
                      animationDelay: `${i * 0.1}s`,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: "4px",
                        background: "repeating-linear-gradient(90deg, #D4AF37 0px, #D4AF37 2px, transparent 2px, transparent 4px)",
                        opacity: 0.3,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <div
              className="text-xs uppercase tracking-widest mb-3"
              style={{
                color: "#A0826D",
                fontFamily: "'Cinzel', serif"
              }}
            >
              Categories
            </div>
            <div className="flex flex-wrap gap-2">
              {sortedCategories.map((category, idx) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-4 py-2 transition-all ink-bleed"
                  style={{
                    background: displayCategory === category
                      ? "#2D5F5D"
                      : "transparent",
                    color: displayCategory === category
                      ? "#F5EFE0"
                      : "#8B4513",
                    border: `1.5px solid ${displayCategory === category ? "#2D5F5D" : "#C9B8A1"}`,
                    borderRadius: "2px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    animationDelay: `${idx * 0.05 + 0.3}s`,
                  }}
                >
                  {CATEGORY_LABELS[category] || category}
                  <span
                    className="ml-2 px-1.5 py-0.5 rounded text-[10px]"
                    style={{
                      background: displayCategory === category
                        ? "rgba(245, 239, 224, 0.2)"
                        : "rgba(139, 69, 19, 0.1)",
                    }}
                  >
                    {groupedItems[category]?.length || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div
                className="text-lg font-semibold"
                style={{
                  color: "#8B4513",
                  fontFamily: "'Cinzel', serif"
                }}
              >
                {CATEGORY_LABELS[displayCategory] || displayCategory}
              </div>
              {activeLocation === "personal" && (
                <div
                  className="text-sm"
                  style={{ color: "#A0826D" }}
                >
                  {inventoryItems.length} / {PERSONAL_CAPACITY} carried
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {itemsToDisplay.map((item, idx) => (
                <div
                  key={item.id}
                  className="item-card cursor-pointer ink-bleed"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    background: "linear-gradient(to bottom, #FDFBF7, #F9F5ED)",
                    border: `2px solid ${RARITY_COLORS[item.rarity] || "#8B7355"}`,
                    borderRadius: "3px",
                    padding: "12px",
                    boxShadow: "0 2px 8px rgba(139, 69, 19, 0.15)",
                    animationDelay: `${idx * 0.05 + 0.4}s`,
                  }}
                >
                  <div className="aspect-square mb-2 rounded-sm flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle, ${RARITY_COLORS[item.rarity]}22, transparent)`,
                    }}
                  >
                    <div
                      className="text-3xl font-bold"
                      style={{
                        color: RARITY_COLORS[item.rarity] || "#8B7355",
                        fontFamily: "'Ma Shan Zheng', cursive",
                      }}
                    >
                      {item.name.charAt(0)}
                    </div>
                  </div>
                  <div
                    className="text-center text-xs font-semibold leading-tight"
                    style={{
                      color: "#8B4513",
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.name}
                  </div>

                  {/* Seal stamp for rare+ items */}
                  {item.rarity !== "common" && (
                    <div
                      className="seal-stamp absolute top-2 right-2 w-5 h-5 rounded-full"
                      style={{
                        background: RARITY_COLORS[item.rarity],
                        border: "1.5px solid rgba(0,0,0,0.2)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        animationDelay: `${idx * 0.05 + 0.6}s`,
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Empty slots for personal inventory */}
              {activeLocation === "personal" &&
                Array.from({
                  length: Math.max(0, PERSONAL_CAPACITY - inventoryItems.length)
                }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="aspect-square ink-bleed"
                    style={{
                      background: "transparent",
                      border: "2px dashed #C9B8A1",
                      borderRadius: "3px",
                      animationDelay: `${(itemsToDisplay.length + i) * 0.05 + 0.4}s`,
                    }}
                  />
                ))
              }
            </div>

            {/* Hover Tooltip */}
            {hoveredItem && (
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  bottom: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginBottom: "12px",
                }}
              >
                <div
                  className="px-4 py-3 paper-texture"
                  style={{
                    background: "linear-gradient(to bottom, #FDFBF7, #F5EFE0)",
                    border: `2px solid ${RARITY_COLORS[hoveredItem.rarity] || "#8B7355"}`,
                    borderRadius: "3px",
                    boxShadow: "0 4px 16px rgba(139, 69, 19, 0.3)",
                    minWidth: "200px",
                  }}
                >
                  <div
                    className="font-bold mb-1"
                    style={{
                      color: RARITY_COLORS[hoveredItem.rarity] || "#8B7355",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.95rem"
                    }}
                  >
                    {hoveredItem.name}
                  </div>
                  <div
                    className="text-xs capitalize mb-1"
                    style={{ color: "#A0826D" }}
                  >
                    {hoveredItem.type}
                  </div>
                  <div
                    className="text-xs capitalize font-semibold"
                    style={{ color: RARITY_COLORS[hoveredItem.rarity] || "#8B7355" }}
                  >
                    {hoveredItem.rarity}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
