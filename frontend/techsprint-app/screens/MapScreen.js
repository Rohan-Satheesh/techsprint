import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Button, StyleSheet } from 'react-native';
import SOSButton from '../components/SOSButton';
import MapView, { Marker } from 'react-native-maps';
import { getMarkers } from '../services/api';

export default function MapScreen({ navigation }) {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarkers()
      .then((r) => setMarkers(r.data || []))
      .catch(() => setMarkers([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{flex:1}} />;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ latitude: 12.97, longitude: 77.59, latitudeDelta: 0.1, longitudeDelta: 0.1 }}
        showsUserLocation
      >
        {markers.map((m) => (
          <Marker key={m.id} coordinate={{ latitude: m.lat, longitude: m.lng }} title={m.title} />
        ))}
      </MapView>
        <View style={styles.controls}>
        <Button title="Report" onPress={() => navigation.navigate('Report')} />
        <View style={{height:8}} />
        <Button title="Assistance" onPress={() => navigation.navigate('Assistance')} />
        <View style={{height:8}} />
        <Button title="Routes" onPress={() => navigation.navigate('Routes')} />
      </View>
      <SOSButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: { position: 'absolute', bottom: 20, left: 20 },
});
