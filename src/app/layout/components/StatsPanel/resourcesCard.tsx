import type { Currency, Stats } from "@/app/types/domain";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Coins } from "lucide-react";
import { type JSX, useState, useEffect, useCallback } from "react";
import { formatNumber } from "@/app/utils/formatNumber";
import { useLerpNumber } from "@/app/utils/useLerpNumber";
import { EventBus } from "@/app/services";

interface ResourcesCardProps {
  collapsed: boolean;
  onToggle: () => void;
  money: number;
  income: number;
  expenses: number;
}

export const currencyColors: Partial<Record<Currency, string>> = {
  Bronze: "text-orange-400",
  Silver: "text-slate-300",
  Gold: "text-accent-gold",
  Platinum: "text-cyan-400",
};

export const statColors: Partial<Record<Stats, string>> = {
  Strength: "text-red-400",
  Dexterity: "text-blue-400",
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
          className={`font-mono ${currencyColors[currencyArray[i]] || "text-gray-400"}`}
        >
          {formatNumber(value)}
          {currencyArray[i][0]}
        </span>
      );
    }
    remainingAmount = Math.floor(remainingAmount / 100);
  }

  if (parts.length === 0) {
    return (
      <span className={`font-mono ${currencyColors[currencyArray[0]] || "text-gray-400"}`}>
        0{currencyArray[0][0]}
      </span>
    );
  }

  return parts;
};

const renderIncome = (amount: number) => {
  if (amount >= 0) {
    return <span className="text-accent-emerald font-mono">+{formatNumber(amount)}g</span>;
  }
  return <span className="text-accent-cinnabar font-mono">{formatNumber(amount)}g</span>;
};

export function ResourcesCard({
  collapsed,
  onToggle,
  money,
  income,
  expenses,
}: ResourcesCardProps) {
  const net = income - expenses;
  const lerpMoney = useLerpNumber(money);
  const [floats, setFloats] = useState<{ id: number; text: string }[]>([]);

  const handleReward = useCallback((event: any) => {
    const { reward } = event.payload;
    if (!("currency" in reward)) return;
    const id = Date.now();
    setFloats((prev) => [...prev, { id, text: `+${reward.amount}` }]);
    setTimeout(() => setFloats((prev) => prev.filter((f) => f.id !== id)), 1000);
  }, []);

  useEffect(() => {
    EventBus.on("activity:reward-earned", handleReward);
    return () => EventBus.off("activity:reward-earned", handleReward);
  }, [handleReward]);

  return (
    <Card className="border-slate-700/50 bg-black">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm flex items-center justify-between text-slate-200">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-accent-gold" />
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
          <div className="flex justify-between relative">
            <span className="text-slate-400">Money:</span>
            <span className="font-bold flex gap-1">{renderMoney(lerpMoney)}</span>
            {floats.map((f) => (
              <span key={f.id} className="absolute -top-3 right-0 text-accent-gold font-bold animate-float-up pointer-events-none">
                {f.text}
              </span>
            ))}
          </div>
          <div className="border-t border-slate-700/50 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Daily Income:</span>
              <span className="font-bold">
                {renderIncome(income)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Daily Expenses:</span>
              <span className="text-accent-cinnabar font-bold font-mono">
                -{formatNumber(expenses)}g
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-slate-300">Net Income:</span>
              <span className={`font-mono ${net >= 0 ? "text-accent-emerald" : "text-accent-cinnabar"}`}>
                {net >= 0 ? "+" : ""}{formatNumber(net)}g
              </span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
