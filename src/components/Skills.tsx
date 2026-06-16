import { Cpu, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface SkillCategory {
  title: string;
  items: { name: string; level: number }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    items: [
      { name: "React / Solid", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Vite / Bundlers", level: 85 }
    ]
  },
  {
    title: "Motion / Interaction",
    items: [
      { name: "GSAP (Timeline/Scroll)", level: 90 },
      { name: "Framer Motion", level: 88 },
      { name: "Variable Font Mechanics", level: 94 },
      { name: "CSS Keyframes & Paint", level: 82 }
    ]
  },
  {
    title: "Stack & Workflow",
    items: [
      { name: "Git & Collaborative Dev", level: 85 },
      { name: "CI / CD Pipelines", level: 75 },
      { name: "Responsive QA Tools", level: 90 },
      { name: "Figma (UI Export/Design)", level: 86 }
    ]
  }
];

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="py-24 px-6 md:py-32 bg-[#0a0b0d] border-t border-b border-gray-950 relative overflow-hidden"
    >
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" /> STACK & CAPABILITIES
            </span>
            <h2 className="text-4xl sm:text-5xl font-georama font-bold mt-2 text-white italic">
              Skills Grid
            </h2>
          </div>
          <p className="text-xs font-mono text-gray-600 self-start md:self-end">
            /03 ARCHITECTURE & TOOLS
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="skills-categories">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl border border-gray-900 bg-gray-950/40 hover:bg-gray-950/80 transition-all duration-300"
              id={`skills-col-${idx}`}
            >
              <h3 className="text-lg font-georama font-medium text-white mb-6 border-b border-gray-900 pb-3 flex items-center justify-between">
                <span>{category.title}</span>
                <span className="text-xs font-mono text-gray-700">0{idx + 1}</span>
              </h3>

              <div className="space-y-4">
                {category.items.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 group">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-light group-hover:text-white transition-colors flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gray-600 group-hover:text-emerald-500 transition-colors" />
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Visual Meter */}
                    <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 + sIdx * 0.05 }}
                        className="h-full bg-gradient-to-r from-gray-500 to-white rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
