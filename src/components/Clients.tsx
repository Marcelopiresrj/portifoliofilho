import { useEffect, useState } from 'react';
import { fetchClients, ClientRow } from '../lib/supabase';

const defaultClients: ClientRow[] = [
  { id: '1', name: 'iBella', subs: '4.7M', category: 'GAMING', avatar: 'https://i.pravatar.cc/150?u=ibella', order_idx: 1 },
  { id: '2', name: 'CashBlox', subs: '4.6M', category: 'GAMING', avatar: 'https://i.pravatar.cc/150?u=cashblox', order_idx: 2 },
  { id: '3', name: 'Kiply', subs: '3.1M', category: 'GAMING', avatar: 'https://i.pravatar.cc/150?u=kiply', order_idx: 3 },
  { id: '4', name: 'Mongo', subs: '1.9M', category: 'GAMING', avatar: 'https://i.pravatar.cc/150?u=mongo', order_idx: 4 },
  { id: '5', name: 'Dash', subs: '1.8M', category: 'GAMING', avatar: 'https://i.pravatar.cc/150?u=dash', order_idx: 5 },
  { id: '6', name: 'Ayzo', subs: '1.6M', category: 'GAMING', avatar: 'https://i.pravatar.cc/150?u=ayzo', order_idx: 6 },
  { id: '7', name: 'Skiddzie', subs: '1.4M', category: 'GAMING', avatar: 'https://i.pravatar.cc/150?u=skiddzie', order_idx: 7 },
  { id: '8', name: 'Kaido Lee', subs: '1M', category: 'ENTERTAINMENT', avatar: 'https://i.pravatar.cc/150?u=kaido', order_idx: 8 },
];

export default function Clients() {
  const [clients, setClients] = useState<ClientRow[]>([]);

  useEffect(() => {
    fetchClients().then((data) => {
      if (data && data.length > 0) {
        setClients(data);
      } else {
        setClients(defaultClients);
      }
    }).catch(err => {
      console.error("Failed to fetch clients", err);
      setClients(defaultClients);
    });
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-full w-full py-16 flex flex-col items-center overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4 px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight font-sans">
          Creators who trust <span className="text-[#e5e7eb]">me</span>
        </h2>
        
        <p className="text-[#666] text-xs md:text-sm tracking-[0.2em] font-mono uppercase mt-2">
          WORKING WITH THE BEST
        </p>
      </div>

      {/* Marquee Animation */}
      <div className="w-full relative max-w-full">
        {/* Left and Right fade gradients for smooth edge transition (with negative margin to fix gaps) */}
        <div className="absolute top-0 -left-2 w-32 md:w-64 h-full bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 -right-2 w-32 md:w-64 h-full bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>
        
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
                      cx="50" cy="50" r="48" fill="none" stroke="#e5e7eb" strokeWidth="2"
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
                <span className="text-[#e5e7eb] font-black text-xl mb-3 tracking-tight">{client.subs}</span>
                
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
