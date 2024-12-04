import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LightSensor } from "expo-sensors";
import * as Location from "expo-location";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function OutdoorActivityTracker() {
    const [lightLevel, setLightLevel] = useState(null);
    const [nearbyParks, setNearbyParks] = useState([]);
    const [outdoorTime, setOutdoorTime] = useState(0);
    const [activities, setActivities] = useState([]);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Request permissions for location
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            // Start location updates
            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                    findNearbyParks(newLocation.coords);
                }
            );
        })();

        // Activate the light sensor
        const subscription = LightSensor.addListener((data) => {
            setLightLevel(data.illuminance); // Read light level in lux
        });

        return () => {
            subscription.remove(); // Unsubscribe on unmount
        };
    }, []);

    const findNearbyParks = (currentLocation) => {
        const parks = [
            { name: "Central Park", distance: 500 },
            { name: "Hidden Oaks Nature Center", distance: 1200 },
        ];

        const nearby = parks.filter((park) => park.distance <= 1000); // Within 1km
        setNearbyParks(nearby);
    };

    const startOutdoorActivity = () => {
        setOutdoorTime((prev) => prev + 30); // Add 30 mins for simplicity
        setActivities([
            ...activities,
            { id: activities.length + 1, name: "Walking", time: 30 },
        ]);
    };

    const renderActivity = ({ item }) => (
        <View style={styles.activity}>
            <Text>{item.name}</Text>
            <Text>{item.time} mins</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Outdoor Activity Encouragement</Text>
            <Text style={styles.subHeader}>
                Track your environment for healthy outdoor activities.
            </Text>

            {/* Light and Location Status */}
            <View style={styles.statusCard}>
                <Text style={styles.statusText}>
                    Light Level:{" "}
                    {lightLevel !== null
                        ? lightLevel > 50
                            ? "Bright (✓)"
                            : "Dim"
                        : "Loading..."}
                </Text>
                <Text style={styles.statusText}>
                    Nearby Parks:{" "}
                    {nearbyParks.length > 0
                        ? nearbyParks.map((park) => park?.name).join(", ")
                        : "None Nearby"}
                </Text>
            </View>

            {/* Encouragement Message */}
            <View style={styles.encouragementCard}>
                <Text style={styles.encouragementText}>
                    {lightLevel !== null && lightLevel > 50 && nearbyParks.length > 0
                        ? "✅ Great time to go outdoors! Suggested Activity: Take a walk"
                        : "Conditions are not ideal for outdoor activities. Please check later."}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={startOutdoorActivity}
                    disabled={!(lightLevel && lightLevel > 50 && nearbyParks.length > 0)}
                >
                    <Text style={styles.buttonText}>Start Activity</Text>
                </TouchableOpacity>
            </View>

            {/* Progress Tracker */}
            <View style={styles.progressCard}>
                <Text style={styles.progressText}>Time Spent Outdoors:</Text>
                <AnimatedCircularProgress
                    size={150}
                    width={10}
                    fill={(outdoorTime / 60) * 100}
                    tintColor="#5DB075"
                    backgroundColor="#e0e0e0"
                >
                    {(fill) => (
                        <Text style={styles.progressTime}>{outdoorTime} mins</Text>
                    )}
                </AnimatedCircularProgress>
            </View>

            {/* Activity Log */}
            <Text style={styles.activityHeader}>Activity Log:</Text>
            <FlatList
                data={activities}
                renderItem={renderActivity}
                keyExtractor={(item) => item.id.toString()}
                style={styles.activityList}
            />
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
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 16,
        color: "#6e6e6e",
        marginBottom: 16,
    },
    statusCard: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 16,
    },
    statusText: {
        fontSize: 16,
        marginBottom: 8,
    },
    encouragementCard: {
        padding: 16,
        backgroundColor: "#e8f5e9",
        borderRadius: 8,
        marginBottom: 16,
    },
    encouragementText: {
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#5DB075",
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    progressCard: {
        alignItems: "center",
        marginBottom: 16,
    },
    progressText: {
        fontSize: 16,
        marginBottom: 8,
    },
    progressTime: {
        fontSize: 18,
        fontWeight: "bold",
    },
    activityHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    activityList: {
        marginBottom: 16,
    },
    activity: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 8,
    },
});
