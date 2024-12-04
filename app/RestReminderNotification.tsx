import { useEffect } from "react";
import { useRestReminder } from "./context/RestReminderContext";
import { usePopup } from "./context/PopupContext";

export const useRestReminderNotification = (): void => {
    const { usageTime, usageLimit, isEnabled } = useRestReminder();
    const { showPopup } = usePopup();

    useEffect(() => {
        if (isEnabled && usageTime >= usageLimit) {
            showPopup(
                `You've been using your phone for ${usageTime} minutes. Please take a break!`
            );
        }
    }, [usageTime, usageLimit, isEnabled]);
};
