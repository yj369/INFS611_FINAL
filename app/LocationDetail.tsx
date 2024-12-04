import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function LocationDetail() {
    const params = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState('Overview');

    // Parse data from params
    const gallery = params.gallery ? params.gallery.split(',') : [];
    const reviews = params.reviews
        ? (() => {
            try {
                return JSON.parse(params.reviews); // Parse reviews JSON string
            } catch {
                return []; // Fallback to empty array if parsing fails
            }
        })()
        : [];
    const rating = parseFloat(params.rating) || 0;
    const ratingCount = parseInt(params.ratingCount, 10) || 0;

    return (
        <View style={styles.container}>
            {/* Header Image */}
            <Image
                source={{
                    uri: gallery[0] || 'https://via.placeholder.com/600x300', // Fallback image
                }}
                style={styles.headerImage}
            />

            {/* Location Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{params.title || 'Unknown Location'}</Text>
                <View style={styles.locationContainer}>
                    <MaterialIcons name="location-pin" size={16} color="#6E6E6E" />
                    <Text style={styles.locationText}>{params.location || 'Unknown Location'}</Text>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                    <MaterialIcons name="favorite-border" size={24} color="#6E6E6E" />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {['Overview', 'Gallery', 'Reviews'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            activeTab === tab ? styles.activeTab : null,
                        ]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab ? styles.activeTabText : null,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content Section */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {activeTab === 'Overview' && (
                    <View>
                        <View style={styles.ratingContainer}>
                            {[...Array(Math.floor(rating))].map((_, i) => (
                                <MaterialIcons key={i} name="star" size={18} color="#FFD700" />
                            ))}
                            {rating % 1 !== 0 && (
                                <MaterialIcons name="star-half" size={18} color="#FFD700" />
                            )}
                            <Text style={styles.ratingText}>
                                {rating} ({ratingCount} views)
                            </Text>
                        </View>
                        <Text style={styles.overviewTitle}>WHY GO NOW:</Text>
                        <Text style={styles.overviewText}>{params.whyGo || 'No details available.'}</Text>
                    </View>
                )}
                {activeTab === 'Gallery' && (
                    <View style={styles.galleryContainer}>
                        {gallery.length > 0 ? (
                            gallery.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image }}
                                    style={styles.galleryImage}
                                />
                            ))
                        ) : (
                            <Text>No images available.</Text>
                        )}
                    </View>
                )}
                {activeTab === 'Reviews' && (
                    <View style={styles.reviewsContainer}>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <View key={index} style={styles.review}>
                                    <Text style={styles.reviewUser}>{review.user || 'Anonymous'}:</Text>
                                    <Text style={styles.reviewText}>{review.text || 'No review text.'}</Text>
                                </View>
                            ))
                        ) : (
                            <Text>No reviews available.</Text>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerImage: {
        width: '100%',
        height: 250,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    detailsContainer: {
        position: 'relative',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    locationText: {
        fontSize: 14,
        color: '#6E6E6E',
    },
    favoriteButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    tab: {
        paddingVertical: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    tabText: {
        fontSize: 14,
        color: '#6E6E6E',
    },
    activeTabText: {
        color: '#000',
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingHorizontal: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#6E6E6E',
    },
    overviewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    overviewText: {
        fontSize: 14,
        marginTop: 8,
        color: '#6E6E6E',
        lineHeight: 20,
    },
    galleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    galleryImage: {
        width: '48%',
        height: 150,
        marginBottom: 8,
        borderRadius: 8,
    },
    reviewsContainer: {
        marginTop: 16,
    },
    review: {
        marginBottom: 16,
    },
    reviewUser: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    reviewText: {
        fontSize: 14,
        color: '#6E6E6E',
    },
});
