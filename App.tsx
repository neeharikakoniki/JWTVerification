import React, { useState } from 'react';
import { ScrollView, Text, Button, View, Alert } from 'react-native';
import { generateJWT, decodeJWT } from './src/utils/jwt';
import { saveToken, getToken, clearToken } from './src/utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>(null);

  const handleGenerate = async () => {
    const now = Math.floor(Date.now() / 1000);
    const newToken = generateJWT({
      userId: 1,
      email: 'test@example.com',
      exp: now + 120, 
    });

    await saveToken(newToken);
    setToken(newToken);
    Alert.alert('Token generated and stored securely');
  };

  const handleVerify = async () => {
    const stored = await getToken();
    if (!stored) return Alert.alert('No token found');

    const decoded = decodeJWT(stored);
    if (!decoded) return Alert.alert('Invalid token');

    const now = Math.floor(Date.now() / 1000);
    decoded.exp && decoded.exp < now
      ? Alert.alert('Token expired')
      : Alert.alert('Token valid');

    setPayload(decoded);
  };

  const handleClear = async () => {
    await clearToken();
    setToken(null);
    setPayload(null);
    Alert.alert('Token cleared');
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 30 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>
          JWT Demo (Keychain / Keystore)
        </Text>

        <Button title="Generate JWT" onPress={handleGenerate} />
        <Button title="Verify Token" onPress={handleVerify} />
        <Button title="Clear Token" onPress={handleClear} />

        {token && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: '600' }}>Token:</Text>
            <Text selectable style={{ fontSize: 12 }}>{token}</Text>
          </View>
        )}

        {payload && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: '600' }}>Payload:</Text>
            <Text>{JSON.stringify(payload, null, 2)}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
    
  );
}
