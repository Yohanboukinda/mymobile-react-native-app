import { View, Text, StyleSheet } from 'react-native';

export default function AccueilScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue sur la page d'Accueil !</Text>
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
