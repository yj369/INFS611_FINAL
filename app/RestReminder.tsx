import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Accelerometer, Gyroscope } from "expo-sensors";

export default function RestReminder() {
    const [isUsingPhone, setIsUsingPhone] = useState(false);
    const [usageStartTime, setUsageStartTime] = useState(null);
    const [isResting, setIsResting] = useState(false);
    const [restStartTime, setRestStartTime] = useState(null);
    const [restLogged, setRestLogged] = useState(false);

    useEffect(() => {
        // Start monitoring accelerometer and gyroscope
        const accelerometerSubscription = Accelerometer.addListener((data) => {
            // Detect continuous phone movement
            if (Math.abs(data.x) > 0.2 || Math.abs(data.y) > 0.2 || Math.abs(data.z) > 0.2) {
                if (!isUsingPhone) {
                    setIsUsingPhone(true);
                    setUsageStartTime(new Date());
                }
            }
        });

        const gyroscopeSubscription = Gyroscope.addListener((data) => {
            // Check if phone is placed face down
            if (Math.abs(data.z) > 1 && Math.abs(data.x) < 0.2 && Math.abs(data.y) < 0.2) {
                if (!isResting && !restLogged) {
                    setIsResting(true);
                    setRestStartTime(new Date());
                }
            }
        });

        // Clear subscriptions when component unmounts
        return () => {
            accelerometerSubscription.remove();
            gyroscopeSubscription.remove();
        };
    }, [isUsingPhone, isResting, restLogged]);

    // Check for prolonged phone usage
    useEffect(() => {
        if (isUsingPhone && usageStartTime) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const elapsedTime = Math.floor((currentTime - usageStartTime) / 1000 / 60); // in minutes

                if (elapsedTime >= 30) {
                    Alert.alert(
                        "Time for a Break!",
                        "You’ve been using your phone for over 30 minutes. Place it face down to take a break."
                    );
                    clearInterval(interval);
                }
            }, 1000); // Check every second

            return () => clearInterval(interval);
        }
    }, [isUsingPhone, usageStartTime]);

    // Check for resting period
    useEffect(() => {
        if (isResting && restStartTime) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const restDuration = Math.floor((currentTime - restStartTime) / 1000 / 60); // in minutes

                if (restDuration >= 10) {
                    Alert.alert("Rest Completed!", "Your 10-minute break is logged.");
                    setRestLogged(true);
                    setIsResting(false);
                    clearInterval(interval);
                }
            }, 1000); // Check every second

            return () => clearInterval(interval);
        }
    }, [isResting, restStartTime]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Rest Reminder</Text>
            <Text>Phone Usage: {isUsingPhone ? "Active" : "Inactive"}</Text>
            {isUsingPhone && usageStartTime && (
                <Text>
                    Using phone since: {usageStartTime.toLocaleTimeString()}
                </Text>
            )}
            <Text>Rest Status: {isResting ? "Resting" : "Not Resting"}</Text>
            {isResting && restStartTime && (
                <Text>
                    Rest started at: {restStartTime.toLocaleTimeString()}
                </Text>
            )}
            <Text>
                Rest Logged: {restLogged ? "Yes, break logged" : "No, still active"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});
