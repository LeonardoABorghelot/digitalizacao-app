import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { login } from '../services/authService';
import { storeToken } from '../utils/authStorage';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [cdFun, setCdFun] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

const handleLogin = async () => {
  try {
    const token = await login(cdFun, password);
    await storeToken(token);
    navigation.navigate('Vendas');
  } catch (error) {
    Alert.alert('Erro', 'Código ou senha inválidos');
  }
};

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Código do Funcionário"
        value={cdFun}
        onChangeText={setCdFun}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 12, borderRadius: 5
  },
});