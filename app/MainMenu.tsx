import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

export default function Menu() {

    const router = useRouter();

    return (
        <View style={styles.container}>

            <View style={styles.row}>
                <TouchableOpacity style={[styles.card, styles.lightPurple]} onPress={() => router.push('/MorningExercisePage')}>
                    <MaterialIcons name="directions-run" size={24} color="black" />
                    <Text style={styles.title}>Morning Exercise</Text>
                    <Text style={styles.description}>Rise, move, and shine – start your day strong!r</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, styles.lightGreen]} onPress={() => router.push('/LocationCheckIn')}>
                    <MaterialIcons name="radio-button-checked" size={24} color="black" />
                    <Text style={styles.title}>Location Check-in</Text>
                    <Text style={styles.description}>You’re here, make it count!</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={[styles.card, styles.lightYellow]} onPress={() => router.push('/EnvironmentalAwareness')}>
                    <MaterialIcons name="sunny" size={24} color="black" />
                    <Text style={styles.title}>Environment Awareness</Text>
                    <Text style={styles.description}>Step Outside, Shine Within – Embrace the Outdoors Today!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, styles.lightGray]} onPress={() => router.push('/RestReminder')}>
                    <MaterialIcons name="phone-iphone" size={24} color="black" />
                    <Text style={styles.title}>Rest Reminder</Text>
                    <Text style={styles.description}>Pause, recharge, and thrive.</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        padding: 16,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        width: '100%',
        height: 130,
        flex: 1,
        marginHorizontal: 8,
        padding: 16,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    lightPurple: {
        backgroundColor: '#F3F0FC',
    },
    lightGreen: {
        backgroundColor: '#EAF7E7',
    },
    lightYellow: {
        backgroundColor: '#FFF9F1',
    },
    lightGray: {
        backgroundColor: '#F7F8F9',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 4,
        color: '#6E6E6E',
    },
});