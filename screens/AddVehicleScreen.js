import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddVehicleScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="construct-outline" size={64} color="#bbb" />
      <Text style={styles.heading}>Coming Soon</Text>
      <Text style={styles.sub}>
        Adding vehicles manually is not yet supported.{'\n'}
        Vehicles are currently loaded from the local database.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#aaa', marginTop: 16, marginBottom: 10 },
  sub: { fontSize: 14, color: '#bbb', textAlign: 'center', lineHeight: 22 },
});
