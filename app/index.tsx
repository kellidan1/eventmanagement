import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewEvent from '../components/Event';
import SubEvent from '../components/SubEvent';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Event Management App" component={HomeScreen} />
        <Stack.Screen name="Event" component={NewEvent} />
        <Stack.Screen name="subevent" component={SubEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Button title="Create New Event" onPress={() => navigation.navigate('Event')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});