/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import { ArrowUp, Code } from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Secret keyboard shortcut: Ctrl+Shift+A opens admin panel
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        setShowAdmin((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0e11] text-gray-100 flex flex-col font-sans selection:bg-white/10 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Welcome / Hero Section */}
        <Welcome />

        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0b0d] border-t border-gray-950 py-12 px-6" id="app-footer">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
            <Code className="w-4 h-4 text-gray-600" />
            <span>&copy; {new Date().getFullYear()} MARCELO. ALL RIGHTS RESERVED.</span>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-mono text-gray-500">
            <a 
              href="mailto:marcelomotoslive@gmail.com" 
              className="hover:text-white transition-colors cursor-pointer"
            >
              EMAIL
            </a>
            <span className="text-gray-850">•</span>
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              BACK TO TOP
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-white text-black border border-gray-250 hover:bg-gray-200 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer z-50 animate-fade-in"
          aria-label="Scroll back to top"
          id="scroll-to-top-btn"
        >
          <ArrowUp className="w-5 h-5 animate-pulse" />
        </button>
      )}

      {/* Admin Panel */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}

