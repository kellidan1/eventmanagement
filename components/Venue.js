import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const imageSource = require('../assets/images/splash.png'); // this common icon im using, remove it and add retrival from database for each venue

export default function Venue() {
    const [numVenues, setNumVenues] = useState(0);
    const [venues, setVenues] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch("https://event-management-backend-974j.onrender.com/venues")
            .then((res) => res.json())
            .then((venues) => {
                let temp = []
                venues.forEach((venue) => {
                    temp.push({ id: venue._id, name: venue.name })
                })
                console.log(temp)
                setVenues(temp);
            })
            .catch(err => { console.error(err) })
    }, [])


    const handleNumVenuesChange = (value) => {
        setNumVenues(parseInt(value));
        setVenues(generateVenues(parseInt(value)));
    };
    // replace generate venues with retrieving from database
    const generateVenues = (num) => {
        const venues = [];
        for (let i = 1; i <= num; i++) {
            venues.push({ id: i, name: `Venue ${i}`, location: `Location for Venue ${i}` });
        }
        return venues;
    };

    const handlePressVenue = (venueId) => {
        console.log('Venue pressed:', venueId);
        navigation.navigate('Venue Details'); // Replace with your retriving the specific venue from database
    };

    return (
        <View style={styles.container}>
            <Button title="+" style={styles.addButton} onPress={() => navigation.navigate('Add Venue')} />
            <FlatList
                data={venues}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePressVenue(item.id)}>
                        <View style={styles.venueTile}>
                            <Image source={imageSource} style={styles.venueImage} />
                            <Text style={styles.venueTitle}>{item.name}</Text>
                            <Text style={styles.venueLocation}>{item.location}</Text>
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
    venueTile: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    venueImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginBottom: 8,
    },
    venueTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    venueLocation: {
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
    flatList: {
        flex: 1,
        width: '100%',
    },
    addButton: {
        backgroundColor: 'blue',
        borderRadius: 100, // Make the button circular
        padding: 15,
        position: 'absolute',
        top: 20,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});