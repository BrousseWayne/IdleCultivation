import { Home } from "lucide-react";
import { lifestyleOptions } from "../data/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RenderLifestylePage() {
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
