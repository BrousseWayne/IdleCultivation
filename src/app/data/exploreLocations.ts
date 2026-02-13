import {
  Heart,
  Leaf,
  ScrollText,
  ShoppingBag,
  Sword,
  Users,
} from "lucide-react";
import type { LocationEntry, ShopItem } from "../types/domain";

export const locationData: Record<string, LocationEntry> = {
  "Whispering Forest": {
    description:
      "A mysterious forest filled with ancient trees and hidden dangers.",
    activities: [
      { name: "Gather Herbs", time: "2h", effects: [{ type: "log", message: "You gathered 5 Spirit Herbs." }], icon: Leaf },
      { name: "Hunt Beasts", time: "4h", effects: [{ type: "log", message: "You hunted beasts and obtained 2 Beast Cores." }], icon: Sword },
      { name: "Explore Ruins", time: "6h", effects: [{ type: "log", message: "You discovered an Ancient Scroll in the ruins!" }], icon: ScrollText },
    ],
    locations: [
      { name: "Merchant's Stall", icon: ShoppingBag, view: "shop" },
      { name: "Encounter Stranger", icon: Users, view: "conversation" },
      { name: "Fight Monster", icon: Sword, view: "combat" },
    ],
  },
  "Jade City": {
    description:
      "A bustling cultivation city with towering pagodas and busy markets.",
    activities: [
      { name: "Visit Market", time: "1h", effects: [{ type: "log", message: "You explored the market and found trade opportunities." }], icon: ShoppingBag },
      { name: "Sect Recruitment", time: "3h", effects: [{ type: "log", message: "You received a Sect Token from recruiters." }], icon: Users },
      { name: "Alchemy Hall", time: "2h", effects: [{ type: "log", message: "You learned a Pill Recipe from the alchemist." }], icon: Leaf },
    ],
    locations: [
      { name: "Grand Market", icon: ShoppingBag, view: "shop" },
      { name: "Meet Young Master", icon: Users, view: "conversation" },
      { name: "Arena Challenge", icon: Sword, view: "combat" },
    ],
  },
};

export const shopItems: ShopItem[] = [
  { name: "Iron Sword", price: "50 Gold", stats: "+10 Attack", icon: Sword },
  { name: "Health Potion", price: "20 Gold", stats: "Restores 100 HP", icon: Heart },
  { name: "Spirit Herb", price: "15 Gold", stats: "+5 Qi Recovery", icon: Leaf },
  { name: "Cultivation Manual", price: "200 Gold", stats: "+50 XP", icon: ScrollText },
];
