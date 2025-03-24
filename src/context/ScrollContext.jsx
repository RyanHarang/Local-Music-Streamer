import React, { createContext, useContext, useEffect } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  return (
    <ScrollContext.Provider value={usePageScroll}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollManager = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollManager must be used within a ScrollProvider");
  }
  return context;
};

export const usePageScroll = (page, mainRef) => {
  useEffect(() => {
    if (mainRef.current && ["album", "playlist"].includes(page)) {
      mainRef.current.scrollTop = 0;
    }
  }, [page, mainRef]);

  return null;
};
