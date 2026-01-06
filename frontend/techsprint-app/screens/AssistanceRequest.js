import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import { requestAssistance } from '../services/api';

export default function AssistanceRequest({ navigation }) {
  const [service, setService] = useState('towing');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    try {
      const loc = await Location.getCurrentPositionAsync({});
      const payload = {
        userId: 'demo-user',
        service,
        notes,
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      };
      await requestAssistance(payload);
      Alert.alert('Request sent', 'Assistance requested successfully');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Failed', 'Could not request assistance');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service (towing/mechanic/ambulance)</Text>
      <TextInput style={styles.input} value={service} onChangeText={setService} />
      <Text style={styles.label}>Notes</Text>
      <TextInput style={[styles.input, {height:100}]} value={notes} onChangeText={setNotes} multiline />
      <Button title={submitting ? 'Requesting...' : 'Request Assistance'} onPress={submit} disabled={submitting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  label: { fontWeight: '600', marginTop: 12 },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, borderRadius:6, marginTop:6 },
});
