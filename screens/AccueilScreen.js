import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AccueilScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.toggleDrawer()}
            >
                <Ionicons name="menu" size={30} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.text}>Bienvenue sur la page d'Accueil !</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
});