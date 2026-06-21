import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const clients = [
  { name: 'iBella', subs: '4.7M', category: 'GAMING', color: '#a0f046', avatar: 'https://i.pravatar.cc/150?u=ibella' },
  { name: 'CashBlox', subs: '4.6M', category: 'GAMING', color: '#a0f046', avatar: 'https://i.pravatar.cc/150?u=cashblox' },
  { name: 'Kiply', subs: '3.1M', category: 'GAMING', color: '#a0f046', avatar: 'https://i.pravatar.cc/150?u=kiply' },
  { name: 'Mongo', subs: '1.9M', category: 'GAMING', color: '#a0f046', avatar: 'https://i.pravatar.cc/150?u=mongo' },
  { name: 'Dash', subs: '1.8M', category: 'GAMING', color: '#a0f046', avatar: 'https://i.pravatar.cc/150?u=dash' },
  { name: 'Ayzo', subs: '1.6M', category: 'GAMING', color: '#a0f046', avatar: 'https://i.pravatar.cc/150?u=ayzo' },
  { name: 'Skiddzie', subs: '1.4M', category: 'GAMING', color: '#a0f046', avatar: 'https://i.pravatar.cc/150?u=skiddzie' },
  { name: 'Kaido Lee', subs: '1M', category: 'ENTERTAINMENT', color: '#a0f046', avatar: 'https://i.pravatar.cc/150?u=kaido' },
];

export default function Clients() {
  return (
    <div className="bg-[#0a0a0a] min-h-full w-full py-16 flex flex-col items-center overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4 px-4">
        <span className="px-4 py-1.5 bg-[#152e18]/60 text-[#a0f046] border border-[#2a4e2e]/50 rounded-full text-[10px] tracking-[0.2em] font-mono uppercase shadow-[0_0_15px_rgba(160,240,70,0.1)]">
          <span className="inline-block w-1.5 h-1.5 bg-[#a0f046] rounded-full mr-2 animate-pulse"></span>
          Clients
        </span>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight font-sans">
          Creators who trust <span className="text-[#a0f046]">Volt Studios</span>
        </h2>
        
        <p className="text-[#666] text-xs md:text-sm tracking-[0.2em] font-mono uppercase mt-2">
          Working with the biggest names on YouTube
        </p>
      </div>

      {/* Marquee Animation */}
      <div className="w-full relative max-w-full">
        {/* Left and Right fade gradients for smooth edge transition */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex overflow-hidden group">
          {/* We duplicate the array to allow infinite seamless scrolling */}
          <div className="flex space-x-6 px-3 animate-marquee group-hover:[animation-play-state:paused]">
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div 
                key={i} 
                className="w-40 md:w-48 flex-shrink-0 bg-[#121212] border border-[#222] rounded-2xl p-6 flex flex-col items-center hover:bg-[#161616] hover:border-[#333] transition-colors cursor-pointer group/card"
              >
                {/* Avatar with Ring */}
                <div className="relative w-24 h-24 mb-4">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#222" strokeWidth="2" />
                    <circle 
                      cx="50" cy="50" r="48" fill="none" stroke="#a0f046" strokeWidth="2"
                      strokeDasharray="301.59" 
                      strokeDashoffset={301.59 * 0.3} // ~70% filled ring
                      className="opacity-60 group-hover/card:opacity-100 transition-opacity"
                    />
                  </svg>
                  <div className="absolute inset-1 rounded-full overflow-hidden border-[3px] border-[#121212]">
                    <img src={client.avatar} alt={client.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-white font-bold text-lg mb-2">{client.name}</h3>
                
                {/* Subs */}
                <span className="text-[#a0f046] font-black text-xl mb-3 tracking-tight">{client.subs}</span>
                
                {/* Category Pill */}
                <span className="px-3 py-1 bg-[#1a1a1a] text-[#666] border border-[#2a2a2a] rounded-full text-[10px] tracking-widest font-mono uppercase group-hover/card:border-[#444] transition-colors">
                  {client.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
