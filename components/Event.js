import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const defaultImageSource = require('../assets/images/icon.png');

export default function Event() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [subEvent, setSubEvent] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [selectedVenue, setSelectedVenue] = useState({
        id: '',
        name: '',
        location: '',
        capacity: 0
    });
    const [image, setImage] = useState(null);
    const [venueList, setVenueList] = useState([]);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Update the state with the chosen image URI
        }
    };

    useEffect(() => {
        fetch("https://event-management-backend-974j.onrender.com/venues")
            .then((res) => res.json())
            .then((venues) => {
                let temp = [];
                temp.push({ id: "000", name: "Select Venue" });
                venues.forEach((venue) => {
                    temp.push({ id: venue._id, name: venue.name, location: venue.location, capacity: venue.capacity });
                });
                setVenueList(temp);
            })
            .catch(err => console.error(err));
    }, []);

    const handleCreateEvent = () => {
        console.log('Creating event:', name, description, startTime, endTime);

        fetch("https://event-management-backend-974j.onrender.com/event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                timings: {
                    startTime,
                    endTime
                },
                venue: {
                    name: selectedVenue.name,
                    location: selectedVenue.location,
                    capacity: selectedVenue.capacity
                },
                subEvent
            })
        })
        .then(res => {
            console.log(res);
            navigation.navigate('Event Management App');
        })
        .catch(err => console.error(err));
    };

    return (
        <View style={styles.event}>
            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Image source={defaultImageSource} style={styles.image} />
                )}
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="Event Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Event Description" value={description} onChangeText={setDescription} />
            <TextInput style={styles.input} placeholder="Sub Event Name" value={subEvent} onChangeText={setSubEvent} />
            <View style={styles.button}>
                <Button title={"Start Time: " + startTime.toLocaleTimeString()} onPress={() => setShowStartTime(true)} />
            </View>
            <View style={styles.button}>
                <Button title={"End Time: " + endTime.toLocaleTimeString()} onPress={() => setShowEndTime(true)} />
            </View>
            {showStartTime && (
                <DateTimePicker
                    value={startTime}
                    mode='time'
                    is24Hour={true}
                    onChange={(_, selectedDate) => {
                        setShowStartTime(false);
                        setStartTime(selectedDate);
                    }}
                />
            )}
            {showEndTime && (
                <DateTimePicker
                    value={endTime}
                    mode='time'
                    is24Hour={true}
                    onChange={(_, selectedDate) => {
                        setShowEndTime(false);
                        setEndTime(selectedDate);
                    }}
                />
            )}
            <Picker
                style={styles.picker}
                selectedValue={selectedVenue.id}
                onValueChange={(_, index) => setSelectedVenue(venueList[index])}
            >
                {venueList.map((venue) => (
                    <Picker.Item key={venue.id} label={venue.name} value={venue.id} />
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
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
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
    button: {
        marginBottom: 10,
    },
});
