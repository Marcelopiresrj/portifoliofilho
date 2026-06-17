import { Image, Clock, MapPin, Users, Heart } from 'lucide-react';

export default function Photos() {
  return (
    <div className="flex h-full w-full bg-[#1e1e1e] text-gray-200">
      {/* Sidebar */}
      <div className="w-[220px] bg-[#262626] border-r border-black/40 p-4 flex flex-col gap-6 flex-shrink-0">
        <div>
          <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Photos</h3>
          <nav className="space-y-0.5">
            <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 bg-white/10 rounded-md text-sm font-medium text-white transition-colors">
              <Image className="w-4 h-4 text-blue-400" />
              Library
            </a>
            <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/5 rounded-md text-sm font-medium text-gray-300 transition-colors">
              <Clock className="w-4 h-4 text-blue-400" />
              Memories
            </a>
            <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/5 rounded-md text-sm font-medium text-gray-300 transition-colors">
              <MapPin className="w-4 h-4 text-blue-400" />
              Places
            </a>
            <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/5 rounded-md text-sm font-medium text-gray-300 transition-colors">
              <Users className="w-4 h-4 text-blue-400" />
              People
            </a>
            <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-white/5 rounded-md text-sm font-medium text-gray-300 transition-colors">
              <Heart className="w-4 h-4 text-blue-400" />
              Favorites
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#1e1e1e]">
        <div className="grid grid-cols-3 gap-3 auto-rows-[200px]">
          {/* Top Left - Large */}
          <div className="col-span-2 row-span-1 rounded-xl overflow-hidden bg-gray-800 group relative shadow-md border border-white/5">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60" alt="Tech Conference" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Top Right - Square */}
          <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-800 group relative shadow-md border border-white/5">
            <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60" alt="React Logo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Bottom Left */}
          <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-800 group relative shadow-md border border-white/5">
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&auto=format&fit=crop&q=60" alt="Meeting" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Bottom Middle/Right */}
          <div className="col-span-2 row-span-1 rounded-xl overflow-hidden bg-gray-800 group relative shadow-md border border-white/5">
            <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=60" alt="Panel Discussion" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
}
