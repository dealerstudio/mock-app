import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // This comes from the initialParams in your App.js
  const { setUserToken } = route.params;

  const handleLogin = async () => {
    // These are the "Mock Credentials" you asked for
    const MOCK_EMAIL = "admin@dealerstudio.com.au";
    const MOCK_PASSWORD = "password123";

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const token = 'secret-dealer-token-123';
      
      // 1. Persist the login (The applicant should explain this)
      await AsyncStorage.setItem('userToken', token);
      
      // 2. Update state to trigger the switch in App.js
      setUserToken(token);
    } else {
      Alert.alert("Error", "Invalid email or password. Try admin@dealerstudio.com.au / password123");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dealer Studio Portal</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15, borderRadius: 8 }
});