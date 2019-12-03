import React from 'react';
import { usePanelState } from "@bumaga/tabs";

export const Panel = ({ children }) => {
    const isActive = usePanelState();
  
    return isActive ? <div>{children}</div> : null;
  };