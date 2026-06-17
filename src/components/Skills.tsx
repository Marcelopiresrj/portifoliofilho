import { Check, Flag } from 'lucide-react';

export default function Skills() {
  const stack = [
    { category: "Video", skills: "Adobe Premiere Pro" },
    { category: "Motion", skills: "Adobe After Effects" },
    { category: "Niche", skills: "Minecraft & Roblox Content" },
    { category: "Audio & VFX", skills: "Sound Design, Transitions, Visual Effects" },
    { category: "Workflow", skills: "Dynamic Link, Proxy Editing" },
  ];

  return (
    <div className="bg-[#1c1c1e] text-gray-300 font-mono p-6 h-full flex flex-col text-[15px] leading-relaxed">
      <div className="mb-8 font-bold text-white tracking-wide">
        @marcelo % show editing_stack
      </div>
      
      {/* Table Header */}
      <div className="flex mb-4">
        <div className="w-[40px]"></div> {/* Icon spacer */}
        <div className="w-[140px] font-semibold text-gray-400">Category</div>
        <div className="font-semibold text-gray-400">Software/Skills</div>
      </div>
      
      <div className="border-t border-dashed border-gray-700/60 mb-5"></div>
      
      {/* Table Rows */}
      <div className="space-y-4">
        {stack.map((item, idx) => (
          <div key={idx} className="flex items-start">
            <div className="w-[40px] flex items-center justify-start mt-0.5">
              <Check className="w-4 h-4 text-[#4ade80]" strokeWidth={3} />
            </div>
            <div className="w-[140px] text-[#4ade80] font-medium">{item.category}</div>
            <div className="flex-1 text-gray-100">{item.skills}</div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-dashed border-gray-700/60 mt-6 mb-5"></div>
      
      {/* Footer / Status */}
      <div className="flex items-center text-[#4ade80] mb-3">
        <div className="w-[40px] flex items-center justify-start">
          <Check className="w-4 h-4" strokeWidth={3} />
        </div>
        <span className="font-medium">5 of 5 modules loaded successfully (100%)</span>
      </div>
      
      <div className="flex items-center text-gray-300">
        <div className="w-[40px] flex items-center justify-start">
          <Flag className="w-4 h-4" strokeWidth={2} />
        </div>
        <span>Playback resolution: Full (24fps)</span>
      </div>
    </div>
  );
}
