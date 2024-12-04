import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Accelerometer } from 'expo-sensors';

const WorkoutTimer = () => {
    const initialTime = 600; // 600 seconds (10 minutes)
    const [timer, setTimer] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(true);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0 && interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, timer]);

    useEffect(() => {
        if (Platform.OS === 'web') {
            startListening();
        }
    }, []);

    const startListening = () => {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            console.error('Speech Recognition is not supported in this browser.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join('')
                .toLowerCase();

            console.log('Recognized Text:', transcript);

            if (transcript.includes('stop')) {
                setIsRunning(false);
                recognition.stop();
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech Recognition Error:', event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleRestart = () => {
        setTimer(initialTime);
        setIsRunning(true);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Barbell Bench Press</Text>

            <AnimatedCircularProgress
                size={200}
                width={12}
                fill={(timer / initialTime) * 100}
                tintColor="#5DB9F0"
                backgroundColor="#E6E6E6"
                lineCap="round"
            >
                {(fill) => (
                    <Text style={styles.timerText}>
                        {formatTime(timer)}
                    </Text>
                )}
            </AnimatedCircularProgress>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
                    <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleRestart}
                    disabled={isRunning}
                >
                    <Text style={styles.buttonText}>Restart</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.nextExercise}>Next: Split Squat</Text>
            <Text style={styles.nextExerciseSubtitle}>1 Step Up with Hip & Heel</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 32,
    },
    stopButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginHorizontal: 8,
    },
    nextButton: {
        backgroundColor: '#E6E6E6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginHorizontal: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextExercise: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 24,
    },
    nextExerciseSubtitle: {
        fontSize: 14,
        color: '#6E6E6E',
        marginTop: 4,
    },
});

export default WorkoutTimer;
