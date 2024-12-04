import { Accelerometer } from 'expo-sensors';
import { useState, useEffect } from 'react';
import {StyleSheet, Text} from "react-native";


export default function PushUpTracker() {
    const [pushUps, setPushUps] = useState(0);
    const [isDown, setIsDown] = useState(false);

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);

        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const magnitude = Math.sqrt(x * x + y * y + z * z);

            if (magnitude > 1.2 && !isDown) {
                // Detect downward phase
                setIsDown(true);
            } else if (magnitude < 1.0 && isDown) {
                setPushUps(prev => prev + 1);
                setIsDown(false);
            }
        });

        return () => subscription.remove();
    }, [isDown]);

    return <Text style={styles.text}>Push-ups: {pushUps}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontSize:20,
        marginTop: 100
    }
})