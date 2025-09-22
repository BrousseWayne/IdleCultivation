import type { Currency } from "@/app/data/data copy";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Coins } from "lucide-react";
import type { JSX } from "react";

interface ResourcesCardProps {
  collapsed: boolean;
  onToggle: () => void;
  money: number;
}

const currencyColors: Record<Currency, string> = {
  Bronze: "text-orange-400",
  Silver: "text-slate-300",
  Gold: "text-yellow-400",
  Platinum: "text-cyan-400",
};

const renderMoney = (amount: number) => {
  const currencyArray: Currency[] = ["Bronze", "Silver", "Gold", "Platinum"];
  const parts: JSX.Element[] = [];
  let remainingAmount = Math.floor(amount);

  for (let i = 0; i < currencyArray.length && remainingAmount > 0; i++) {
    const value = remainingAmount % 100;
    if (value > 0) {
      parts.unshift(
        <span
          key={currencyArray[i]}
          className={currencyColors[currencyArray[i]]}
        >
          {value}
          {currencyArray[i][0]}
        </span>
      );
    }
    remainingAmount = Math.floor(remainingAmount / 100);
  }

  if (parts.length === 0) {
    return (
      <span className={currencyColors[currencyArray[0]]}>
        0{currencyArray[0][0]}
      </span>
    );
  }

  // Insert spaces between denominations
  return parts.reduce(
    (prev, curr, idx) => (idx === 0 ? [curr] : [...prev, " ", curr]),
    [] as JSX.Element[]
  );
};

export function ResourcesCard({
  collapsed,
  onToggle,
  money,
}: ResourcesCardProps) {
  return (
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
            onClick={onToggle}
            className="w-6 h-6 p-0"
          >
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CardTitle>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Money:</span>
            <span className="font-bold flex gap-1">{renderMoney(money)}</span>
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
  );
}
