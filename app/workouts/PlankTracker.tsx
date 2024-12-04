import { Accelerometer } from 'expo-sensors';
import { useState, useEffect } from 'react';
import {StyleSheet, Text} from 'react-native';

export default function LoosePlankTracker() {
    const [isHolding, setIsHolding] = useState(true);
    const [movementCount, setMovementCount] = useState(0);

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);

        const accelerometerSubscription = Accelerometer.addListener(({ x, y, z }) => {
            const magnitude = Math.sqrt(x * x + y * y + z * z);

            if (magnitude > 1.1) {
                // Increment movement count for significant movement
                setMovementCount((prev) => prev + 1);
            } else {
                // Reset movement count when user stabilizes
                setMovementCount(0);
            }

            setIsHolding(movementCount < 5); // Allow up to 5 movements
        });

        return () => accelerometerSubscription.remove();
    }, [movementCount]);

    return (
        <Text style={styles.text}>Plank Status: {isHolding ? 'Keep Holding' : 'Moving'}</Text>
    );
}


const styles = StyleSheet.create({
    text: {
        fontSize:20,
        marginTop: 100
    }
})