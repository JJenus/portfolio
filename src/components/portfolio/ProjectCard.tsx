import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  className,
}) => {
  return (
    <Card className={cn(
      "border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden h-full group",
      className
    )}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader>
        <div className="flex items-start justify-between mb-4">
          <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono text-purple-300 bg-purple-900/20 px-2 py-1 rounded border border-purple-500/30 group-hover:border-purple-400/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;