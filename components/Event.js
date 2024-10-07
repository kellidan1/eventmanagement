import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Image } from 'react-native';
import SubEvent from '../components/SubEvent';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
const imageSource = require('../assets/images/icon.png'); // Replace with your image path

export default function Event() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedVenue, setSelectedVenue] = useState('');

    const handleCreateEvent = () => {
        // Handle event creation logic here
        console.log('Creating event:', name, description, startTime, endTime);
        navigation.navigate('subevent')
    };
    const venues = [
        { label: 'Venue 1', value: 'venue1' },
        { label: 'Venue 2', value: 'venue2' },
        // Add more venues as needed
    ];

    return (
        <View style={styles.event}>
            <Image source={imageSource} style={styles.image} />
            <TextInput
                style={styles.input}
                placeholder="Event Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Event Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Start Time"
                value={startTime}
                onChangeText={setStartTime}
            />
            <TextInput
                style={styles.input}
                placeholder="End Time"
                value={endTime}
                onChangeText={setEndTime}
            />
            <Picker
                style={styles.picker}
                selectedValue={selectedVenue}
                onValueChange={(itemValue) => setSelectedVenue(itemValue)}
            >
                <Picker.Item label="Select Venue" value="" />
                {venues.map((venue) => (
                    <Picker.Item key={venue.value} label={venue.label} value={venue.value} />
                ))}
            </Picker>
            <Button title="Create Event" onPress={handleCreateEvent} />

        </View>
    );
}

const styles = StyleSheet.create({
    event: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        margin: 10,
    },
    eventContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
        alignSelf: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
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
});