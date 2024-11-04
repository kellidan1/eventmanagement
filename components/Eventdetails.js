import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
export default function DisplayEventDetails({ route }) {

    const { event } = route.params;
    const imageSource = require('../assets/images/favicon.png');
    console.log(event);

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.eventImage} />
            <Text style={styles.eventTitle}>{event.name}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <Text style={styles.eventStartTime}>
                Date: {new Date(event.timings.startTime).toLocaleDateString('en-GB')}
            </Text>
            <Text style={styles.eventStartTime}>
                Start Time: {new Date(event.timings.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </Text>
            <Text style={styles.eventEndTime}>
                End Time: {new Date(event.timings.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </Text>


            <Text style={styles.eventVenue}>Venue Name: {event.venue.name}</Text>
            <Text style={styles.eventVenue}>Venue Location: {event.venue.location}</Text>
            <Text style={styles.eventVenue}>Venue Capacity: {event.venue.capacity}</Text>
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
    eventTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventDescription: {
        fontSize: 16,
        marginBottom: 8,
    },
    eventStartTime: {
        fontSize: 14,
        marginBottom: 4,
    },
    eventEndTime: {
        fontSize: 14,
        marginBottom: 4,
    },
    eventVenue: {
        fontSize: 14,
        marginBottom: 8,
    },
    eventSubEvents: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    eventSubEvent: {
        fontSize: 14,
    },
});