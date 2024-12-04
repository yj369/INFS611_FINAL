import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type PopupContextType = {
    isVisible: boolean;
    showPopup: (content: string) => void;
    hidePopup: () => void;
    content: string;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const showPopup = (content: string) => {
        setContent(content);
        setIsVisible(true);
    };

    const hidePopup = () => {
        setIsVisible(false);
        setContent("");
    };

    return (
        <PopupContext.Provider value={{ isVisible, showPopup, hidePopup, content }}>
            {children}
            {isVisible && (
                <Modal transparent animationType="fade" visible={isVisible}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.popupContainer}>
                            <Text style={styles.popupContent}>{content}</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={hidePopup}
                            >
                                <Text style={styles.closeButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </PopupContext.Provider>
    );
};

export const usePopup = (): PopupContextType => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error("usePopup must be used within a PopupProvider");
    }
    return context;
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    popupContainer: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    popupContent: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    closeButton: {
        backgroundColor: "#5DB075",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
