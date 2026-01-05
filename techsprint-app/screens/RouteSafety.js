import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, Alert } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { postRoutesScore } from '../services/api';

export default function RouteSafety() {
  const [origin, setOrigin] = useState('12.9716,77.5946');
  const [destination, setDestination] = useState('12.9750,77.5900');
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const parseCoord = (str) => {
    const [lat, lng] = str.split(',').map(s => parseFloat(s.trim()));
    return { lat, lng };
  };

  const findRoutes = async () => {
    setLoading(true);
    const o = parseCoord(origin);
    const d = parseCoord(destination);
    try {
      const payload = { origin: o, destination: d };
      const res = await postRoutesScore(payload);
      // Expecting { routes: [{polyline: [[lat,lng],...], time, distance, safetyScore}] }
      setRoutes(res.data.routes || []);
    } catch (e) {
      Alert.alert('Failed', 'Could not fetch routes — using mock');
      // Fallback mock
      setRoutes([{ id: 'mock1', polyline: [[o.lat,o.lng],[d.lat,d.lng]], time: 600, distance: 4000, safetyScore: 85 }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex:1}}>
      <View style={styles.form}>
        <Text>Origin (lat,lng)</Text>
        <TextInput style={styles.input} value={origin} onChangeText={setOrigin} />
        <Text>Destination (lat,lng)</Text>
        <TextInput style={styles.input} value={destination} onChangeText={setDestination} />
        <Button title={loading ? 'Finding...' : 'Find routes'} onPress={findRoutes} disabled={loading} />
      </View>
      <View style={{flex:1}}>
        <MapView style={{flex:1}} initialRegion={{ latitude: 12.973, longitude: 77.592, latitudeDelta: 0.02, longitudeDelta: 0.02 }}>
          {routes.map((r, i) => (
            <Polyline
              key={r.id || i}
              coordinates={(r.polyline || []).map(p => ({ latitude: p[0], longitude: p[1] }))}
              strokeColor={r.safetyScore > 70 ? '#2e7d32' : r.safetyScore > 40 ? '#f9a825' : '#c62828'}
              strokeWidth={4}
            />
          ))}
        </MapView>
        <View style={styles.routeresults}>
          <FlatList
            data={routes}
            keyExtractor={(i,idx) => (i.id || idx).toString()}
            renderItem={({item}) => (
              <View style={styles.routeItem}>
                <Text>Time: {item.time}s</Text>
                <Text>Distance: {item.distance}m</Text>
                <Text>Safety: {item.safetyScore}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding:12, backgroundColor:'#fff' },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, borderRadius:6, marginVertical:8 },
  routeresults: { position:'absolute', top: 180, left: 12, right: 12, maxHeight: 160 },
  routeItem: { backgroundColor:'rgba(255,255,255,0.9)', padding:8, marginBottom:8, borderRadius:6 },
});
