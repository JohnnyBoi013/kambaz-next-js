"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NavigationContextType = {
  showKambazNav: boolean;
  showCourseNav: boolean;
  toggleKambazNav: () => void;
  toggleCourseNav: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [showKambazNav, setShowKambazNav] = useState(false);
  const [showCourseNav, setShowCourseNav] = useState(true);

  return (
    <NavigationContext.Provider
      value={{
        showKambazNav,
        showCourseNav,
        toggleKambazNav: () => setShowKambazNav(!showKambazNav),
        toggleCourseNav: () => setShowCourseNav(!showCourseNav),
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
