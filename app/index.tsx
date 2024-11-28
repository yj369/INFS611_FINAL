import { Text, View,  StyleSheet } from 'react-native';
import {Link} from "expo-router";

export default function HomePage() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home screen</Text>
            <Link href={'/MorningExercisePage'} style={styles.button}>Go To Morning Exercise</Link>
            <Link href={'/LocationCheckIn'} style={styles.button}>Location Check-in</Link>
            <Link href={'/EnvironmentalAwareness'} style={styles.button}>Environment Awareness</Link>
            <Link href={'/RestReminder'} style={styles.button}>Rest Reminder</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});
