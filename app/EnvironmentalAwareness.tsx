import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Location from "expo-location";
import { LightSensor } from "expo-sensors";
import * as Notifications from "expo-notifications";

// Predefined outdoor locations (e.g., parks)
const parks = [
    {
        name: "Central Park",
        latitude: 38.8314083,
        longitude: -77.3111517,
        radius: 200,
    },
    {
        name: "Golden Gate Park",
        latitude: 37.76904,
        longitude: -122.483519,
        radius: 200,
    },
];

export default function EnvironmentalAwareness() {
    const [lightLevel, setLightLevel] = useState(null);
    const [location, setLocation] = useState(null);
    const [nearPark, setNearPark] = useState(null);
    const [outdoorStartTime, setOutdoorStartTime] = useState(null);
    const [timeSpentOutdoors, setTimeSpentOutdoors] = useState(0);

    useEffect(() => {
        // Request location permissions
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied.");
                return;
            }

            // Start monitoring location
            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                    checkProximityToParks(newLocation.coords);
                }
            );
        })();

        // Start monitoring light sensor
        const subscription = LightSensor.addListener((data) => {
            setLightLevel(data.illuminance);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // Check if user is near a park
    const checkProximityToParks = (currentLocation) => {
        parks.forEach((park) => {
            const distance = getDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                park.latitude,
                park.longitude
            );

            if (distance <= park.radius) {
                setNearPark(park);
            }
        });
    };

    // Haversine formula to calculate distance
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371e3; // Earth radius in meters
        const φ1 = toRad(lat1);
        const φ2 = toRad(lat2);
        const Δφ = toRad(lat2 - lat1);
        const Δλ = toRad(lon2 - lon1);

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    // Send notification if conditions are optimal
    useEffect(() => {
        if (lightLevel && lightLevel > 1000 && nearPark) {
            console.log(">>>>>> nearPark.name");
            sendNotification(nearPark.name);
            if (!outdoorStartTime) {
                setOutdoorStartTime(new Date());
            }
        } else if (outdoorStartTime) {
            // Calculate time spent outdoors
            const endTime = new Date();
            const duration = Math.floor((endTime - outdoorStartTime) / 1000 / 60); // Convert to minutes
            setTimeSpentOutdoors((prev) => prev + duration);
            setOutdoorStartTime(null);
        }
    }, [lightLevel, nearPark]);

    // Send notification
    const sendNotification = async (parkName) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Great Outdoor Conditions!",
                body: `You are near ${parkName}. It's bright enough for outdoor activities. Enjoy some time outdoors!`,
            },
            trigger: null,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Environmental Awareness Task</Text>
            <Text>
                Light Level: {lightLevel ? `${lightLevel} lux` : "Fetching..."}
            </Text>
            <Text>
                Location:{" "}
                {location
                    ? `Lat: ${location.latitude}, Lon: ${location.longitude}`
                    : "Fetching..."}
            </Text>
            <Text>
                Near Park: {nearPark ? nearPark.name : "Not near any predefined parks"}
            </Text>
            <Text>
                Time Spent Outdoors: {timeSpentOutdoors} minutes
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
