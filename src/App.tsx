/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MacOsDesktop from "./components/MacOsDesktop";
import AdminPanel from "./components/AdminPanel";
import { useState, useEffect } from "react";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

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

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white p-6 text-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h2 className="text-2xl font-bold">Desktop Recommended</h2>
        <p className="text-gray-400">
          This portfolio only works on tablets and computers. Please open it on a larger screen to enjoy the full experience.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen w-full">
        <MacOsDesktop />
        {/* Admin Panel */}
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
      </div>
    </>
  );
}

