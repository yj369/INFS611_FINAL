import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function JumpingJackTracker() {
    const [jumpCount, setJumpCount] = useState(0);
    const [lastZ, setLastZ] = useState(null);
    const [isJumping, setIsJumping] = useState(false);
    const [isSwinging, setIsSwinging] = useState(false);

    useEffect(() => {
        let accelerometerSubscription;
        let gyroscopeSubscription;

        const startTracking = () => {
            // Monitor accelerometer for vertical motion
            accelerometerSubscription = Accelerometer.addListener(({ z }) => {
                if (lastZ !== null && Math.abs(lastZ - z) > 0.8) {
                    setIsJumping(true);
                } else {
                    setIsJumping(false);
                }
                setLastZ(z);
            });

            // Monitor gyroscope for arm swings
            gyroscopeSubscription = Gyroscope.addListener(({ x, y }) => {
                if (Math.abs(x) > 1.0 || Math.abs(y) > 1.0) {
                    setIsSwinging(true);
                } else {
                    setIsSwinging(false);
                }
            });

            // Set sensor update intervals
            Accelerometer.setUpdateInterval(100);
            Gyroscope.setUpdateInterval(100);
        };

        startTracking();

        const checkJumpingJack = setInterval(() => {
            // If both jumping and swinging are detected, count as a jumping jack
            if (isJumping && isSwinging) {
                setJumpCount((prev) => prev + 1);
            }
        }, 500);

        return () => {
            if (accelerometerSubscription) accelerometerSubscription.remove();
            if (gyroscopeSubscription) gyroscopeSubscription.remove();
            clearInterval(checkJumpingJack);
        };
    }, [isJumping, isSwinging, lastZ]);

    return (
        <View>
            <Text style={styles.text}>Jumping Jacks: {jumpCount}</Text>
            <Text style={styles.otherText}>Jumping: {isJumping ? 'Yes' : 'No'}</Text>
            <Text style={styles.otherText}>Arm Swinging: {isSwinging ? 'Yes' : 'No'}</Text>
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