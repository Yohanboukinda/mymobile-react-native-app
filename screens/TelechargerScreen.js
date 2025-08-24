import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function TelechargerScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedType, setSelectedType] = useState(route.params?.type || 'Standard');

    const handleDownloadApp = () => {
        let url;
        switch (selectedType) {
            case 'Standard':
                url = 'https://play.google.com/store/apps/details?id=votre.app.standard';
                break;
            case 'Premium':
                url = 'https://play.google.com/store/apps/details?id=votre.app.premium';
                break;
            case 'VIP':
                url = 'https://play.google.com/store/apps/details?id=votre.app.vip';
                break;
            default:
                url = 'https://play.google.com/store/apps/details?id=votre.app';
        }
        Linking.openURL(url).catch(() => alert('Impossible d\'ouvrir le lien de téléchargement'));
    };

    const handleDownloadGuide = () => {
        let url;
        switch (selectedType) {
            case 'Standard':
                url = 'https://votre-site.com/guide-standard.pdf';
                break;
            case 'Premium':
                url = 'https://votre-site.com/guide-premium.pdf';
                break;
            case 'VIP':
                url = 'https://votre-site.com/guide-vip.pdf';
                break;
            default:
                url = 'https://votre-site.com/guide.pdf';
        }
        Linking.openURL(url).catch(() => alert('Impossible d\'ouvrir le lien du guide'));
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={30} color="#007AFF" />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Ionicons name="download" size={50} color="#007AFF" />
                    <Text style={styles.title}>Télécharger</Text>
                    <Text style={styles.subtitle}>
                        Téléchargez les ressources adaptées à votre type de réservation.
                    </Text>
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="options-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Type de réservation</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedType}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedType(itemValue)}
                        >
                            <Picker.Item label="Standard" value="Standard" />
                            <Picker.Item label="Premium" value="Premium" />
                            <Picker.Item label="VIP" value="VIP" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="phone-portrait-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Application mobile</Text>
                    </View>
                    <Text style={styles.description}>
                        Téléchargez l'application {selectedType} pour gérer vos réservations en déplacement.
                    </Text>
                    <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadApp}>
                        <Text style={styles.downloadButtonText}>Télécharger l'application</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="document-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Guide utilisateur</Text>
                    </View>
                    <Text style={styles.description}>
                        Obtenez le guide PDF pour votre réservation {selectedType}.
                    </Text>
                    <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadGuide}>
                        <Text style={styles.downloadButtonText}>Télécharger le guide</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>Besoin d'aide ? Contactez-nous à support@votreapp.com</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 40,
    },
    menuButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 40 : 20,
        left: 20,
        zIndex: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 5,
    },
    formSection: {
        width: '90%',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    fieldIcon: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    picker: {
        width: '100%',
        height: Platform.OS === 'ios' ? 150 : 44,
    },
    downloadButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 12,
        color: '#888',
        marginTop: 20,
        textAlign: 'center',
    },
});