import React, { useState } from "react";
import Landing from "./views/Landing";
import CitizenApp from "./views/CitizenApp";
import GovernmentApp from "./views/GovernmentApp";
import UniversityApp from "./views/UniversityApp";
import IndustryApp from "./views/IndustryApp";
import AdminApp from "./views/AdminApp";

type Role = null | "citizen" | "government" | "university" | "industry" | "admin";

// Mobile frame wrapper for citizen experience
function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center" style={{ background: "#1a1a2e" }}>
      <div className="relative" style={{ width: 390, height: 844 }}>
        {/* Phone notch */}
        <div className="absolute top-0 left-0 right-0 h-7 flex items-center justify-between px-5 z-50 rounded-t-3xl" style={{ background: "#0d1526" }}>
          <span className="text-xs text-white font-mono font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-white">●●●●</span>
            <span className="text-xs text-white font-mono">WiFi</span>
            <span className="text-xs text-white">🔋</span>
          </div>
        </div>
        {/* Screen content */}
        <div className="absolute top-7 bottom-0 left-0 right-0 overflow-hidden rounded-b-3xl shadow-2xl border border-white/10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role>(null);

  if (!role) {
    return <Landing onSelectRole={(r) => setRole(r as Role)} />;
  }

  if (role === "citizen") {
    return (
      <MobileFrame>
        <CitizenApp onBack={() => setRole(null)} />
      </MobileFrame>
    );
  }

  if (role === "government") {
    return (
      <div className="size-full">
        <GovernmentApp onBack={() => setRole(null)} />
      </div>
    );
  }

  if (role === "university") {
    return (
      <div className="size-full">
        <UniversityApp onBack={() => setRole(null)} />
      </div>
    );
  }

  if (role === "industry") {
    return (
      <div className="size-full">
        <IndustryApp onBack={() => setRole(null)} />
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div className="size-full">
        <AdminApp onBack={() => setRole(null)} />
      </div>
    );
  }

  return null;
}
