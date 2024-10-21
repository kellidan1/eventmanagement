import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
const imageSource = require('../assets/images/icon.png');

export default function DisplayEvent() {
    const [numEvents, setNumEvents] = useState(0);
    const [events, setEvents] = useState([]);
    const navigation = useNavigation();

    const handleNumEventsChange = (value) => {
        setNumEvents(parseInt(value));
        setEvents(generateEvents(parseInt(value)));
    };

    const generateEvents = (num) => {
        const events = [];
        for (let i = 1; i <= num; i++) {
            events.push({ id: i, name: `Event ${i}`, description: `Description for Event ${i}` });
        }
        return events;
    };
    const handlePressEvent = (eventId) => {
        // Handle navigation to DisplayEventDetails page here
        console.log('Event pressed:', eventId); // Replace with navigation logic
        navigation.navigate('Event Details');
    };
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={numEvents}
                onValueChange={handleNumEventsChange}
                style={styles.picker}>
                <Picker.Item label="Select Number of Events" value={0} />
                {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                    <Picker.Item key={num} label={num.toString()} value={num} />
                ))}
            </Picker>
            {numEvents > 0 && (
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePressEvent(item.id)}>
                            <View style={styles.eventTile}>
                                {/* <Image source={{ uri: item.imageUrl }} style={styles.eventImage} /> */}
                                <Image source={imageSource} style={styles.eventImage} />
                                <Text style={styles.eventTitle}>{item.name}</Text>
                                <Text style={styles.eventDescription}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    style={styles.flatList}
                />
            )}
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
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
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