import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function ReservationScreen() {
    const navigation = useNavigation();
    const [reservationDate, setReservationDate] = useState(new Date());
    const [type, setType] = useState('Standard');
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [amountPaid, setAmountPaid] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [reservationCode, setReservationCode] = useState('');
    const [showReservationDatePicker, setShowReservationDatePicker] = useState(false);
    const [showPurchaseDatePicker, setShowPurchaseDatePicker] = useState(false);

    const handleSubmit = async () => {
        if (!amountPaid || !paymentStatus || !reservationCode) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        if (!reservationCode.match(/^RES-\d{4}$/)) {
            alert('Le code de réservation doit être au format RES-XXXX (ex. RES-1234).');
            return;
        }

        const reservationData = {
            reservationDate: reservationDate.toISOString(),
            type,
            purchaseDate: purchaseDate.toISOString(),
            amountPaid: parseFloat(amountPaid),
            paymentStatus,
            reservationCode,
        };

        try {
            const response = await axios.post('http://192.168.1.100:8080/api/reservations', reservationData);
            alert('Réservation créée avec succès : ' + JSON.stringify(response.data));
            setReservationDate(new Date());
            setType('Standard');
            setPurchaseDate(new Date());
            setAmountPaid('');
            setPaymentStatus('');
            setReservationCode('');
        } catch (error) {
            alert('Erreur lors de la création de la réservation : ' + error.message);
        }
    };

    const onReservationDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || reservationDate;
        setShowReservationDatePicker(Platform.OS === 'web');
        setReservationDate(currentDate);
    };

    const onPurchaseDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || purchaseDate;
        setShowPurchaseDatePicker(Platform.OS === 'web');
        setPurchaseDate(currentDate);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#007AFF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Créer une réservation</Text>

                    <Text style={styles.label}>Date de réservation</Text>
                    {Platform.OS === 'web' ? (
                        <TextInput
                            style={styles.input}
                            value={reservationDate.toISOString().split('T')[0]}
                            onChangeText={(text) => setReservationDate(new Date(text))}
                            placeholder="YYYY-MM-DD"
                        />
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => setShowReservationDatePicker(true)}
                            >
                                <Text>{reservationDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                            </TouchableOpacity>
                            {showReservationDatePicker && (
                                <DateTimePicker
                                    value={reservationDate}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                    onChange={onReservationDateChange}
                                />
                            )}
                        </>
                    )}

                    <Text style={styles.label}>Type</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={type}
                            style={styles.picker}
                            onValueChange={(itemValue) => setType(itemValue)}
                        >
                            <Picker.Item label="Standard" value="Standard" />
                            <Picker.Item label="Premium" value="Premium" />
                            <Picker.Item label="VIP" value="VIP" />
                        </Picker>
                    </View>

                    <Text style={styles.label}>Date d'achat</Text>
                    {Platform.OS === 'web' ? (
                        <TextInput
                            style={styles.input}
                            value={purchaseDate.toISOString().split('T')[0]}
                            onChangeText={(text) => setPurchaseDate(new Date(text))}
                            placeholder="YYYY-MM-DD"
                        />
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => setShowPurchaseDatePicker(true)}
                            >
                                <Text>{purchaseDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                            </TouchableOpacity>
                            {showPurchaseDatePicker && (
                                <DateTimePicker
                                    value={purchaseDate}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                    onChange={onPurchaseDateChange}
                                />
                            )}
                        </>
                    )}

                    <Text style={styles.label}>Montant payé</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Montant (ex. 99.99)"
                        value={amountPaid}
                        onChangeText={setAmountPaid}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Statut du paiement</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex. Payé, En attente"
                        value={paymentStatus}
                        onChangeText={setPaymentStatus}
                    />

                    <Text style={styles.label}>Code de réservation</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex. RES-1234"
                        value={reservationCode}
                        onChangeText={setReservationCode}
                    />

                    <Button title="Soumettre la réservation" onPress={handleSubmit} color="#007AFF" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20, // Ajout d'un espace en bas pour le défilement
    },
    container: {
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
    },
    menuButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 10 : 0,
        left: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    picker: {
        width: '100%',
        height: Platform.OS === 'ios' ? 150 : 44, // Hauteur augmentée pour iOS
    },
    dateButton: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});