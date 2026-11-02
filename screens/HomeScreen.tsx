import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { colors } from "@/theme/colors";
import { RootStackParamList } from "../navegation/types";
import styles from "./HomeScreen.styles";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Bem-vindo!</Text>
        <Text style={styles.subtitulo}>
          Selecione uma funcionalidade para continuar.
        </Text>
      </View>

      <View style={styles.opcoesContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Vendas")}
          activeOpacity={0.8}
        >
          <View style={styles.iconeContainer}>
            <Icon name="shopping-cart" size={30} color={colors.secondary} />
          </View>

          <Text style={styles.cardTitulo}>Vendas</Text>

          <Text style={styles.cardDescricao}>
            Consulte vendas e realize a digitalização de documentos fiscais.
          </Text>

          <Text style={styles.cardAcao}>Acessar vendas →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Reports")}
          activeOpacity={0.8}
        >
          <View style={styles.iconeContainer}>
            <Icon name="chart-bar" size={30} color={colors.primary} />
          </View>

          <Text style={styles.cardTitulo}>Relatórios</Text>

          <Text style={styles.cardDescricao}>
            Acompanhe as vendas digitalizadas e as pendências do período.
          </Text>

          <Text style={styles.cardAcao}>Visualizar relatórios →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
