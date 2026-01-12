import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  category: string;
  icon: React.ReactNode;
  items: string[];
  className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  category,
  icon,
  items,
  className,
}) => {
  return (
    <Card
      className={cn(
        "border-slate-800 bg-slate-950/50 hover:border-cyan-500/30 transition-all duration-300 h-full hover:shadow-lg hover:shadow-cyan-500/10",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-cyan-400">{icon}</div>
          <CardTitle className="text-lg">{category}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="text-xs px-2 py-1 rounded bg-slate-900/50 text-slate-300 border border-slate-700 hover:border-cyan-500/50 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;