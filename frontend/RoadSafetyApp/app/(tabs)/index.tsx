import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Index() {
  const router = useRouter();
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    if (!destination.trim()) return;
    router.push(`/routes?destination=${encodeURIComponent(destination)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Road Safety App</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Enter destination"
        value={destination}
        onChangeText={setDestination}
        style={styles.search}
      />

      {/* Search Button */}
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Text style={styles.btnText}>Search Route</Text>
      </TouchableOpacity>

      {/* Quick Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.routeBtn}
          onPress={() => router.push("/routes")}
        >
          <Text style={styles.btnText}>Routes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reportBtn}
          onPress={() => router.push("/report")}
        >
          <Text style={styles.btnText}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sosBtn}
          onPress={() => router.push("/sos")}
        >
          <Text style={styles.btnText}>SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  search: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  searchBtn: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 15,
  },
  routeBtn: {
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  reportBtn: {
    backgroundColor: "#F57C00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  sosBtn: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});



