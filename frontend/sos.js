// screens/SOSScreen.js
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function SOSScreen() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.sosButton}>
        <Text style={styles.sosText}>SOS</Text>
      </Pressable>
      <Text style={styles.hint}>Long press to trigger emergency</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#450A0A",
    alignItems: "center",
    justifyContent: "center"
  },
  sosButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center"
  },
  sosText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700"
  },
  hint: {
    color: colors.muted,
    marginTop: 20
  }
});
