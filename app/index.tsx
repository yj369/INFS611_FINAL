import { Text, View,  StyleSheet } from 'react-native';
import Menu from "@/app/MainMenu";
import {RestReminderProvider} from "@/app/context/RestReminderContext";
import {useRestReminderNotification} from "@/app/RestReminderNotification";
import BarometerTracker from "@/app/BarometerTracker";

export default function HomePage() {
    useRestReminderNotification();

    return (
        <RestReminderProvider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back!</Text>
                </View>
                <Menu />
                <BarometerTracker />
            </View>
        </RestReminderProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: '100%',
        height: 120,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    }
});
