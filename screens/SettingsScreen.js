import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const handleLogout = async () => {
    // Clears the stored token, but has no way to update userToken state in App.js
    // because setUserToken is not accessible here (no Context wired up).
    // INTERVIEW TASK: how would you fix this? What pattern would you use?
    await AsyncStorage.removeItem('userToken');
    alert('Token cleared — but the app state has not updated. You are still logged in.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Logged in as</Text>
          <Text style={styles.rowValue}>admin@dealerstudio.com.au</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Role</Text>
          <Text style={styles.rowValue}>Administrator</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>App</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Version</Text>
          <Text style={styles.rowValue}>1.0.0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Environment</Text>
          <Text style={styles.rowValue}>Development</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 24 },
  section: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#e0e0e0' },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#999', textTransform: 'uppercase', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderColor: '#f0f0f0' },
  rowLabel: { color: '#555', fontSize: 14 },
  rowValue: { color: '#222', fontSize: 14, fontWeight: '500' },
  logoutButton: { backgroundColor: '#e74c3c', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  logoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
