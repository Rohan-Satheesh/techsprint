import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import { postReport } from '../services/api';

export default function ReportForm({ navigation }) {
  const [type, setType] = useState('broken_light');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    const loc = await Location.getCurrentPositionAsync({});
    const payload = {
      userId: 'demo-user',
      type,
      description,
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    };
    postReport(payload)
      .then(() => {
        Alert.alert('Report submitted');
        navigation.goBack();
      })
      .catch(() => Alert.alert('Failed to submit'))
      .finally(() => setSubmitting(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} />
      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, {height:100}]} value={description} onChangeText={setDescription} multiline />
      <Button title={submitting ? 'Submitting...' : 'Submit Report'} onPress={submit} disabled={submitting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  label: { fontWeight: '600', marginTop: 12 },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, borderRadius:6, marginTop:6 },
});
