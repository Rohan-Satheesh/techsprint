// screens/HomeScreen.js
import { View, Text, TextInput, StyleSheet } from "react-native";
import Card from "../components/Card";
import { colors } from "../theme/colors";
import API_BASE_URL from "./api";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safer Roads. Smarter Travel.</Text>

      <TextInput
        placeholder="Enter destination"
        placeholderTextColor={colors.muted}
        style={styles.search}
      />

      <Card>
        <Text style={styles.cardText}>🛣️ Safest Route</Text>
      </Card>

      <Card>
        <Text style={styles.cardText}>🧰 Roadside Assistance</Text>
      </Card>

      <Card>
        <Text style={[styles.cardText, { color: colors.red }]}>🚨 SOS</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20
  },
  search: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    color: colors.text,
    marginBottom: 20
  },
  cardText: {
    color: colors.text,
    fontSize: 16
  }
});

import API_BASE_URL from "./api";

const signupUser = async () => {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@test.com",
      password: "123456",
      name: "Test",
      phone: "9999999999"
    })
  });

  const data = await res.json();
  console.log(data);
};
