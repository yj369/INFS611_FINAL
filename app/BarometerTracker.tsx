import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Slider from "@react-native-community/slider";
import { Barometer, Magnetometer, LightSensor } from "expo-sensors";

type SensorData = {
    id: string;
    name: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    description: string;
};

export default function SensorDashboard() {
    const [pressure, setPressure] = useState<number>(0);
    const [magnetometer, setMagnetometer] = useState<number[]>([0, 0, 0]);
    const [light, setLight] = useState<number>(0);
    const [ambientTemperature, setAmbientTemperature] = useState<number>(25); // Simulated ambient temperature
    const [proximity, setProximity] = useState<number>(5); // Simulated proximity
    const [relativeHumidity, setRelativeHumidity] = useState<number>(50); // Simulated humidity

    // Sensors state dynamically computed from individual states
    const sensors: SensorData[] = [
        {
            id: "1",
            name: "Ambient Temperature",
            value: ambientTemperature,
            unit: "°C",
            min: -273.1,
            max: 100,
            description: "Current ambient temperature.",
        },
        {
            id: "2",
            name: "Magnetic Field",
            value: Math.sqrt(
                magnetometer[0] ** 2 +
                magnetometer[1] ** 2 +
                magnetometer[2] ** 2
            ),
            unit: "μT",
            min: 0,
            max: 100,
            description: "Magnetic field strength.",
        },
        {
            id: "3",
            name: "Proximity",
            value: proximity,
            unit: "cm",
            min: 0,
            max: 10,
            description: "Proximity to object.",
        },
        {
            id: "4",
            name: "Light",
            value: light,
            unit: "lux",
            min: 0,
            max: 40000,
            description: "Light intensity in lux.",
        },
        {
            id: "5",
            name: "Pressure",
            value: pressure,
            unit: "hPa",
            min: 0,
            max: 1100,
            description: "Atmospheric pressure.",
        },
        {
            id: "6",
            name: "Relative Humidity",
            value: relativeHumidity,
            unit: "%",
            min: 0,
            max: 100,
            description: "Relative humidity level.",
        },
    ];

    // Set up listeners for real-time sensor data updates
    useEffect(() => {
        // Barometer Listener
        const barometerSubscription = Barometer.addListener(({ pressure }) => {
            setPressure(pressure);
        });

        // Magnetometer Listener
        const magnetometerSubscription = Magnetometer.addListener((data) => {
            setMagnetometer([data.x, data.y, data.z]);
        });

        // Light Sensor Listener
        const lightSensorSubscription = LightSensor.addListener(({ illuminance }) => {
            setLight(illuminance);
        });

        return () => {
            barometerSubscription.remove();
            magnetometerSubscription.remove();
            lightSensorSubscription.remove();
        };
    }, []);

    const renderSensor = ({ item }: { item: SensorData }) => (
        <View style={styles.sensorContainer}>
            <Text style={styles.sensorName}>{item.name}</Text>
            <Text style={styles.sensorValue}>
                {item.value.toFixed(1)} {item.unit}
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={item.min}
                maximumValue={item.max}
                value={item.value}
                disabled
                minimumTrackTintColor="#00c4cc"
                maximumTrackTintColor="#ccc"
            />
            <Text style={styles.sensorDescription}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sensor Dashboard</Text>
            <FlatList
                data={sensors}
                renderItem={renderSensor}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                extraData={sensors} // Ensures FlatList re-renders when data changes
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
    },
    listContainer: {
        paddingBottom: 16,
    },
    sensorContainer: {
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sensorName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    sensorValue: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
        color: "#555",
    },
    slider: {
        width: "100%",
        height: 40,
    },
    sensorDescription: {
        fontSize: 14,
        marginTop: 8,
        color: "#777",
    },
});
