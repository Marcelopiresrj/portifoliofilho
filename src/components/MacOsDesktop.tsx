import { useState, useEffect, ReactNode, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Wifi, Search, SlidersHorizontal, BatteryMedium, Bell, LayoutGrid, ChevronLeft, ChevronRight, Shield, RotateCw, Share, Plus, Sidebar, X } from 'lucide-react';
import About from './About';
import Welcome from './Welcome';
import Projects from './Projects';
import Clients from './Clients';
import Skills from './Skills';
import Contact from './Contact';
import Photos from './Photos';
import Finder from './Finder';
import { fetchProjects, type ProjectRow } from "../lib/supabase";

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
  return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
}

// ── Window Types ─────────────────────────────────────────────────────────────
type WindowType = 'about' | 'about-text' | 'projects' | 'skills' | 'contact' | 'resume' | 'photos' | 'finder' | `project-${string}` | null;

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onFocus?: () => void;
  children: ReactNode;
  noPadding?: boolean;
  zIndex?: number;
  key?: string;
  variant?: 'default' | 'safari';
}

const Window = ({ title, isOpen, onClose, onFocus, children, noPadding, zIndex = 0, variant = 'default' }: WindowProps) => {
  const dragControls = useDragControls();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ left: -300, right: 300, top: -100, bottom: 500 }}
      dragMomentum={false}
      onDragStart={() => document.body.classList.add('is-dragging')}
      onDragEnd={() => document.body.classList.remove('is-dragging')}
      onPointerDown={onFocus}
      className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-[#1e1e1e]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col max-h-[80vh]"
      style={{ touchAction: "none", zIndex: 50 + zIndex }}
    >
      {/* Window Header */}
      {variant === 'safari' ? (
        <div className="flex flex-col flex-shrink-0 bg-[#1e1e24] border-b border-black/20" onPointerDown={(e) => dragControls.start(e)}>
          {/* Top Nav Row */}
          <div className="h-12 flex items-center px-4 gap-4">
            <div className="flex items-center gap-2 cursor-default" onPointerDown={e => e.stopPropagation()}>
              <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors shadow-sm" />
              <button className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-sm cursor-default" />
              <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-sm cursor-default" />
            </div>
            
            <div className="flex items-center gap-3 text-gray-400 ml-2">
              <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-gray-200 transition-colors" />
              <ChevronRight className="w-4 h-4 cursor-pointer hover:text-gray-200 transition-colors opacity-50" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-2xl mx-auto flex items-center bg-[#2b2b36] rounded-md h-7 px-3 text-sm text-gray-300 border border-white/5">
              <Shield className="w-3.5 h-3.5 text-green-500 mr-2" />
              <div className="flex-1 text-center truncate">remoteeditorstoolkit.com</div>
              <RotateCw className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-200" />
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <Share className="w-4 h-4 cursor-pointer hover:text-gray-200 transition-colors" />
              <Plus className="w-4 h-4 cursor-pointer hover:text-gray-200 transition-colors" />
              <Sidebar className="w-4 h-4 cursor-pointer hover:text-gray-200 transition-colors" />
            </div>
          </div>

          {/* Tab Row */}
          <div className="h-9 bg-[#1a1a1f] flex items-end px-2 gap-1 pt-1">
            <div className="h-8 bg-[#2b2b36] rounded-t-md border-t border-x border-white/10 flex items-center px-3 min-w-[160px] relative group">
              <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center mr-2 text-[8px] font-bold text-white">RET</div>
              <span className="text-xs font-semibold text-gray-200 flex-1">{title}</span>
              <X className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-white rounded hover:bg-white/10 p-0.5 opacity-0 group-hover:opacity-100 transition-all" />
            </div>
            <div className="h-8 flex items-center px-2">
              <Plus className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
            </div>
          </div>
        </div>
      ) : (
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="h-12 bg-[#2d2d2d]/80 border-b border-black/20 flex items-center px-4 flex-shrink-0 cursor-grab active:cursor-grabbing"
        >
          <div 
            className="flex items-center gap-2 w-20 h-full cursor-default"
            onPointerDown={e => e.stopPropagation()}
          >
            <button onClick={onClose} onPointerDown={e => e.stopPropagation()} className="cursor-pointer w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center transition-colors shadow-sm" style={{ clipPath: "circle(50%)" }} />
            <button onPointerDown={e => e.stopPropagation()} className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-sm cursor-default" />
            <button onPointerDown={e => e.stopPropagation()} className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-sm cursor-default" />
          </div>
          <div className="flex-1 text-center text-sm font-semibold text-gray-300 pointer-events-none">
            {title}
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      )}

      {/* Window Content */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar bg-[#1e1e1e] ${noPadding ? '' : 'p-4'}`}>
        {children}
      </div>
    </motion.div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
export default function MacOsDesktop() {
  const [time, setTime] = useState(new Date());
  const [activeWindows, setActiveWindows] = useState<WindowType[]>([]);
  const [dbProjects, setDbProjects] = useState<ProjectRow[]>([]);
  const [finderView, setFinderView] = useState<string>('work');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const openWindow = (type: WindowType) => {
    if (!type) return;
    setActiveWindows(prev => {
      if (prev.includes(type)) {
        return [...prev.filter(w => w !== type), type];
      }
      return [...prev, type];
    });
  };

  const closeWindow = (type: WindowType) => {
    setActiveWindows(prev => prev.filter(w => w !== type));
  };

  const bringToFront = (type: WindowType) => {
    setActiveWindows(prev => {
      if (!prev.includes(type)) return prev;
      return [...prev.filter(w => w !== type), type];
    });
  };

  const getZIndex = (type: WindowType) => activeWindows.indexOf(type);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchProjects().then(data => {
      if (data && data.length > 0) {
        setDbProjects(data);
      } else {
        // Fallback data in case Supabase is paused or empty
        setDbProjects([
          { id: '1', title: 'Nike Ecommerce Website Application', category: 'Web App', description: 'Nike clone.', tags: [], demo_link: null, github_link: null, icon: '👟', featured: true, order_idx: 1 },
          { id: '2', title: 'AI Resume Analyzer', category: 'AI', description: 'AI analyzer.', tags: [], demo_link: null, github_link: null, icon: '📄', featured: true, order_idx: 2 },
          { id: '3', title: 'Food Delivery App', category: 'Mobile App', description: 'Food delivery.', tags: [], demo_link: null, github_link: null, icon: '🍔', featured: true, order_idx: 3 },
        ]);
      }
    }).catch(err => {
      console.error(err);
      setDbProjects([
        { id: '1', title: 'Nike Ecommerce Website Application', category: 'Web App', description: 'Nike clone.', tags: [], demo_link: null, github_link: null, icon: '👟', featured: true, order_idx: 1 },
        { id: '2', title: 'AI Resume Analyzer', category: 'AI', description: 'AI analyzer.', tags: [], demo_link: null, github_link: null, icon: '📄', featured: true, order_idx: 2 },
        { id: '3', title: 'Food Delivery App', category: 'Mobile App', description: 'Food delivery.', tags: [], demo_link: null, github_link: null, icon: '🍔', featured: true, order_idx: 3 },
      ]);
    });
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
      ' ' +
      date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Helper to render a specific project's details inside a window
  const renderProjectDetail = (projectId: string) => {
    const project = dbProjects.find(p => p.id === projectId);
    if (!project) return null;
    return (
      <div className="p-6 text-white max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-3xl border border-gray-800 shadow-inner">
              {project.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold font-georama">{project.title}</h2>
              <span className="text-sm font-mono text-gray-500 uppercase tracking-widest">{project.category}</span>
            </div>
          </div>
        </div>
        
        {project.youtube_url && getYouTubeEmbedUrl(project.youtube_url) ? (
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-800 shadow-xl">
            <iframe 
              width="100%" 
              height="100%" 
              src={getYouTubeEmbedUrl(project.youtube_url) || ''} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        ) : null}

        <p className="text-gray-300 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-4">
          {project.demo_link && (
            <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-sm shadow-lg shadow-blue-900/20">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/10 text-sm">
              <Github className="w-4 h-4" /> Source Code
            </a>
          )}
        </div>
      </div>
    );
  };

  const handleMenuClick = (menu: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const menuItems = {
    apple: [
      { label: 'Apple Menu', action: () => {} },
      { divider: true },
      { label: 'About This Mac', action: () => {} },
      { label: 'System Settings', action: () => {} },
      { divider: true },
      { label: 'Sleep', action: () => {} },
      { label: 'Restart', action: () => {} },
      { label: 'Shut Down', action: () => {} },
    ],
    finder: [],
    arquivo: [
      { label: 'New Window', action: () => {} },
      { label: 'New Tab', action: () => {} },
      { label: 'Open...', action: () => {} },
      { label: 'Close Window', action: () => {} },
      { divider: true },
      { label: 'Get Info', action: () => {} },
      { label: 'Duplicate', action: () => {} },
      { divider: true },
      { label: 'Move to Trash', action: () => {} },
    ],
    editar: [
      { label: 'Undo', action: () => {} },
      { label: 'Redo', action: () => {} },
      { divider: true },
      { label: 'Cut', action: () => {} },
      { label: 'Copy', action: () => {} },
      { label: 'Paste', action: () => {} },
      { label: 'Select All', action: () => {} },
      { divider: true },
      { label: 'Find', action: () => {} },
    ],
    visualizar: [
      { label: 'as Icons', action: () => {} },
      { label: 'as List', action: () => {} },
      { label: 'as Columns', action: () => {} },
      { divider: true },
      { label: 'Toolbar', action: () => {} },
      { label: 'Status Bar', action: () => {} },
    ],
    ir: [
      { label: 'Back', action: () => {} },
      { label: 'Forward', action: () => {} },
      { divider: true },
      { label: 'Home', action: () => {} },
      { label: 'Desktop', action: () => {} },
      { label: 'Downloads', action: () => {} },
      { label: 'Applications', action: () => {} },
    ],
    ajuda: [
      { label: 'Help Center', action: () => {} }
    ]
  };

  const renderDropdown = (menuKey: keyof typeof menuItems) => {
    if (activeMenu !== menuKey) return null;
    return (
      <div className="absolute top-full left-0 mt-2 min-w-[220px] bg-[#1a1f2c]/95 backdrop-blur-3xl border border-white/10 rounded-xl py-1.5 shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-100">
        {menuItems[menuKey].map((item, idx) => {
          if (item.divider) return <div key={idx} className="h-px bg-white/10 my-1.5 mx-3" />;
          return (
            <div 
              key={idx} 
              className="px-3 py-1.5 mx-1.5 text-[13px] text-gray-200 hover:bg-blue-600 hover:text-white rounded transition-colors cursor-default"
              onClick={(e) => {
                e.stopPropagation();
                item.action?.();
                setActiveMenu(null);
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col font-sans text-white relative">
      
      {/* Boot Screen Animation */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <svg viewBox="0 0 384 512" className="w-24 h-24 fill-current text-white mb-32">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <div className="w-64 h-[3px] bg-[#333] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.0, ease: "easeInOut" }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real macOS Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://cdn.jsdelivr.net/gh/Renovamen/playground-macos@main/public/img/ui/wallpaper-night.jpg')` }}
      />

      {/* 1. Top Menu Bar */}
      <header className="absolute top-2 left-4 right-4 h-9 bg-[#1e2430]/70 backdrop-blur-xl border border-white/5 rounded-2xl flex justify-between items-center px-4 text-[13px] font-medium z-50 shadow-lg shadow-black/20">
        <div className="flex items-center gap-2 text-gray-200">
          <div className="relative">
            <span 
              className={`cursor-pointer flex items-center justify-center px-3 py-1 rounded transition-colors ${activeMenu === 'apple' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={(e) => handleMenuClick('apple', e)}
            >
              <svg viewBox="0 0 384 512" className="w-[14px] h-[14px] fill-current text-white mb-0.5">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
            </span>
            {renderDropdown('apple')}
          </div>
          
          <div className="relative">
            <span 
              className="cursor-pointer px-3 py-1 rounded-lg font-semibold text-white transition-colors bg-white/10 hover:bg-white/20"
            >
              Finder
            </span>
          </div>

          <div className="relative">
            <span className={`cursor-pointer px-3 py-1 rounded transition-colors ${activeMenu === 'arquivo' ? 'bg-white/20' : 'hover:bg-white/10'}`} onClick={(e) => handleMenuClick('arquivo', e)}>File</span>
            {renderDropdown('arquivo')}
          </div>
          
          <div className="relative">
            <span className={`cursor-pointer px-3 py-1 rounded transition-colors ${activeMenu === 'editar' ? 'bg-white/20' : 'hover:bg-white/10'}`} onClick={(e) => handleMenuClick('editar', e)}>Edit</span>
            {renderDropdown('editar')}
          </div>
          
          <div className="relative">
            <span className={`cursor-pointer px-3 py-1 rounded transition-colors ${activeMenu === 'visualizar' ? 'bg-white/20' : 'hover:bg-white/10'}`} onClick={(e) => handleMenuClick('visualizar', e)}>View</span>
            {renderDropdown('visualizar')}
          </div>
          
          <div className="relative">
            <span className={`cursor-pointer px-3 py-1 rounded transition-colors ${activeMenu === 'ir' ? 'bg-white/20' : 'hover:bg-white/10'}`} onClick={(e) => handleMenuClick('ir', e)}>Go</span>
            {renderDropdown('ir')}
          </div>
          
          <div className="relative">
            <span className={`cursor-pointer px-3 py-1 rounded transition-colors ${activeMenu === 'ajuda' ? 'bg-white/20' : 'hover:bg-white/10'}`} onClick={(e) => handleMenuClick('ajuda', e)}>Help</span>
            {renderDropdown('ajuda')}
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <Search className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          <Wifi className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          <BatteryMedium className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          <Bell className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          <LayoutGrid className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          <span className="text-gray-200">{formatTime(time)}</span>
        </div>
      </header>

      {/* 2. Desktop Area */}
      <main className="flex-1 relative w-full" onClick={() => setActiveMenu(null)}>
        
        {/* Dynamic Desktop Folders (Projects) */}
        <div className="absolute top-16 left-4 flex flex-col gap-6 z-40" onClick={e => e.stopPropagation()}>
          {dbProjects.slice(0, 5).map(project => (
            <DesktopFolder 
              key={project.id}
              name={project.title} 
              onClick={() => {
                setFinderView(`project-${project.id}`);
                openWindow('finder');
              }} 
            />
          ))}
        </div>

        {/* Center Text (GSAP Animated) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none drop-shadow-2xl">
          <div className="pointer-events-auto">
            <Welcome />
          </div>
        </div>

        {/* Windows Rendering */}
        <div onClick={e => e.stopPropagation()}>
          <AnimatePresence>
            {activeWindows.includes('about') && (
              <Window key="about" title="About Me" isOpen={true} onClose={() => closeWindow('about')} onFocus={() => bringToFront('about')} zIndex={getZIndex('about')}>
                <About />
              </Window>
            )}
            {activeWindows.includes('projects') && (
              <Window key="projects" title="Toolkit" isOpen={true} onClose={() => closeWindow('projects')} onFocus={() => bringToFront('projects')} zIndex={getZIndex('projects')} variant="safari">
                <Clients />
              </Window>
            )}
            {activeWindows.includes('skills') && (
              <Window key="skills" title="Editing Stack" isOpen={true} onClose={() => closeWindow('skills')} onFocus={() => bringToFront('skills')} noPadding zIndex={getZIndex('skills')}>
                <Skills />
              </Window>
            )}
            {activeWindows.includes('contact') && (
              <Window key="contact" title="Contact Me" isOpen={true} onClose={() => closeWindow('contact')} onFocus={() => bringToFront('contact')} noPadding zIndex={getZIndex('contact')}>
                <Contact />
              </Window>
            )}
            {activeWindows.includes('photos') && (
              <Window key="photos" title="Photos" isOpen={true} onClose={() => closeWindow('photos')} onFocus={() => bringToFront('photos')} noPadding zIndex={getZIndex('photos')}>
                <Photos />
              </Window>
            )}
            {activeWindows.includes('about-text') && (
              <Window key="about-text" title="about-me.txt" isOpen={true} onClose={() => closeWindow('about-text')} onFocus={() => bringToFront('about-text')} noPadding zIndex={getZIndex('about-text')}>
                <About />
              </Window>
            )}
            {activeWindows.includes('finder') && (
              <Window key="finder" title="Portfolio" isOpen={true} onClose={() => closeWindow('finder')} onFocus={() => bringToFront('finder')} noPadding zIndex={getZIndex('finder')}>
                <Finder 
                  projects={dbProjects} 
                  activeView={finderView}
                  onViewChange={setFinderView}
                  onOpenWindow={openWindow}
                  renderContent={(view) => {
                    if (view === 'resume') return (
                      <div className="p-10 text-center space-y-4">
                        <h2 className="text-2xl font-bold text-white">Marcelo Pires</h2>
                        <p className="text-gray-400">Software Engineer</p>
                        <a href="#" className="inline-block mt-4 px-6 py-2 bg-blue-600 rounded-lg font-medium hover:bg-blue-500 transition-colors text-white">Download PDF</a>
                      </div>
                    );
                    if (view.startsWith('project-')) {
                      return renderProjectDetail(view.replace('project-', ''));
                    }
                    return null;
                  }}
                />
              </Window>
            )}
            {activeWindows.includes('resume') && (
              <Window key="resume" title="Resume" isOpen={true} onClose={() => closeWindow('resume')} onFocus={() => bringToFront('resume')} zIndex={getZIndex('resume')}>
                <div className="p-10 text-center space-y-4">
                  <h2 className="text-2xl font-bold">Marcelo Pires</h2>
                  <p className="text-gray-400">Software Engineer</p>
                  <a href="#" className="inline-block mt-4 px-6 py-2 bg-blue-600 rounded-lg font-medium hover:bg-blue-500 transition-colors">Download PDF</a>
                </div>
              </Window>
            )}
            {/* Dynamic Project Windows */}
            {activeWindows.filter(w => w && w.startsWith('project-')).map(windowType => {
              const projId = windowType!.replace('project-', '');
              return (
                <Window 
                  key={windowType}
                  title={dbProjects.find(p => p.id === projId)?.title || "Project"} 
                  isOpen={true} 
                  onClose={() => closeWindow(windowType)}
                  onFocus={() => bringToFront(windowType)}
                  zIndex={getZIndex(windowType)}
                >
                  {renderProjectDetail(projId)}
                </Window>
              )
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* 3. Dock Inferior */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#28394a]/50 backdrop-blur-3xl backdrop-saturate-150 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] rounded-[32px] p-2.5 flex items-center -space-x-1 z-50">
        <DockIcon icon={<FinderIcon />} label="Portfolio" onClick={() => openWindow('finder')} />
        <DockIcon icon={<SafariIcon />} label="Safari" onClick={() => openWindow('projects')} />
        <DockIcon icon={<PhotosIcon />} label="Photos" onClick={() => openWindow('photos')} />
        <DockIcon icon={<ContactsIcon />} label="Contacts" onClick={() => openWindow('contact')} />
        <DockIcon icon={<TerminalIcon />} label="Terminal" onClick={() => openWindow('skills')} />
        
        <div className="w-px h-12 bg-white/20 mx-2" /> {/* Divider */}
        
        <DockIcon icon={<TrashIcon />} label="Trash" onClick={() => {}} />
      </div>

    </div>
  );
}

// ── Helper Components ────────────────────────────────────────────────────────

const DesktopFolder = ({ name, onClick }: { key?: string | number; name: string; onClick: () => void }) => {
  const isDragging = useRef(false);

  return (
    <motion.div 
      drag 
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => { isDragging.current = true; document.body.classList.add('is-dragging'); }}
      onDragEnd={() => { setTimeout(() => { isDragging.current = false; document.body.classList.remove('is-dragging'); }, 150); }}
      onClick={(e) => {
        if (isDragging.current) {
          e.stopPropagation();
          return;
        }
        onClick();
      }}
      className="flex flex-col items-center gap-1 w-24 cursor-pointer group"
    >
      <div className="relative w-[72px] h-[56px] flex items-center justify-center drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105 pointer-events-none">
        <img src="/folder-icon.png" alt="Folder" className="w-full h-full object-contain" />
      </div>
      <span className="text-xs font-medium leading-[1.1] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center px-1.5 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors line-clamp-3">
        {name}
      </span>
    </motion.div>
  );
};

const DockIcon = ({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className={`w-[86px] h-[86px] cursor-pointer hover:-translate-y-4 hover:scale-125 transition-all duration-300 relative group flex items-center justify-center`}
  >
    <div className="w-full h-full flex items-center justify-center">
      {icon}
    </div>
    <span className="absolute -top-12 bg-black/60 backdrop-blur-md text-white text-xs font-medium py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10 pointer-events-none z-50">
      {label}
    </span>
    <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

// High-fidelity SVG icons to perfectly match macOS without relying on broken image URLs
const FinderIcon = () => (
  <div className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105 p-1">
    <img src="/finder.png" alt="Portfolio" className="w-full h-full object-contain" />
  </div>
);

const SafariIcon = () => (
  <div className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105 p-1">
    <img src="/safari.png" alt="Safari" className="w-full h-full object-contain" />
  </div>
);

const PhotosIcon = () => (
  <div className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105 p-1">
    <img src="/photos.png" alt="Photos" className="w-full h-full object-contain" />
  </div>
);

const ContactsIcon = () => (
  <div className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105 p-1">
    <img src="/contacts.png" alt="Contacts" className="w-full h-full object-contain" />
  </div>
);

const TerminalIcon = () => (
  <div className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105 p-1">
    <img src="/terminal.png" alt="Terminal" className="w-full h-full object-contain" />
  </div>
);

const TrashIcon = () => (
  <div className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105 p-1">
    <img src="/trash.png" alt="Trash" className="w-full h-full object-contain" />
  </div>
);
