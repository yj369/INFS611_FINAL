import { Accelerometer } from 'expo-sensors';
import { useState, useEffect } from 'react';
import { Text } from 'react-native';

export default function SquatTracker() {
    const [squatCount, setSquatCount] = useState(0);
    const [lastY, setLastY] = useState(null);

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);

        const subscription = Accelerometer.addListener(({ y }) => {
            if (lastY !== null && Math.abs(lastY - y) > 0.5) {
                setSquatCount(prev => prev + 1);
            }
            setLastY(y);
        });

        return () => subscription.remove();
    }, [lastY]);

    return <Text>Squats: {squatCount}</Text>;
}
