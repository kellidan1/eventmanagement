import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewEvent from '../components/Event';
import SubEvent from '../components/SubEvent';
import DisplayEvent from '../components/Displayevent';
import EventDetails from '../components/Eventdetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Event Management App" component={HomeScreen} />
        <Stack.Screen name="Event" component={NewEvent} />
        <Stack.Screen name="Sub Events" component={SubEvent} />
        <Stack.Screen name="Display event" component={DisplayEvent} />
        <Stack.Screen name="Event Details" component={EventDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Create New Event" onPress={() => navigation.navigate('Event')} />
        <Button title="View Events" onPress={() => navigation.navigate('Display event')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 16,
    gap: 16,
  },
});