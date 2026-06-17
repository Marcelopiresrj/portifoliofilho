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

  return (
    <>
      <MacOsDesktop />
      
      {/* Admin Panel */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </>
  );
}

