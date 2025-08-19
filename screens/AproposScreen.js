import { View, Text, StyleSheet } from 'react-native';

export default function AproposScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>À propos de notre application</Text>
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