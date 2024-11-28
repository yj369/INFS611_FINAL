import { Stack } from 'expo-router';
import EnvironmentalAwareness from "@/app/EnvironmentalAwareness";
import RestReminder from "@/app/RestReminder";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="MorningExercisePage" options={{ title: 'Morning Exercise' }} />
            <Stack.Screen name="LocationCheckIn" options={{ title: 'Location Checkin' }} />
            <Stack.Screen name="EnvironmentalAwareness" options={{ title: 'Environmental Awareness' }} />
            <Stack.Screen name="RestReminder" options={{ title: 'Rest Reminder' }} />
        </Stack>
    );
}
