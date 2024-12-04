import React, { useEffect, useState } from "react";
import {Text, StyleSheet, Image, TouchableOpacity,SectionList,} from "react-native";
import * as Location from "expo-location";
import {router} from "expo-router";

const locations = [
    {
        name: "Hidden Oaks Nature Center",
        latitude: 38.8305,
        longitude: -77.2189,
        radius: 1500,
        description: "A nature center offering educational programs and trails.",
        price: "Free",
        type: "Park",
        image: "https://fairfaxmasternaturalists.org/wp-content/uploads/2022/07/A4D07789-DCA7-4160-AA5B-0484CF2113E0-scaled.jpeg",
        ui: {
            title: "Hidden Oaks Nature Center",
            location: "Annandale, VA",
            rating: 4.5,
            ratingCount: 120,
            whyGo: "A tranquil spot for educational programs and nature enthusiasts.",
            gallery: [
                "https://fairfaxmasternaturalists.org/wp-content/uploads/2022/07/A4D07789-DCA7-4160-AA5B-0484CF2113E0-scaled.jpeg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Alice", text: "Beautiful place for a walk!" },
                { user: "Bob", text: "Educational programs are great!" },
            ],
        }
    },
    {
        name: "Annandale Farmers Market",
        latitude: 38.8308,
        longitude: -77.1967,
        radius: 1000,
        description: "A local market offering fresh produce and goods.",
        price: "Free",
        type: "Market",
        image: "https://www.annandalefarmersmarket.com/uploads/1/3/6/4/136425763/the-community-enjoying-buying-fresh-local-food-at-the-annandale-farmers-market-in-central-minnesota_orig.png",
        ui: {
            title: "Annandale Farmers Market",
            location: "Annandale, VA",
            rating: 4.7,
            ratingCount: 230,
            whyGo: "Perfect for fresh, local produce and community vibes.",
            gallery: [
                "https://www.annandalefarmersmarket.com/uploads/1/3/6/4/136425763/the-community-enjoying-buying-fresh-local-food-at-the-annandale-farmers-market-in-central-minnesota_orig.png",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Charlie", text: "Great selection of produce!" },
                { user: "Dana", text: "Love the atmosphere." },
            ],
        }
    },
    {
        name: "The Block",
        latitude: 38.8316,
        longitude: -77.1886,
        radius: 500,
        description: "A trendy food hall with various eateries",
        price: "Varies",
        type: "Restaurant",
        image: "https://cdn.vox-cdn.com/thumbor/nFbT1wajTWat6i8AqxHql5xOfh8=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9676025/The_Block_VA_interior.jpg",
        ui: {
            title: "The Block",
            location: "Annandale, VA",
            rating: 4.8,
            ratingCount: 410,
            whyGo: "Explore a variety of food options under one roof.",
            gallery: [
                "https://cdn.vox-cdn.com/thumbor/nFbT1wajTWat6i8AqxHql5xOfh8=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9676025/The_Block_VA_interior.jpg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Eve", text: "Amazing food options!" },
                { user: "Frank", text: "Love the vibe here." },
            ],
        }
    },
    {
        name: "Mason District Park",
        latitude: 38.8473,
        longitude: -77.1539,
        radius: 2000,
        description: "A park with athletic fields, trails, and an amphitheater.",
        price: "Free",
        type: "Park",
        image: "https://www.fairfaxcounty.gov/parks/sites/parks/files/Assets/images/picnics/mason_theater.jpg",
        ui: {
            title: "Mason District Park",
            location: "Annandale, VA",
            rating: 4.6,
            ratingCount: 310,
            whyGo: "Enjoy outdoor activities and live performances.",
            gallery: [
                "https://www.fairfaxcounty.gov/parks/sites/parks/files/Assets/images/picnics/mason_theater.jpg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Grace", text: "Great park for families!" },
                { user: "Hank", text: "The amphitheater is awesome!" },
            ],
        }
    },
    {
        name: "Audrey Moore RECenter",
        latitude: 38.8184,
        longitude: -77.2361,
        radius: 1500,
        description: "A recreational center with swimming and fitness facilities.",
        price: "$8.00",
        type: "Recreation",
        image: "https://annandaletoday.com/wp-content/uploads/2018/05/pool.jpg",
        ui: {
            title: "Audrey Moore RECenter",
            location: "Annandale, VA",
            rating: 4.4,
            ratingCount: 190,
            whyGo: "A great place for swimming and fitness enthusiasts.",
            gallery: [
                "https://annandaletoday.com/wp-content/uploads/2018/05/pool.jpg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Ivy", text: "The pool is clean and spacious." },
                { user: "Jack", text: "Affordable fitness options." },
            ],
        }
    },
    {
        name: "Wakefield Skatepark",
        latitude: 38.8189,
        longitude: -77.2365,
        radius: 1000,
        description: "A skatepark suitable for various skill levels.",
        price: "Free",
        type: "Recreation",
        image: "https://www.ffxnow.com/files/2022/06/Screen-Shot-2022-06-02-at-9.49.46-AM-e1654178154856.jpg",
        ui: {
            title: "Wakefield Skatepark",
            location: "Annandale, VA",
            rating: 4.3,
            ratingCount: 150,
            whyGo: "An excellent spot for skating enthusiasts of all levels.",
            gallery: [
                "https://www.ffxnow.com/files/2022/06/Screen-Shot-2022-06-02-at-9.49.46-AM-e1654178154856.jpg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Kyle", text: "Great place to practice tricks!" },
                { user: "Liam", text: "Good crowd and atmosphere." },
            ],
        }
    },
    {
        name: "Annandale Shopping Center",
        latitude: 38.8301,
        longitude: -77.1964,
        radius: 1000,
        description: "A shopping center with various retail stores.",
        price: "Varies",
        type: "Shopping",
        image: "https://www.annandalechamber.com/Endeavor/Members/ALDI%20and%20ASC/_imagecache/AnnandaleShoppingCenterSept14.jpg",
        ui: {
            title: "Annandale Shopping Center",
            location: "Annandale, VA",
            rating: 4.2,
            ratingCount: 200,
            whyGo: "Convenient shopping with a variety of retail options.",
            gallery: [
                "https://www.annandalechamber.com/Endeavor/Members/ALDI%20and%20ASC/_imagecache/AnnandaleShoppingCenterSept14.jpg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Mia", text: "A nice mix of stores!" },
                { user: "Noah", text: "Convenient location and parking." },
            ],
        }
    },
    {
        name: "Broyhill Crest Recreation Club",
        latitude: 38.8382,
        longitude: -77.1978,
        radius: 1000,
        description: "A community pool and recreation area.",
        price: "Membership Required",
        type: "Recreation",
        image: "https://broyhillcrestpool.net/wp-content/uploads/2021/06/floatnight6-scaled.jpeg",
        ui: {
            title: "Broyhill Crest Recreation Club",
            location: "Annandale, VA",
            rating: 4.6,
            ratingCount: 95,
            whyGo: "Relax at a community-friendly pool and recreation spot.",
            gallery: [
                "https://broyhillcrestpool.net/wp-content/uploads/2021/06/floatnight6-scaled.jpeg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Olivia", text: "Membership is worth it!" },
                { user: "Paul", text: "Perfect for family time." },
            ],
        }
    },
    {
        name: "Pinecrest Golf Course",
        latitude: 38.8386,
        longitude: -77.1523,
        radius: 2000,
        description: "A public golf course with nine holes.",
        price: "$25.00",
        type: "Golf",
        image: "https://www.pinecresthuntley.com/media/widgetkit/course_20-2980f1c71286ae690fabcba18ed1beb1.jpg",
        ui: {
            title: "Pinecrest Golf Course",
            location: "Annandale, VA",
            rating: 4.4,
            ratingCount: 80,
            whyGo: "Enjoy a relaxing day on a well-maintained public golf course.",
            gallery: [
                "https://www.pinecresthuntley.com/media/widgetkit/course_20-2980f1c71286ae690fabcba18ed1beb1.jpg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Quinn", text: "Well-kept and enjoyable!" },
                { user: "Riley", text: "Affordable and scenic." },
            ],
        }
    },
    {
        name: "Annandale Volunteer Fire Department",
        latitude: 38.8307,
        longitude: -77.1968,
        radius: 500,
        description: "Local fire department serving the community.",
        price: "Free",
        type: "Service",
        image: "https://photos.smugmug.com/Pre-digital/Virginia-Scanned-Photographs/Clarke-and-Culpeper-County-scans/i-FqBW8wB/0/NG37QxzfHgdPQjfJ3kGbkPDDn7wPQt9xDnLGC5xBS/M/fullsizeoutput_2178-M.jpg",
        ui: {
            title: "Annandale Volunteer Fire Department",
            location: "Annandale, VA",
            rating: 4.8,
            ratingCount: 45,
            whyGo: "Learn about the essential services provided by the local fire department.",
            gallery: [
                "https://photos.smugmug.com/Pre-digital/Virginia-Scanned-Photographs/Clarke-and-Culpeper-County-scans/i-FqBW8wB/0/NG37QxzfHgdPQjfJ3kGbkPDDn7wPQt9xDnLGC5xBS/M/fullsizeoutput_2178-M.jpg",
                "https://via.placeholder.com/300x200",
            ],
            reviews: [
                { user: "Sophia", text: "Great community service!" },
                { user: "Tom", text: "The fire safety workshop was amazing." },
            ],
        }
    }
]


