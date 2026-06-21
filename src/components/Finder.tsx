import { useState, ReactNode } from 'react';
import { Folder, Info, FileText, Trash2, ChevronRight } from 'lucide-react';
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

import { useState, ReactNode } from 'react';
import { Folder, Info, FileText, Trash2, ChevronRight } from 'lucide-react';
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
        {/* Favorites Section */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 px-3">FAVORITES</h3>
          <nav className="space-y-0.5">
            <button onClick={() => onViewChange('work')} className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left ${activeView === 'work' ? 'bg-blue-500 text-white shadow-sm' : 'hover:bg-white/5 text-gray-200'}`}>
              <Folder className={`w-4 h-4 ${activeView === 'work' ? 'text-white' : 'text-blue-400'}`} fill="currentColor" />
              Work
            </button>
            <button onClick={() => onViewChange('about')} className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left ${activeView === 'about' || activeView === 'about-text' ? 'bg-blue-500 text-white shadow-sm' : 'hover:bg-white/5 text-gray-200'}`}>
              <Info className={`w-4 h-4 ${activeView === 'about' || activeView === 'about-text' ? 'text-white' : 'text-blue-400'}`} />
              About me
            </button>
            <button onClick={() => onViewChange('resume')} className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left ${activeView === 'resume' ? 'bg-blue-500 text-white shadow-sm' : 'hover:bg-white/5 text-gray-200'}`}>
              <FileText className={`w-4 h-4 ${activeView === 'resume' ? 'text-white' : 'text-blue-400'}`} />
              Resume
            </button>
            <button className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left hover:bg-white/5 text-gray-200`}>
              <Trash2 className="w-4 h-4 text-blue-400" />
              Trash
            </button>
          </nav>
        </div>

        <div className="h-px bg-white/5 my-4 mx-2" />

        {/* Work Section */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 px-3">WORK</h3>
          <nav className="space-y-0.5">
            {projects.map(project => {
              const isActive = activeView === `project-${project.id}`;
              return (
                <button 
                  key={project.id}
                  onClick={() => onViewChange(`project-${project.id}`)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left ${isActive ? 'bg-blue-500 text-white shadow-sm' : 'hover:bg-white/5 text-gray-200'}`}
                >
                  <Folder className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-400'}`} fill="currentColor" />
                  <span className="truncate">{project.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#1c1c1c] p-6">
        {activeView === 'work' ? (
          <div className="flex flex-col max-w-3xl">
            {projects.map(project => (
              <div 
                key={project.id} 
                onClick={() => onViewChange(`project-${project.id}`)} 
                className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-2xl cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5 shadow-inner">
                    <Folder className="w-6 h-6 text-blue-400" fill="currentColor" />
                  </div>
                  <span className="text-gray-100 font-semibold text-sm">{project.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            ))}
          </div>
        ) : activeView === 'about' ? (
          <div className="flex flex-col max-w-3xl">
            <div 
              onClick={() => onOpenWindow('about-text')} 
              className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-2xl cursor-pointer group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5 shadow-inner">
                  <FileText className="w-6 h-6 text-blue-400" fill="currentColor" />
                </div>
                <span className="text-gray-100 font-semibold text-sm">about-me.txt</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        ) : activeView.startsWith('project-') ? (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">{projects.find(p => p.id === activeView.replace('project-', ''))?.title}</h2>
            <button onClick={() => onOpenWindow(activeView as any)} className="px-4 py-2 bg-blue-600 rounded text-white text-sm hover:bg-blue-500 transition-colors">
              Open Details
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an item
          </div>
        )}
      </div>
    </div>
  );
}
