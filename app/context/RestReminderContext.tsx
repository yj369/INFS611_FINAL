import React, { createContext, useState, useEffect, useContext } from "react";

type RestReminderContextType = {
    isEnabled: boolean;
    setIsEnabled: (value: boolean) => void;
    usageLimit: number;
    setUsageLimit: (value: number) => void;
    restDuration: number;
    setRestDuration: (value: number) => void;
    usageTime: number;
    resetUsageTime: () => void;
};

const RestReminderContext = createContext<RestReminderContextType | undefined>(
    undefined
);

export const RestReminderProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                                  children,
                                                                              }) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(true); // Toggle reminder feature
    const [usageLimit, setUsageLimit] = useState<number>(30); // Default usage limit in minutes
    const [restDuration, setRestDuration] = useState<number>(10); // Default rest duration in minutes
    const [usageTime, setUsageTime] = useState<number>(0); // Current usage time

    useEffect(() => {
        if (!isEnabled) {
            setUsageTime(0); // Reset usage time if feature is disabled
            return;
        }

        const usageInterval = setInterval(() => {
            setUsageTime((prev) => prev + 1);
        }, 60000); // Increment usage time every minute

        return () => clearInterval(usageInterval);
    }, [isEnabled]);

    const resetUsageTime = () => {
        setUsageTime(0);
    };

    return (
        <RestReminderContext.Provider
            value={{
                isEnabled,
                setIsEnabled,
                usageLimit,
                setUsageLimit,
                restDuration,
                setRestDuration,
                usageTime,
                resetUsageTime,
            }}
        >
            {children}
        </RestReminderContext.Provider>
    );
};

export const useRestReminder = (): RestReminderContextType => {
    const context = useContext(RestReminderContext);
    if (!context) {
        throw new Error(
            "useRestReminder must be used within a RestReminderProvider"
        );
    }
    return context;
};
