import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import MedicationScreen from '../Screens/MedicationScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import MemoryJournalScreen from '../Screens/MemoryJournalScreen'; // Corrected import name

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Medication Management"
          component={MedicationScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="medicinebox" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Memory Journal"
          component={MemoryJournalScreen} // Corrected component name
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="book" size={size} color={color} /> // Changed icon name to "book"
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="profile" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;
