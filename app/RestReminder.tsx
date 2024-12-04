import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Accelerometer } from "expo-sensors";
import { useRestReminder } from "./context/RestReminderContext";

export default function RestReminderPage(): JSX.Element {
    const {
        isEnabled,
        setIsEnabled,
        usageLimit,
        setUsageLimit,
        restDuration,
        setRestDuration,
        usageTime,
        resetUsageTime,
    } = useRestReminder();

    const [isFlipped, setIsFlipped] = useState<boolean>(false); // To track if the phone is flipped
    const [isResting, setIsResting] = useState<boolean>(false); // Track if rest is in progress
    const [remainingRestTime, setRemainingRestTime] = useState<number>(restDuration); // Rest timer state
    const [restTimer, setRestTimer] = useState<NodeJS.Timeout | null>(null); // Timer for rest period

    useEffect(() => {
        // Subscribe to the accelerometer
        const subscription = Accelerometer.addListener((data) => {
            const { x, y, z } = data;

            // Check if the phone is face down
            if (x > -0.5 && x < 0.5 && y > -0.5 && y < 0.5 && z < -0.7) {
                setIsFlipped(true);
            } else {
                setIsFlipped(false);
            }
        });

        return () => {
            subscription.remove();
            if (restTimer) clearInterval(restTimer);
        };
    }, [restTimer]);

    const startRest = () => {
        if (!isFlipped) return;

        setIsResting(true);
        setRemainingRestTime(restDuration);

        const timer = setInterval(() => {
            setRemainingRestTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    completeRest();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 60000); // Count down every minute

        setRestTimer(timer);
    };

    const completeRest = () => {
        setIsResting(false);
        setRemainingRestTime(restDuration); // Reset rest timer to default
        resetUsageTime(); // Reset usage time after rest completion
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Rest Reminder Settings</Text>

            {/* Enable/Disable Feature */}
            <View style={styles.row}>
                <Text style={styles.label}>Enable Rest Reminder</Text>
                <Switch
                    value={isEnabled}
                    onValueChange={(value) => setIsEnabled(value)}
                />
            </View>

            {/* Set Usage Limit */}
            <View style={styles.config}>
                <Text style={styles.label}>
                    Usage Limit: {usageLimit} minutes
                </Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={120}
                    step={5}
                    value={usageLimit}
                    onValueChange={(value) => setUsageLimit(value)}
                    minimumTrackTintColor="#5DB075"
                    maximumTrackTintColor="#ccc"
                    thumbTintColor="#5DB075"
                />
            </View>

            {/* Set Rest Duration */}
            <View style={styles.config}>
                <Text style={styles.label}>
                    Rest Duration: {restDuration} minutes
                </Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={30}
                    step={1}
                    value={restDuration}
                    onValueChange={(value) => setRestDuration(value)}
                    minimumTrackTintColor="#5DB075"
                    maximumTrackTintColor="#ccc"
                    thumbTintColor="#5DB075"
                />
            </View>

            {/* Current Usage */}
            <View style={styles.statusCard}>
                <Text style={styles.statusText}>
                    Current Usage: {usageTime} minutes
                </Text>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetUsageTime}
                >
                    <Text style={styles.resetButtonText}>Reset Usage</Text>
                </TouchableOpacity>
            </View>

            {/* Rest Status */}
            <View style={styles.restCard}>
                <Text style={styles.restHeader}>Rest Status</Text>
                {!isResting ? (
                    <View>
                        <Text style={styles.restInstruction}>
                            Place your phone face down to start resting.
                        </Text>
                        <Text
                            style={[
                                styles.restFeedback,
                                { color: isFlipped ? "green" : "red" },
                            ]}
                        >
                            {isFlipped
                                ? "Phone is flipped properly!"
                                : "Phone is not flipped properly."}
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.startButton,
                                { backgroundColor: isFlipped ? "#5DB075" : "#ccc" },
                            ]}
                            onPress={startRest}
                            disabled={!isFlipped}
                        >
                            <Text style={styles.startButtonText}>
                                Start Rest
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.restInstruction}>
                            Resting... Please keep your phone face down.
                        </Text>
                        <Text style={styles.restTimer}>
                            Time Remaining: {remainingRestTime}{" "}
                            {remainingRestTime === 1 ? "minute" : "minutes"}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    config: {
        marginBottom: 16,
    },
    slider: {
        width: "100%",
        height: 40,
    },
    statusCard: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginTop: 16,
        alignItems: "center",
    },
    statusText: {
        fontSize: 16,
        marginBottom: 8,
    },
    resetButton: {
        backgroundColor: "#5DB075",
        padding: 10,
        borderRadius: 8,
    },
    resetButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    restCard: {
        padding: 16,
        backgroundColor: "#e8f5e9",
        borderRadius: 8,
        marginTop: 16,
    },
    restHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    restInstruction: {
        fontSize: 16,
        marginBottom: 8,
    },
    restFeedback: {
        fontSize: 16,
        marginBottom: 16,
        fontWeight: "bold",
    },
    restTimer: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: "bold",
    },
    startButton: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    startButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
