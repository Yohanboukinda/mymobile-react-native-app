import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AccueilScreen from './screens/AccueilScreen';
import AproposScreen from './screens/AproposScreen';
import ReservationScreen from './screens/ReservationScreen';
import PaiementScreen from './screens/PaiementScreen';
import TelechargerScreen from './screens/TelechargerScreen';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Accueil"
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: '#f8f8f8',
                        width: 240,
                    },
                    drawerLabelStyle: {
                        fontSize: 16,
                    },
                    drawerActiveTintColor: '#007AFF',
                    drawerInactiveTintColor: '#8E8E93',
                }}
            >
                <Drawer.Screen
                    name="Accueil"
                    component={AccueilScreen}
                    options={{
                        drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="À propos"
                    component={AproposScreen}
                    options={{
                        drawerIcon: ({ color, size }) => <Ionicons name="information-circle" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="Réservation"
                    component={ReservationScreen}
                    options={{
                        drawerIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="Paiement"
                    component={PaiementScreen}
                    options={{
                        drawerIcon: ({ color, size }) => <Ionicons name="card" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="Télécharger"
                    component={TelechargerScreen}
                    options={{
                        drawerIcon: ({ color, size }) => <Ionicons name="download" size={size} color={color} />,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}