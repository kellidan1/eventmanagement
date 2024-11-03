import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const imageSource = require('../assets/images/icon.png'); // allow user to upload image

export default function Event() { // add the inserting to database 
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');

    const submit = () => {
        fetch("https://event-management-backend-974j.onrender.com/venue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specify the content type
            },
            body: JSON.stringify({
                name,
                location,
                capacity
            })
        })
            .then(res => { console.log(res); navigation.navigate('Event Management App') })
            .catch(err => console.error(err))
    }


    return (
        <View style={styles.event}>
            <Image source={imageSource} style={styles.image} />
            <TextInput
                style={styles.input}
                placeholder="Venue Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Venue Location"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder="Venue Capacity"
                value={capacity}
                onChangeText={setCapacity}
            />
            <Button title="Submit" onPress={() => submit()} />
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
});