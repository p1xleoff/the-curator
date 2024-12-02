import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons size={28} name={ focused ? "home" : "home-outline" } color={color} />,
        }}
      />
      <Tabs.Screen
        name="userReviews"
        options={{
          title: 'Reviews',
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons size={28} name={ focused ? "card-text" : "card-text-outline"}color={color} />,
        }}
      />      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'You',
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons size={28} name={ focused ? "account" : "account-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}
