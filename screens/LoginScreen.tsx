import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStackParamList } from '../navigation/types';
import { login } from '../services/authService';
import { storeToken } from '../utils/authStorage';
import { styles } from './LoginScreen.styles';

const LoginScreen = () => {
  const [cdFun, setCdFun] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const passwordRef = useRef<TextInput | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await login(cdFun, password);
      await storeToken(token);
      navigation.navigate('Vendas');
    } catch {
      setError('Código ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        {error !== '' && <Text style={styles.message}>{error}</Text>}
        <Input
          placeholder="Código do Funcionário"
          keyboardType="numeric"
          leftIcon={<Icon name="user-alt" size={20} color="black" style={styles.icon} />}
          value={cdFun}
          onChangeText={setCdFun}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          disabled={loading}
        />
        <Input
          ref={passwordRef}
          placeholder="Senha"
          leftIcon={<Icon name="lock" size={20} color="black" style={styles.icon} />}
          rightIcon={
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Icon name={secure ? 'eye-slash' : 'eye'} size={19} color="black" />
            </TouchableOpacity>
          }
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secure}
          autoCapitalize="none"
          disabled={loading}
        />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={handleLogin}
          title="Entrar"
          loading={loading}
          disabled={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