export default function LocationCheckIn() {
    const [location, setLocation] = useState(null);
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [recommendations, setRecommendations] = useState(locations);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                    updateNearbyLocations(newLocation.coords);
                }
            );
        })();
    }, []);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371e3; // Earth radius in meters
        const φ1 = toRad(lat1);
        const φ2 = toRad(lat2);
        const Δφ = toRad(lat2 - lat1);
        const Δλ = toRad(lon2 - lon1);

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    const updateNearbyLocations = (currentLocation) => {
        if (!currentLocation) return;

        const nearby = locations.filter((place) => {
            const distance = getDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                place.latitude,
                place.longitude
            );

            console.log(
                `Checking ${place.name}: Distance = ${distance}, Radius = ${place.radius}`
            );

            return distance <= place.radius;
        });

        console.log("Nearby Locations Found:", nearby);

        const remainingRecommendations = locations.filter(
            (place) => !nearby.includes(place)
        );

        setNearbyLocations(nearby);
        setRecommendations(remainingRecommendations);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: "/LocationDetail", params:{
            title: item.ui.title,
            location: item.ui.location,
            image: item.image,
            rating: item.ui.rating,
            ratingCount: item.ui.ratingCount,
            gallery: item.ui.gallery.join(','),
            reviews: JSON.stringify(item.ui.reviews),
            whyGo: item.ui.whyGo,
        }})}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardType}>{item.type}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    const sections = [
        {
            title: "Nearby Locations",
            data: nearbyLocations,
        },
        {
            title: "Recommended Locations",
            data: recommendations,
        },
    ];

    return (
        <SectionList
            sections={sections}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
            ListEmptyComponent={
                <Text style={styles.noNearbyText}>
                    No locations available.
                </Text>
            }
        />
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 8,
        marginLeft: 16,
    },
    noNearbyText: {
        fontSize: 16,
        color: "#6E6E6E",
        textAlign: "center",
        marginTop: 16,
    },
    card: {
        backgroundColor: "#fff",
        marginBottom: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: "hidden",
        marginHorizontal: 16,
    },
    cardImage: {
        width: "100%",
        height: 200,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
        marginHorizontal: 16,
    },
    cardType: {
        fontSize: 14,
        color: "#6E6E6E",
        marginTop: 4,
        marginHorizontal: 16,
        fontStyle: "italic",
    },
    cardDescription: {
        fontSize: 14,
        color: "#6E6E6E",
        marginBottom: 16,
        marginHorizontal: 16,
    },
});