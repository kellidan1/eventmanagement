import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DisplayVenueDetails() {
    const route = useRoute(); // use useRoute to access route parameters
    const { venue } = route.params; // destructure the venue parameter

    const imageSource = require('../assets/images/favicon.png');

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.eventImage} />
            <Text style={styles.eventVenue}>Venue Name: {venue.name}</Text>
            <Text style={styles.eventVenue}>Venue Location: {venue.location}</Text>
            <Text style={styles.eventVenue}>Venue Capacity: {venue.capacity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    eventImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
    },
    eventVenue: {
        fontSize: 14,
        marginBottom: 8,
    },
});
