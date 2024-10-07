import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function SubEvent() {
    const [subEvents, setSubEvents] = useState([]);

    const handleAddSubEvent = () => {
        setSubEvents([...subEvents, { id: subEvents.length + 1, name: '' }]);
    };

    const handleRemoveSubEvent = (index) => {
        setSubEvents(subEvents.filter((subEvent) => subEvent.id !== index));
    };

    return (
        <View style={styles.subEventContainer}>
            {subEvents.map((subEvent) => (
                <View key={subEvent.id} style={styles.subEventItem}>
                    <TextInput
                        style={styles.subEventInput}
                        placeholder={`SubEvent ${subEvent.id}`}
                        value={subEvent.name}
                        onChangeText={(text) => {
                            const updatedSubEvents = subEvents.map((item) =>
                                item.id === subEvent.id ? { ...item, name: text } : item
                            );
                            setSubEvents(updatedSubEvents);
                        }}
                    />
                    <Button
                        title="Remove"
                        onPress={() => handleRemoveSubEvent(subEvent.id)}
                    />
                </View>
            ))}
            <Button title="Add SubEvent" onPress={handleAddSubEvent} />
        </View>
    );
}

const styles = StyleSheet.create({
    subEventContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    subEventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    subEventInput: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});