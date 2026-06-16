import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

interface FontWeightConfig {
  min: number;
  max: number;
  default: number;
}

const FONT_WEIGHTS: Record<"subtitle" | "title", FontWeightConfig> = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text: string, className: string, baseWeight: number = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ 
        fontVariationSettings: `"wght" ${baseWeight}`,
        display: "inline-block"
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container: HTMLElement | null, type: "subtitle" | "title") => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter: HTMLSpanElement, weight: number, duration: number = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const span = letter as HTMLSpanElement;
      const { left: l, width: w } = span.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(span, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter as HTMLSpanElement, base, 0.3));
  };

  // Mobile Touch Support: track fingers sliding over letters
  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const { left } = container.getBoundingClientRect();
    const mouseX = touch.clientX - left;

    letters.forEach((letter) => {
      const span = letter as HTMLSpanElement;
      const { left: l, width: w } = span.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 1500); // slightly broader effect on touch

      animateLetter(span, min + (max - min) * intensity);
    });
  };

  const handleTouchEnd = () => {
    letters.forEach((letter) => animateLetter(letter as HTMLSpanElement, base, 0.3));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  container.addEventListener("touchmove", handleTouchMove, { passive: true });
  container.addEventListener("touchend", handleTouchEnd, { passive: true });
  container.addEventListener("touchcancel", handleTouchEnd, { passive: true });

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
    container.removeEventListener("touchmove", handleTouchMove);
    container.removeEventListener("touchend", handleTouchEnd);
    container.removeEventListener("touchcancel", handleTouchEnd);
  };
};

export default function Welcome() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup?.();
      titleCleanup?.();
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-between items-center px-6 py-12 md:py-20 select-none overflow-hidden"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-500/10 blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-emerald-500/10 blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0d0e11_100%)] bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-5xl text-center z-10 my-auto">
        <p 
          ref={subtitleRef} 
          className="text-lg sm:text-2xl md:text-3xl font-georama tracking-wide text-gray-400 cursor-default touch-none"
        >
          {renderText(
            "Hey, I'm Marcelo! Welcome to my",
            "font-georama text-gray-300 hover:text-white transition-colors duration-200",
            100,
          )}
        </p>

        <h1 
          ref={titleRef} 
          className="mt-6 md:mt-8 select-none leading-none tracking-tight cursor-default touch-none"
        >
          {renderText(
            "portfolio", 
            "text-6xl sm:text-8xl md:text-9xl italic font-georama font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 hover:brightness-125 transition-all duration-300",
            400
          )}
        </h1>

        <p className="mt-8 text-sm sm:text-base md:text-lg text-gray-400 max-w-lg mx-auto font-light leading-relaxed px-4">
          I craft fluent interactive digital experiences where modern aesthetics meet performance, responsive architecture, and fine typography.
        </p>

        {/* Action Button & Social Links */}
        <div className="mt-10 flex flex-wrap gap-4 items-center justify-center">
          <button
            onClick={handleScrollDown}
            className="group px-6 py-3 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-gray-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
            id="btn-explore"
          >
            Explore Work
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>
          
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-white hover:border-gray-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="GitHub Profile"
              id="social-github"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-white hover:border-gray-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="LinkedIn Profile"
              id="social-linkedin"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:marcelomotoslive@gmail.com"
              className="p-3 rounded-full border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-white hover:border-gray-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Send Email"
              id="social-mail"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <div 
        onClick={handleScrollDown}
        className="mt-8 flex flex-col items-center gap-2 cursor-pointer group text-gray-500 hover:text-gray-300 transition-colors z-10"
        id="scroll-indicator"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-mono">Scroll down</span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-700 flex justify-center p-1 group-hover:border-gray-500 transition-colors">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mt-0.5" />
        </div>
      </div>
    </section>
  );
}
