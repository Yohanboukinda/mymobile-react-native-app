import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import AccueilScreen from "./screens/AccueilScreen";
import AproposScreen from "./screens/AproposScreen";
import ReservationScreen from "./screens/ReservationScreen";
import PaiementScreen from "./screens/PaiementScreen";
import TelechargerScreen from "./screens/TelechargerScreen";



// Créer le navigateur à onglets
const Tab = createBottomTabNavigator();

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}*/
export default function App() {
  return (
      <NavigationContainer style={styles.container}>
        <Tab.Navigator
            screenOptions={{
              tabBarStyle: { backgroundColor: '#f8f8f8' },
              tabBarLabelStyle: { fontSize: 12 },
              tabBarActiveTintColor: '#007AFF',
              tabBarInactiveTintColor: '#8E8E93',
            }}>
          <Tab.Screen name="Accueil" component={AccueilScreen} />
          <Tab.Screen name="À propos" component={AproposScreen} />
          <Tab.Screen name="Réservation" component={ReservationScreen} />
          <Tab.Screen name="Paiement" component={PaiementScreen} />
          <Tab.Screen name="Télécharger" component={TelechargerScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
