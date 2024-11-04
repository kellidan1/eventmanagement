import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const imageSource = require('../assets/images/icon.png');

export default function DisplayEvent() {
    const [numEvents, setNumEvents] = useState(0);
    const [events, setEvents] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch("https://event-management-backend-974j.onrender.com/events")
            .then((res) => res.json())
            .then((event) => {
                let temp = []
                event.forEach((event) => {
                    temp.push({ ...event, id: event._id, name: event.name })
                })
                console.log(temp)
                setEvents(temp);
            })
            .catch(err => { console.error(err) })
    }, [])
    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Event Details', { event: events[index] })}>
                        <View style={styles.eventTile}>
                            <Image source={imageSource} style={styles.eventImage} />
                            <Text style={styles.eventTitle}>{item.name}</Text>
                            <Text style={styles.eventDescription}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    eventTile: {
        backgroundColor: '#89CFF0',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    eventDescription: {
        fontSize: 16,
        color: 'black',
    },
    eventDescription: {
        fontSize: 14,
        color: 'gray',
    },
    picker: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
    eventImage: {
        width: '100%',
        height: 100,
        borderRadius: 5,
        marginBottom: 8,
    },
    flatList: {
        flex: 1, // Occupy the remaining space
        width: '100%', // Occupy full width
        //     maxHeight: 300, // Adjust the maximum height as needed
        //     paddingHorizontal: 16, // Add padding to sides
        // },
        // flatListContainer: {
        //     maxHeight: '80%', // Adjust maximum height as needed
    },

});