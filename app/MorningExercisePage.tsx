import {Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

export default function MorningExerciseScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.pageHeader}>
                <Text style={styles.title}>Morning Exercise</Text>
                <Text style={styles.subTitle}>Morning Exercise</Text>
            </View>
            <TouchableOpacity style={styles.item}>
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1640717214466-89c67fc37e05?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                    style={styles.background}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.itemText}>Running</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <View style={styles.item}>
                    <Text style={styles.itemText}>Push Up</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(249, 250, 255)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        gap:20,
    },
    pageHeader: {
        width: '100%',
        height: 80,
    },
    title: {
        color: '#646cff',
        fontSize: 30,
    },
    item: {
        width: '100%',
        height: 220,
        // backgroundColor: '#fff',
        borderRadius: 10,
        cursor: "pointer",
        boxShadow: '0 0 30px rgba(231, 237, 255, 0.3), 0 0 30px rgba(211, 220, 248, .3)',
    },
    itemText: {
        color: '#fff',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
    },
});