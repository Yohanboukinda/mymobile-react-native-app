import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
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
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={30} color="#007AFF" />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Ionicons name="calendar" size={50} color="#007AFF" />
                    <Text style={styles.title}>Créer une réservation</Text>
                    <Text style={styles.subtitle}>Remplissez le formulaire pour planifier votre service en toute simplicité.</Text>
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="calendar-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Date de réservation</Text>
                    </View>
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
                                <Text style={styles.dateText}>{reservationDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
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
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="options-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Type</Text>
                    </View>
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
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="calendar-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Date d'achat</Text>
                    </View>
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
                                <Text style={styles.dateText}>{purchaseDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
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
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="cash-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Montant payé</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Montant (ex. 99.99)"
                        value={amountPaid}
                        onChangeText={setAmountPaid}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="checkmark-circle-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Statut du paiement</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex. Payé, En attente"
                        value={paymentStatus}
                        onChangeText={setPaymentStatus}
                    />
                </View>

                <View style={styles.formSection}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="code-outline" size={24} color="#007AFF" style={styles.fieldIcon} />
                        <Text style={styles.label}>Code de réservation</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex. RES-1234"
                        value={reservationCode}
                        onChangeText={setReservationCode}
                    />
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Soumettre la réservation</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>Besoin d'aide ? Contactez-nous à support@verotech.com</Text>
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
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    fieldIcon: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
    dateButton: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    dateText: {
        color: '#333',
    },
    submitButton: {
        width: '90%',
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 12,
        color: '#888',
        marginTop: 20,
        textAlign: 'center',
    },
});