import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './navigation/types';
import CameraScreen from './screens/CameraScreen';
import LoginScreen from './screens/LoginScreen';
import VendaListScreen from './screens/VendaListScreen';
import VisualizarImagensScreen from './screens/VisualizarImagemScrem';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Vendas"
          component={VendaListScreen}
          options={{ title: 'Lista de Vendas' }}
        />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera' }} />
        <Stack.Screen
          name="ViewImages"
          component={VisualizarImagensScreen}
          options={{ title: 'Imagens da Venda' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
