import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function PaiementScreen() {
    const navigation = useNavigation();

    // Fonction de gestion des paiements, à compléter
    const handlePaymentPress = (paymentMethod) => {
        // Logique de gestion du paiement en fonction de la méthode
        alert(`Vous avez sélectionné : ${paymentMethod}`);
        // Ici, vous intégrerez votre API de paiement
        // Par exemple: navigation.navigate('PaymentGateway', { method: paymentMethod });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.toggleDrawer()}
            >
                <Ionicons name="menu" size={30} color="#007AFF" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Ionicons name="card" size={60} color="#007AFF" />
                    <Text style={styles.title}>Choisissez votre mode de paiement</Text>
                    <Text style={styles.subtitle}>Sélectionnez une option pour finaliser votre réservation en toute sécurité.</Text>
                </View>

                {/* Section Paiement Mobile */}
                <View style={styles.paymentSection}>
                    <Text style={styles.sectionTitle}>Paiement Mobile</Text>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handlePaymentPress('Orange Money')}
                    >
                        <Ionicons name="phone-portrait-outline" size={28} color="#FF8C00" />
                        <Text style={styles.optionText}>Orange Money</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handlePaymentPress('Wave')}
                    >
                        <Ionicons name="wallet-outline" size={28} color="#1E90FF" />
                        <Text style={styles.optionText}>Wave</Text>
                    </TouchableOpacity>
                </View>

                {/* Section Carte Bancaire */}
                <View style={styles.paymentSection}>
                    <Text style={styles.sectionTitle}>Carte Bancaire</Text>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handlePaymentPress('Carte Bancaire')}
                    >
                        <Ionicons name="card-outline" size={28} color="#007AFF" />
                        <Text style={styles.optionText}>Carte Bancaire (Visa / Mastercard)</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>Toutes les transactions sont cryptées et sécurisées.</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        width: '100%',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 15,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 5,
    },
    paymentSection: {
        width: '100%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginLeft: 5,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginLeft: 15,
    },
    footerText: {
        fontSize: 12,
        color: '#888',
        marginTop: 20,
        textAlign: 'center',
    },
});