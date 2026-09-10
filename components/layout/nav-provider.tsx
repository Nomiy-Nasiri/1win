"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type NavContextValue = {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const value = useMemo(
    () => ({
      sheetOpen,
      setSheetOpen,
      searchOpen,
      setSearchOpen,
    }),
    [sheetOpen, searchOpen]
  );

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const context = useContext(NavContext);

  if (!context) {
    throw new Error("useNav must be used within NavProvider");
  }

  return context;
}
