import { useState, useEffect } from "react";
import { fetchSiteSettings } from "../lib/supabase";

export default function About() {
  const [aboutText, setAboutText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSiteSettings().then(data => {
      if (data && data.about_text) {
        setAboutText(data.about_text);
      }
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="p-8 text-gray-200 bg-[#1e1e1e] min-h-full font-sans max-w-3xl mx-auto">
      {/* Profile Image */}
      <div className="mb-8">
        <img 
          src="https://github.com/Marcelopiresrj.png" 
          alt="Marcelo Pires" 
          className="w-24 h-24 rounded-full object-cover border-2 border-white/10 shadow-lg"
        />
      </div>

      {/* Heading */}
      <h1 className="text-xl font-bold text-white mb-8">
        Meet the Developer Behind the Code
      </h1>

      {/* Text Content from Supabase */}
      <div className="space-y-6 text-[15px] leading-relaxed text-gray-300">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="h-4 bg-white/10 rounded w-full"></div>
            <div className="h-4 bg-white/10 rounded w-5/6"></div>
            <div className="h-4 bg-white/10 rounded w-full"></div>
          </div>
        ) : aboutText ? (
          aboutText.split('\n').map((paragraph, index) => (
            paragraph.trim() ? <p key={index}>{paragraph}</p> : null
          ))
        ) : (
          <>
            <p>
              Hey! I'm Marcelo 👋, a web developer who enjoys building sleek, interactive websites that actually work well.
            </p>
            <p>
              I specialize in JavaScript, React, and Tailwind—and I love making things feel smooth, fast, and just a little bit delightful.
            </p>
            <p>
              I'm big on clean UI, good UX, and writing code that doesn't need a search party to debug.
            </p>
            <p>
              Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅
            </p>
          </>
        )}
      </div>
    </div>
  );
}
