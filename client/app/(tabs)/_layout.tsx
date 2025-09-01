import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '../../components/HapticTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#000',
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    elevation: 5,
                },

                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 30,
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',

                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarButton: HapticTab,

                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: 'black',
                    borderRadius: 40,
                    overflow: 'hidden',
                    elevation: 0,
                    borderTopWidth: 0,
                    height: 70,
                    paddingTop: 10,
                },

            }}
            initialRouteName="index"
        >
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color="", size }: { color: string; size: number }) => (
                        <Ionicons name="cart-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'E-Sky',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="products"
                options={{
                    title: 'Products',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Feather name="shopping-bag" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

