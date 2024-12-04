import { Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';

function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    const R = 6371e3; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export default function RunningTracker() {
    const [distance, setDistance] = useState(0);
    const [lastPosition, setLastPosition] = useState(null);
    const [armSwing, setArmSwing] = useState(false);

    useEffect(() => {
        let locationSubscription;
        let accelerometerSubscription;

        const startTracking = async () => {
            // Request location permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Location permission not granted');
                return;
            }

            // Start watching the location
            locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000, // Update every second
                    distanceInterval: 1, // Minimum distance change in meters
                },
                (location) => {
                    const { latitude, longitude } = location.coords;

                    if (lastPosition) {
                        const dist = getDistanceFromLatLon(
                            lastPosition.latitude,
                            lastPosition.longitude,
                            latitude,
                            longitude
                        );
                        setDistance((prev) => prev + dist);
                    }
                    setLastPosition({ latitude, longitude });
                }
            );

            // Start monitoring accelerometer for arm swings
            accelerometerSubscription = Accelerometer.addListener(({ x, y }) => {
                if (Math.abs(x) > 0.5 || Math.abs(y) > 0.5) {
                    setArmSwing(true);
                }
            });

            Accelerometer.setUpdateInterval(100);
        };

        startTracking();

        return () => {
            if (locationSubscription) locationSubscription.remove();
            if (accelerometerSubscription) accelerometerSubscription.remove();
        };
    }, [lastPosition]);

    return (
        <View>
            <Text style={styles.text}>Distance: {distance.toFixed(2)} meters</Text>
            <Text style={styles.otherText}>Arm Swing Detected: {armSwing ? 'Yes' : 'No'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize:20,
        marginTop: 100
    },
    otherText: {
        fontSize:20,
        marginTop: 10
    }
})