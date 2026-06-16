import { motion } from "motion/react";
import { User, Sparkles, Sliders, Smartphone } from "lucide-react";

export default function About() {
  const cards = [
    {
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      title: "Responsive Craft",
      description: "Designing layout architectures that flow effortlessly from ultra-wide screens down to compact mobile displays."
    },
    {
      icon: <Sliders className="w-6 h-6 text-blue-400" />,
      title: "Interactivity",
      description: "Utilizing GSAP and modern animation pipelines to construct crisp, gesture-driven interfaces."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: "User Centered",
      description: "Obsessively refining font weights, kerning, margins, and responsiveness to elevate the terminal user experience."
    }
  ];

  return (
    <section 
      id="about" 
      className="py-24 px-6 md:py-32 bg-[#0a0b0d] border-t border-b border-gray-950 relative overflow-hidden"
    >
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Background Info
            </span>
            <h2 className="text-4xl sm:text-5xl font-georama font-bold mt-2 text-white italic">
              About Marcelo
            </h2>
          </div>
          <p className="text-xs font-mono text-gray-600 self-start md:self-end">
            /01 PROFILE AT WORK
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          {/* Main Story (3 Columns) */}
          <div className="md:col-span-3 space-y-6 text-gray-300 font-light leading-relaxed text-base sm:text-lg">
            <p>
              Hello! I'm <strong className="text-white font-medium">Marcelo</strong>, an software engineer and creative designer who loves building tactile, beautifully structured digital experiences. I believe software should be as delightful to touch as it is robust to run.
            </p>
            <p>
              My design philosophy is grounded in 
              <strong className="text-white font-mono text-sm px-2 py-0.5 bg-gray-900 rounded border border-gray-800 mx-1">
                simplicity & responsive fluidism
              </strong>. Whether it is adjusting typographic scales or writing custom GSAP interpolation equations for fine letters, I prioritize detail in every viewport.
            </p>
            <p>
              I specialize in combining React, TypeScript, and Tailwind with high-fidelity performance. Adapting layouts to match perfectly across desktops, tablets, and gesture-heavy mobile screens is second nature to me.
            </p>
          </div>

          {/* Core Values/Pillars (2 Columns) */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-800 pb-2">
              Core Pillars
            </h3>
            <div className="space-y-4">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="p-5 rounded-2xl border border-gray-900 bg-gray-950/50 hover:bg-gray-950/95 hover:border-gray-800 transition-all duration-300 flex gap-4"
                  id={`pillar-card-${i}`}
                >
                  <div className="p-3 rounded-xl bg-gray-900/60 shrink-0 self-start">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-georama font-medium text-white mb-1">
                      {card.title}
                    </h4>
                    <p className="text-sm text-gray-400 font-light leading-snug">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
