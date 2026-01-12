import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TerminalCardProps {
  className?: string;
}

const TerminalCard: React.FC<TerminalCardProps> = ({ className }) => {
  return (
    <Card className={cn(
      "p-0 overflow-hidden border-slate-800 bg-slate-950/80 font-mono text-sm",
      className
    )}>
      <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-2 text-slate-500 text-xs">jenus_profile.json</span>
      </div>
      <CardContent className="p-6">
        <div className="text-slate-300 space-y-2">
          <p>
            <span className="text-purple-400">const</span> <span className="text-yellow-300">engineer</span> = {"{"}
          </p>
          <p className="pl-4">
            name: <span className="text-green-400">"Alakere Jenus"</span>,
          </p>
          <p className="pl-4">
            focus: <span className="text-green-400">"Scalable Systems"</span>,
          </p>
          <p className="pl-4">
            stack: [<span className="text-green-400">"Java"</span>, <span className="text-green-400">"Spring Boot"</span>, <span className="text-green-400">"Node.js"</span>],
          </p>
          <p className="pl-4">
            available: <span className="text-blue-400">true</span>,
          </p>
          <p className="pl-4">
            location: <span className="text-green-400">"Portharcourt, Nigeria"</span>
          </p>
          <p>{"};"}</p>
          <p className="text-slate-500 italic mt-4">
            // Passionate about real-time processing and secure APIs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TerminalCard;
