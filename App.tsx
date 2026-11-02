import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./navegation/types";

import CameraScreen from "./screens/CameraScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ReportsScreen from "./screens/ReportsScreen";
import VendaListScreen from "./screens/VendaListScreen";
import VisualizarImagensScreen from "./screens/VisualizarImagemScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Menu Principal",
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="Vendas"
          component={VendaListScreen}
          options={{ title: "Vendas" }}
        />

        <Stack.Screen
          name="Reports"
          component={ReportsScreen}
          options={{ title: "Relatório de Vendas" }}
        />

        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: "Câmera" }}
        />

        <Stack.Screen
          name="ViewImages"
          component={VisualizarImagensScreen}
          options={{ title: "Imagens da Venda" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
