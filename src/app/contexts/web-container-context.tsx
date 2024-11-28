
'use client';
import React, { createContext, useContext, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

interface WebContainerContextValue {
  webContainer: WebContainer | null;
  setWebContainer: (webContainer: WebContainer | null) => void;
}

const WebContainerContext = createContext<WebContainerContextValue | undefined>(undefined);

export const WebContainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);

  return (
    <WebContainerContext.Provider value={{ webContainer, setWebContainer }}>
      {children}
    </WebContainerContext.Provider>
  );
};

export const useWebContainer = (): WebContainerContextValue => {
  const context = useContext(WebContainerContext);
  if (!context) {
    throw new Error('useWebContainer must be used within a WebContainerProvider');
  }
  return context;
};
