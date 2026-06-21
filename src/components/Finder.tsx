import { useState, ReactNode } from 'react';
import { Folder, HardDrive, ChevronRight } from 'lucide-react';
import { type ProjectRow } from '../lib/supabase';

interface FinderProps {
  projects: ProjectRow[];
  renderContent: (view: string) => ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  onOpenWindow: (view: string) => void;
}

const FinderFolder = ({ name, onClick }: { name: string; onClick: () => void; key?: string }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-2 w-28 cursor-pointer group p-2 rounded-xl hover:bg-white/5 transition-colors">
    <div className="relative w-[72px] h-[56px] flex items-center justify-center drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105">
      <img src="/folder-icon.png" alt="Folder" className="w-full h-full object-contain pointer-events-none" />
    </div>
    <span className="text-xs font-medium leading-[1.2] text-white text-center px-1 rounded group-hover:bg-blue-600/80 transition-colors line-clamp-3">
      {name}
    </span>
  </div>
);

const FinderFile = ({ name, onClick }: { name: string; onClick: () => void }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-2 w-28 cursor-pointer group p-2 rounded-xl hover:bg-white/5 transition-colors">
    <div className="relative w-[56px] h-[72px] flex items-center justify-center drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105">
      <img src="/about-me-icon.png" alt="File Icon" className="w-full h-full object-contain" />
    </div>
    <span className="text-xs font-medium leading-[1.2] text-white text-center px-1 rounded transition-colors line-clamp-3">
      {name}
    </span>
  </div>
);

export default function Finder({ projects, renderContent, activeView, onViewChange, onOpenWindow }: FinderProps) {

  const navItemClass = (view: string | string[]) => {
    const isActive = Array.isArray(view) ? view.includes(activeView) : activeView === view;
    return `w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm font-medium transition-colors text-left ` +
      (isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-300');
  };

  return (
    <div className="flex h-full w-full bg-[#1c1c1c] text-gray-200">
      {/* Sidebar */}
      <div className="w-[240px] bg-[#292929] border-r border-black/40 p-3 flex flex-col flex-shrink-0 overflow-y-auto custom-scrollbar">
        {/* Top Section */}
        <div>
          <nav className="space-y-0.5 mt-2">
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left bg-blue-500 text-white shadow-sm">
              <Folder className="w-4 h-4 text-white" fill="transparent" />
              Home
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left hover:bg-white/5 text-gray-200">
              <Folder className="w-4 h-4 text-gray-300" fill="transparent" />
              Desktop
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left hover:bg-white/5 text-gray-200">
              <Folder className="w-4 h-4 text-gray-300" fill="transparent" />
              Documentos
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left hover:bg-white/5 text-gray-200">
              <Folder className="w-4 h-4 text-gray-300" fill="transparent" />
              Downloads
            </button>
          </nav>
        </div>

        <div className="h-px bg-white/5 my-4 mx-2" />

        {/* Dispositivos Section */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 px-3">DISPOSITIVOS</h3>
          <nav className="space-y-0.5">
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left hover:bg-white/5 text-gray-200">
              <HardDrive className="w-4 h-4 text-gray-300" />
              Macbook Pro
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#1c1c1c] p-6">
        <div className="flex flex-col max-w-3xl">
          {[
            { name: 'Projetos', action: () => onOpenWindow('projects') },
            { name: 'Clientes', action: () => onOpenWindow('projects') },
            { name: 'Presets', action: () => {} },
            { name: 'Assets', action: () => {} },
          ].map((item, idx) => (
            <div key={idx} onClick={item.action} className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-2xl cursor-pointer group transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5 shadow-inner">
                  <Folder className="w-6 h-6 text-blue-400" fill="transparent" strokeWidth={1.5} />
                </div>
                <span className="text-gray-100 font-semibold text-sm">{item.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
