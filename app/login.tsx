import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home');
    } catch (e: any) {
      Alert.alert('Login Failed', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
});
