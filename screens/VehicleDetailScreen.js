import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function VehicleDetailScreen({ route }) {
  const { vehicle } = route.params;

  const handleEdit = () => {
    // TODO: implement edit vehicle form
    Alert.alert('Not implemented', 'Edit functionality coming soon.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </Text>

      <View style={styles.table}>
        <Row label="Colour" value={vehicle.colour} />
        <Row label="Status" value={vehicle.status} />
        <Row label="Price" value={`$${vehicle.price.toLocaleString()}`} />
        {/* BUG: field is "odo" in db.json, not "odometer" — renders undefined */}
        <Row label="Odometer" value={`${vehicle.odometer?.toLocaleString() ?? '—'} km`} />
        <Row label="Year" value={String(vehicle.year)} />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>Edit Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 24 },
  table: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden', marginBottom: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderColor: '#f0f0f0', backgroundColor: '#fff' },
  label: { color: '#888', fontSize: 14 },
  value: { color: '#222', fontSize: 14, fontWeight: '500' },
  editButton: { backgroundColor: '#3498db', padding: 16, borderRadius: 10, alignItems: 'center' },
  editButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
