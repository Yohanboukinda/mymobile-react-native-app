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

            <View style={styles.iconContainer}>
                <Ionicons name="home" size={80} color="#007AFF" />
            </View>

            <Text style={styles.title}>Bienvenue dans notre application</Text>

            <Text style={styles.description}>
                Réservez vos services en toute simplicité avec notre application rapide et intuitive. Planifiez vos rendez-vous, événements ou services en quelques clics, et suivez vos réservations en temps réel.
            </Text>

            <Text style={styles.description}>
                Découvrez une expérience utilisateur fluide, avec des options de paiement sécurisées et des confirmations instantanées. Commencez dès maintenant ou explorez nos fonctionnalités !
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Réservation')}
            >
                <Text style={styles.buttonText}>Faire une réservation</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate('À propos')}
            >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>En savoir plus</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButtonText: {
        color: '#007AFF',
    },
});