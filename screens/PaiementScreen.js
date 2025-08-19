import { View, Text, StyleSheet } from 'react-native';


export default function PaiementScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Options de paiement</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});