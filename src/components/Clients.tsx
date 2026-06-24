import { useEffect, useState } from 'react';
import { fetchClients, ClientRow } from '../lib/supabase';



export default function Clients() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMarquee = clients.length > 4;

  useEffect(() => {
    fetchClients().then((data) => {
      if (data) {
        setClients(data);
      }
      setIsLoading(false);
    }).catch(err => {
      console.error("Failed to fetch clients", err);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-full w-full py-16 flex flex-col items-center overflow-hidden">
      
      {/* Header Section */}
      {(!isLoading && clients.length === 0) ? null : (
        <div className="flex flex-col items-center text-center mb-16 space-y-4 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight font-sans">
            Creators who trust <span className="text-[#e5e7eb]">me</span>
          </h2>
          
          <p className="text-[#666] text-xs md:text-sm tracking-[0.2em] font-mono uppercase mt-2">
            WORKING WITH THE BEST
          </p>
        </div>
      )}

      {/* Marquee Animation or Static Grid */}
      <div className="w-full relative max-w-full flex-1 flex flex-col justify-center">
        {/* Left and Right fade gradients for smooth edge transition - only show if marquee is active */}
        {isMarquee && (
          <>
            <div className="absolute top-0 -left-2 w-32 md:w-64 h-full bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 -right-2 w-32 md:w-64 h-full bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>
          </>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white/20"></div>
          </div>
        ) : clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-40">
            <h3 className="text-8xl md:text-9xl font-black text-[#333] tracking-tighter mb-6">404</h3>
            <p className="text-[#888] font-mono text-sm md:text-base tracking-[0.3em] uppercase">no clients at the moment</p>
          </div>
        ) : (
          <div className="flex overflow-hidden group justify-center">
            <div className={`flex px-3 ${isMarquee ? 'space-x-6 animate-marquee group-hover:[animation-play-state:paused]' : 'flex-wrap gap-6 justify-center max-w-5xl'}`}>
              {(isMarquee ? [...clients, ...clients, ...clients] : clients).map((client, i) => (
                <div 
                  key={i} 
                  className="w-40 md:w-48 flex-shrink-0 bg-[#121212] border border-[#222] rounded-2xl p-6 flex flex-col items-center hover:bg-[#161616] hover:border-[#333] transition-colors cursor-pointer group/card"
                >
                  {/* Avatar with Ring */}
                  <div className="relative w-24 h-24 mb-4">
                    <svg className="absolute inset-0 w-full h-full -rotate-90 animate-spin [animation-duration:4s]" viewBox="0 0 100 100">
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
        )}
      </div>
    </div>
  );
}
