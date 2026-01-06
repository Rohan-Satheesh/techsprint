// screens/RouteCompareScreen.js
import { View, Text, StyleSheet } from "react-native";
import Card from "../components/Card";
import { colors } from "../theme/colors";

export default function RouteCompareScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={{ color: colors.muted }}>Map Placeholder</Text>
      </View>

      <Card>
        <Text style={styles.safe}>🛡️ Safest Route</Text>
        <Text style={styles.meta}>25 min • Safety Score: 92</Text>
      </Card>

      <Card>
        <Text style={styles.fast}>⚡ Fastest Route</Text>
        <Text style={styles.meta}>18 min • Safety Score: 65</Text>
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
  mapPlaceholder: {
    height: 300,
    backgroundColor: "#020617",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  safe: { color: colors.green, fontSize: 16 },
  fast: { color: colors.amber, fontSize: 16 },
  meta: { color: colors.muted }
});
