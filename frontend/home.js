// screens/HomeScreen.js
import { View, Text, TextInput, StyleSheet } from "react-native";
import Card from "../components/Card";
import { colors } from "../theme/colors";

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
