// components/Card.js
import { View, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  }
});
