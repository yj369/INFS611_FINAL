import {Text, View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

const dataList = [
    {
        id: 1,
        title: "Running",
        duration: 20,
        category: "Cardio Activities",
        level: "easy",
        image: "https://images.pexels.com/photos/1465893/pexels-photo-1465893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 2,
        title: "Push-ups",
        duration: 10,
        category: "Strength Training",
        level: "easy",
        image: "https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 3,
        title: "Jumping Jacks",
        duration: 15,
        category: "Cardio Activities",
        level: "easy",
        image: "https://images.pexels.com/photos/8860964/pexels-photo-8860964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 4,
        title: "Squats",
        duration: 10,
        category: "Strength Training",
        level: "easy",
        image: "https://images.pexels.com/photos/4164454/pexels-photo-4164454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 5,
        title: "Plank",
        duration: 5,
        category: "Core Strength",
        level: "easy",
        image: "https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
]

export default function MorningExerciseScreen() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground source={{ uri: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={styles.headerImage}>
                    <Text style={styles.pageTitle}>Yoga Club</Text>
                </ImageBackground>
            </View>

            <ScrollView contentContainerStyle={styles.poseList}>
                {dataList.map((pose) => (
                    <TouchableOpacity key={pose.id} style={styles.poseCard} onPress={() => router.push({pathname: '/WorkoutTimer', params: pose})}>
                        <Image source={{ uri: pose.image }} style={styles.poseImage} />
                        <View style={styles.poseInfo}>
                            <Text style={styles.poseDays}>{pose.category}</Text>
                            <Text style={styles.poseTitle}>{pose.title}</Text>
                            <View style={styles.poseDetails}>
                                <View style={styles.poseDetail}>
                                    <MaterialIcons name="access-time" size={16} color="#6E6E6E" />
                                    <Text style={styles.poseDetailText}>{pose.duration}</Text>
                                </View>
                                <View style={styles.poseDetail}>
                                    <MaterialIcons name="bubble-chart" size={16} color="#6E6E6E" />
                                    <Text style={styles.poseDetailText}>{pose.level}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    headerImage: {
        width: '100%',
        height: 280,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    poseList: {
        padding: 16,
    },
    poseCard: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    poseImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    poseInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    poseDays: {
        fontSize: 12,
        color: '#8E8E8E',
        backgroundColor: '#F3F3F3',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    poseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    poseDetails: {
        flexDirection: 'row',
        marginTop: 4,
    },
    poseDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    poseDetailText: {
        fontSize: 12,
        color: '#6E6E6E',
        marginLeft: 4,
    },
});