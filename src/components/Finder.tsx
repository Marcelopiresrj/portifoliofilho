import { useState, ReactNode } from 'react';
import { Folder, Info, FileText, Trash2 } from 'lucide-react';
import { type ProjectRow } from '../lib/supabase';

interface FinderProps {
  projects: ProjectRow[];
  renderContent: (view: string) => ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

const FinderFolder = ({ name, onClick }: { name: string; onClick: () => void; key?: string }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-2 w-28 cursor-pointer group p-2 rounded-xl hover:bg-white/5 transition-colors">
    {/* High-fidelity macOS Folder SVG (Same as Desktop) */}
    <div className="relative w-[72px] h-[56px] flex items-center justify-center">
      <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105">
        <defs>
          <linearGradient id="finder-folder-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4daeff" />
            <stop offset="100%" stopColor="#007aff" />
          </linearGradient>
          <linearGradient id="finder-folder-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dc3ff" />
            <stop offset="100%" stopColor="#2c94ff" />
          </linearGradient>
        </defs>
        <path d="M5,15 L35,15 L45,25 L95,25 Q100,25 100,30 L100,75 Q100,80 95,80 L5,80 Q0,80 0,75 L0,20 Q0,15 5,15 Z" fill="url(#finder-folder-back)" />
        <path d="M0,32 L100,32 L96,80 L4,80 Z" fill="url(#finder-folder-front)" />
      </svg>
    </div>
    <span className="text-xs font-medium leading-[1.2] text-white text-center px-1 rounded transition-colors line-clamp-3">
      {name}
    </span>
  </div>
);

export default function Finder({ projects, renderContent, activeView, onViewChange }: FinderProps) {

  const navItemClass = (view: string) => 
    `w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm font-medium transition-colors text-left ` +
    (activeView === view ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-300');

  return (
    <div className="flex h-full w-full bg-[#1e1e1e] text-gray-200">
      {/* Sidebar */}
      <div className="w-[220px] bg-[#262626] border-r border-black/40 p-4 flex flex-col gap-6 flex-shrink-0 overflow-y-auto custom-scrollbar">
        {/* Favorites Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Favorites</h3>
          <nav className="space-y-0.5">
            <button onClick={() => onViewChange('work')} className={navItemClass('work')}>
              <Folder className="w-4 h-4 text-blue-400" fill="currentColor" />
              Work
            </button>
            <button onClick={() => onViewChange('about')} className={navItemClass('about')}>
              <Info className="w-4 h-4 text-blue-400" />
              About me
            </button>
            <button onClick={() => onViewChange('resume')} className={navItemClass('resume')}>
              <FileText className="w-4 h-4 text-blue-400" />
              Resume
            </button>
            <button className={navItemClass('trash')}>
              <Trash2 className="w-4 h-4 text-blue-400" />
              Trash
            </button>
          </nav>
        </div>

        {/* Work Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Work</h3>
          <nav className="space-y-0.5">
            {projects.map(project => (
              <button 
                key={project.id}
                onClick={() => onViewChange(`project-${project.id}`)}
                className={navItemClass(`project-${project.id}`)}
              >
                <Folder className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" />
                <span className="truncate">{project.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#1e1e1e]">
        {activeView === 'work' ? (
          <div className="p-8 flex flex-wrap gap-10">
            {projects.map(project => (
              <FinderFolder 
                key={project.id}
                name={project.title}
                onClick={() => onViewChange(`project-${project.id}`)}
              />
            ))}
          </div>
        ) : (
          renderContent(activeView)
        )}
      </div>
    </div>
  );
}
