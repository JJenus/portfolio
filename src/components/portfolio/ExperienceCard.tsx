import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  role,
  company,
  location,
  period,
  points,
  className,
}) => {
  return (
    <Card className={cn(
      "border-slate-800 bg-slate-950/50 hover:bg-slate-900/30 transition-all duration-300",
      className
    )}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{role}</h3>
            <div className="text-cyan-400 font-medium">{company}</div>
            <div className="text-slate-500 text-sm mt-1">{location}</div>
          </div>
          <div className="text-slate-500 text-sm font-mono mt-2 md:mt-0 bg-slate-900/50 px-3 py-1 rounded">
            {period}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-slate-400 text-sm">
          {points.map((point, i) => (
            <li key={i} className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
