import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import * as Location from "expo-location";

const locations = [
    {
        name: "Eiffel Tower",
        latitude: 37.4219983,
        longitude: -122.0839,
        radius: 100,
        description: "A famous landmark in Paris.",
    },
    {
        name: "Central Park",
        latitude: 40.785091,
        longitude: -73.968285,
        radius: 200, // in meters
        description: "A large urban park in New York City.",
    },
];


export default function LocationCheckIn() {
    const [location, setLocation] = useState(null);
    const [checkedIn, setCheckedIn] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        // Request permissions and start location tracking
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Start watching the location
            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                    checkGeofence(newLocation.coords);
                }
            );
        })();
    }, []);

    // Check if the user is within any geofenced area
    const checkGeofence = (currentLocation) => {
        locations.forEach((place) => {
            const distance = getDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                place.latitude,
                place.longitude
            );

            console.log(distance, place.radius);

            if (distance <= place.radius) {
                setCheckedIn(place);
            }
        });
    };

    // Haversine formula to calculate the distance between two coordinates
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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Landmark Check-In</Text>
            {errorMsg ? (
                <Text>{errorMsg}</Text>
            ) : (
                <>
                    <Text>
                        Current Location:{" "}
                        {location
                            ? `Lat: ${location?.latitude}, Lon: ${location?.longitude}`
                            : "Fetching..."}
                    </Text>
                    {checkedIn ? (
                        <View style={styles.checkIn}>
                            <Text>You've checked in at {checkedIn?.name}!</Text>
                            <Text>{checkedIn?.description}</Text>
                        </View>
                    ) : (
                        <Text>No check-ins yet.</Text>
                    )}
                </>
            )}
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
    checkIn: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#e0ffe0",
        borderRadius: 10,
    },
});
