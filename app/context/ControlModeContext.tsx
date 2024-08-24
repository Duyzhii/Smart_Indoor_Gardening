"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

type ControlModeType = "manual" | "automatic";

interface ControlModeContextType {
    controlMode: ControlModeType;
    setControlMode: (mode: ControlModeType) => void;
}

const ControlModeContext = createContext<ControlModeContextType | undefined>(undefined);

export const ControlModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [controlMode, setControlMode] = useState<ControlModeType>("manual");

    return (
        <ControlModeContext.Provider value={{ controlMode, setControlMode }}>
            {children}
        </ControlModeContext.Provider>
    );
};

export const useControlMode = () => {
    const context = useContext(ControlModeContext);
    if (!context) {
        throw new Error("useControlMode must be used within a ControlModeProvider");
    }
    
    return context;
}