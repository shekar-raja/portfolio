"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isResume = pathname === "/resume" || pathname?.startsWith("/resume/");

  if (isResume) {
    return (
      <div id="main-content" className="pt-14 sm:pt-16 min-h-screen relative z-10">
        {children}
      </div>
    );
  }

  return (
    <main
      id="main-content"
      className="pt-14 sm:pt-16 min-h-screen flex flex-col relative z-10"
    >
      {children}
    </main>
  );
}
