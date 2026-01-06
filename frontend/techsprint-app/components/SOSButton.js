import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { postSOS } from '../services/api';

export default function SOSButton() {
  const [sending, setSending] = useState(false);

  const handlePress = () => {
    Alert.alert('Confirm SOS', 'Send SOS to emergency contacts?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Send',
        onPress: async () => {
          setSending(true);
          try {
            const loc = await Location.getCurrentPositionAsync({});
            const payload = {
              userId: 'demo-user',
              lat: loc.coords.latitude,
              lng: loc.coords.longitude,
              notes: '',
            };
            await postSOS(payload);
            Alert.alert('SOS sent', 'Help has been notified');
          } catch (e) {
            Alert.alert('Failed', 'Could not send SOS');
          } finally {
            setSending(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <TouchableOpacity
        style={[styles.button, sending ? styles.disabled : null]}
        onPress={handlePress}
        disabled={sending}
      >
        <Text style={styles.text}>{sending ? 'Sending...' : 'SOS'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 16,
    bottom: 24,
  },
  button: {
    backgroundColor: '#d32f2f',
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  disabled: { opacity: 0.6 },
  text: { color: 'white', fontWeight: '700' },
});
