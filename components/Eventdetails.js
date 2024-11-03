import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function DisplayEventDetails() {
    const event = {
        // Replace with retrieved event data from database
        name: 'Event Name',
        description: 'Description of Event',
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        venue: 'Venue',
        subEvents: [
            { id: 1, name: 'Sub Event 1' },
            { id: 2, name: 'Sub Event 2' },
        ],
    };
    const imageSource = require('../assets/images/favicon.png');


    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.eventImage} />
            <Text style={styles.eventTitle}>{event.name}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <Text style={styles.eventStartTime}>Start Time: {event.startTime}</Text>
            <Text style={styles.eventEndTime}>End Time: {event.endTime}</Text>
            <Text style={styles.eventVenue}>Venue: {event.venue}</Text>
            <Text style={styles.eventSubEvents}>Sub Events:</Text>
            {event.subEvents.map((subEvent) => (
                <Text key={subEvent.id} style={styles.eventSubEvent}>
                    - {subEvent.name}
                </Text>
            ))}
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