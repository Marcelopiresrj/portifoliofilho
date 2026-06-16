import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Code2 } from "lucide-react";

interface NavLink {
  label: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect to make navbar opaque on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetPos = element.offsetTop - 80;
      window.scrollTo({
        top: offsetPos,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-[#0d0e11]/85 backdrop-blur-md border-b border-gray-900 shadow-lg py-4" 
            : "bg-transparent py-6"
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleLinkClick("home")}
            className="flex items-center gap-2 text-white font-georama font-semibold text-lg sm:text-xl tracking-wider cursor-pointer group"
            id="brand-logo"
          >
            <Code2 className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
            <span className="font-light">MARCELO</span>
            <span className="text-gray-400 font-bold">.</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm tracking-widest font-mono uppercase cursor-pointer transition-all duration-300 relative py-1 ${
                  activeSection === link.id
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-white"
                }`}
                id={`nav-${link.id}`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                    transition={{ type: "smooth", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            id="menu-toggle-btn"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-30 bg-[#0d0e11]/95 backdrop-blur-lg flex flex-col justify-start px-6 py-8 border-t border-gray-900 md:hidden"
            id="mobile-drawer"
          >
            <nav className="flex flex-col gap-6" id="mobile-nav-links">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-2xl font-georama font-light tracking-wide py-2 w-full border-b border-gray-900/40 cursor-pointer flex items-center justify-between ${
                    activeSection === link.id
                      ? "text-white font-medium pl-2 border-l-2 border-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  id={`mobile-nav-${link.id}`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-gray-600">
                    /0{NAV_LINKS.indexOf(link) + 1}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-gray-900/40 text-center">
              <p className="text-xs text-gray-500 font-mono">
                marcelomotoslive@gmail.com
              </p>
              <p className="text-xs text-gray-600 font-mono mt-2 uppercase tracking-widest">
                Responsive Design Portfolio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
