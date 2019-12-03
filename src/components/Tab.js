import React from 'react';
import { useTabState } from "@bumaga/tabs";
import { cn } from "../utils/classname.js";

export const Tab = ({ children }) => {
    const { onClick, isActive } = useTabState();
  
    return <button onClick={onClick} className={cn('tab', isActive && 'active')}>{children}</button>;
};
  
  