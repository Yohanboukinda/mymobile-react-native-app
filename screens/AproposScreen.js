import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AproposScreen() {
    const navigation = useNavigation();

    const handleContactPress = () => {
        // Ouvre une URL (remplacez par votre site ou email)
        Linking.openURL('mailto:contact@votreapp.com')
            .catch(() => alert('Impossible d\'ouvrir l\'application de messagerie'));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.toggleDrawer()}
            >
                <Ionicons name="menu" size={30} color="#007AFF" />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <Ionicons name="information-circle" size={80} color="#007AFF" />
            </View>

            <Text style={styles.title}>À propos de notre application</Text>

            <Text style={styles.description}>
                Bienvenue dans notre application de réservation ! Nous simplifions la planification de vos services avec une interface intuitive et rapide. Que vous réserviez un rendez-vous, un événement ou un service, notre plateforme vous offre une expérience fluide et sécurisée.
            </Text>

            <Text style={styles.description}>
                Notre mission est de rendre vos réservations accessibles en quelques clics, avec un suivi clair de vos paiements et confirmations. Contactez-nous pour toute question ou pour en savoir plus sur nos services !
            </Text>

            <Text style={styles.description}>
                Notre équipe travaille avec passion pour offrir une expérience utilisateur exceptionnelle, en mettant l'accent sur la simplicité et la fiabilité. Nous innovons constamment pour répondre à vos besoins et garantir votre satisfaction.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleContactPress}
            >
                <Text style={styles.buttonText}>Contactez-nous</Text>
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});