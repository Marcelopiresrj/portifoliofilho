import { Github, Atom, Twitter, Linkedin } from 'lucide-react';

export default function Contact() {
  const links = [
    { name: "Github", icon: Github, bg: "bg-[#e56b6b]", hover: "hover:bg-[#d65f5f]", href: "https://github.com/marcelopires" },
    { name: "Platform", icon: Atom, bg: "bg-[#59c36a]", hover: "hover:bg-[#4db25d]", href: "#" },
    { name: "Twitter/X", icon: Twitter, bg: "bg-[#ff8b60]", hover: "hover:bg-[#ef7a50]", href: "#" },
    { name: "LinkedIn", icon: Linkedin, bg: "bg-[#2ebdf4]", hover: "hover:bg-[#25a9df]", href: "https://linkedin.com/in/marcelopires" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] p-8 text-white relative">
      {/* Profile Image */}
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Let's Connect</h2>
        <p className="text-gray-400 text-[15px] leading-relaxed">
          Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
        </p>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-4 gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a 
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.bg} ${link.hover} rounded-2xl p-4 h-28 flex flex-col justify-between transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md`}
            >
              <Icon className="w-6 h-6 text-white" />
              <span className="text-white font-medium text-sm">{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
