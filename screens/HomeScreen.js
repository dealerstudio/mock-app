import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import db from '../db.json';

const STATUS_COLOURS = {
  available: '#2ecc71',
  sold: '#e74c3c',
  reserved: '#f39c12',
};

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  // BUG: case-sensitive — searching "toyota" won't match "Toyota"
  const filtered = db.vehicles.filter(
    (v) => v.make.includes(searchText) || v.model.includes(searchText)
  );

  const handleSort = () => {
    // TODO: implement sort by price / make / year
    alert('Sort not yet implemented');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('VehicleDetail', { vehicle: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {item.year} {item.make} {item.model}
        </Text>
        <View style={[styles.badge, { backgroundColor: STATUS_COLOURS[item.status] ?? '#999' }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
      <Text style={styles.cardMeta}>{item.colour} · {item.odo.toLocaleString()} km</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TextInput
          style={styles.search}
          placeholder="Search by make or model..."
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No vehicles found.</Text>}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  toolbar: { flexDirection: 'row', padding: 12, gap: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e0e0e0' },
  search: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fafafa' },
  sortButton: { justifyContent: 'center', paddingHorizontal: 14, backgroundColor: '#3498db', borderRadius: 8 },
  sortButtonText: { color: '#fff', fontWeight: '600' },
  list: { padding: 12, gap: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#222' },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginBottom: 4 },
  cardMeta: { fontSize: 13, color: '#888' },
  empty: { textAlign: 'center', marginTop: 40, color: '#aaa' },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#3498db', justifyContent: 'center', alignItems: 'center', elevation: 4 },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 32 },
});
