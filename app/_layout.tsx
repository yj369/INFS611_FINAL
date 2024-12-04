import { Stack } from 'expo-router';
import EnvironmentalAwareness from "@/app/EnvironmentalAwareness";
import RestReminder from "@/app/RestReminder";
import {RestReminderProvider} from "@/app/context/RestReminderContext";
import {PopupProvider} from "@/app/context/PopupContext";

export default function RootLayout() {
    return (
        <RestReminderProvider>
            <PopupProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }}  />
                    <Stack.Screen name="MorningExercisePage" options={{ title: 'Morning Exercise' }} />
                    <Stack.Screen name="LocationCheckIn" options={{ title: 'Location Checkin' }} />
                    <Stack.Screen name="EnvironmentalAwareness" options={{ title: 'Environmental Awareness' }} />
                    <Stack.Screen name="RestReminder" options={{ title: 'Rest Reminder' }} />
                    <Stack.Screen name="LocationDetail" options={{ title: 'Location Detail'}}/>
                </Stack>
            </PopupProvider>
        </RestReminderProvider>
    );
}
