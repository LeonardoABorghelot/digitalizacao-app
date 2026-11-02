import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../navegation/types";
import { buscarVendas } from "../services/vendaService";
import styles from "./VendaListScreen.styles";

type Venda = {
  cd_vd: number;
  dt_vd: string;
  nr_ecf: number;
  nome_cliente: string;
  quantidade_imagens: number;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Vendas">;

const VendaListScreen = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataVenda, setDataVenda] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const jaBuscouRef = useRef(false);
  const buscar = useCallback(async () => {
    setLoading(true);

    try {
      const dataFormatada = dataVenda.toISOString().split("T")[0];
      const dados = await buscarVendas(dataFormatada);

      setVendas(dados);
      jaBuscouRef.current = true;
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);

      Alert.alert("Erro", "Não foi possível buscar as vendas.");
    } finally {
      setLoading(false);
    }
  }, [dataVenda]);

  useFocusEffect(
    useCallback(() => {
      if (jaBuscouRef.current) {
        void buscar();
      }
    }, [buscar]),
  );

  const renderItem = ({ item }: { item: Venda }) => {
    const quantidadeImagens = Number(item.quantidade_imagens) || 0;
    const digitalizacaoCompleta = quantidadeImagens >= 3;
    const digitalizacaoIncompleta =
      quantidadeImagens > 0 && quantidadeImagens < 3;

    const itemStyle = [
      styles.item,

      digitalizacaoCompleta && styles.itemComImagem,

      digitalizacaoIncompleta && styles.itemImagemIncompleta,
    ];

    let textoStatus = "❌ Não digitalizada";
    let estiloStatus = styles.textoVermelho;

    if (digitalizacaoCompleta) {
      textoStatus = `✔️ Completa (${quantidadeImagens} imagens)`;

      estiloStatus = styles.textoVerde;
    } else if (digitalizacaoIncompleta) {
      textoStatus = `⚠️ Incompleta (${quantidadeImagens}/3 imagens)`;

      estiloStatus = styles.textoAmarelo;
    }

    const abrirCamera = () => {
      navigation.navigate("Camera", {
        cd_vd: item.cd_vd,
        nr_ecf: item.nr_ecf,
        dt_vd: item.dt_vd,
        modo: quantidadeImagens === 0 ? "inicial" : "nova",
      });
    };

    const visualizarImagens = () => {
      navigation.navigate("ViewImages", {
        cd_vd: item.cd_vd,
        nr_ecf: item.nr_ecf,
        dt_vd: item.dt_vd,
      });
    };

    const handlePress = () => {
      if (quantidadeImagens === 0) {
        abrirCamera();
        return;
      }

      const titulo = digitalizacaoCompleta
        ? "Venda digitalizada"
        : "Digitalização incompleta";

      const mensagem = digitalizacaoCompleta
        ? "O que você deseja fazer?"
        : `Esta venda possui ${quantidadeImagens} de 3 imagens obrigatórias.`;

      Alert.alert(
        titulo,
        mensagem,
        [
          {
            text: "Visualizar imagens",
            onPress: visualizarImagens,
          },
          {
            text: digitalizacaoCompleta
              ? "Digitalizar nova imagem"
              : "Adicionar imagem",
            onPress: abrirCamera,
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        },
      );
    };

    return (
      <TouchableOpacity style={itemStyle} onPress={handlePress}>
        <Text style={styles.nr_ecf}>Cupom {item.nr_ecf}</Text>

        <Text style={styles.data}>Data: {item.dt_vd}</Text>

        <Text>Cliente: {item.nome_cliente}</Text>

        <Text style={estiloStatus}>Digitalização: {textoStatus}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a data da venda:</Text>

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.dateBox}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {dataVenda.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dataVenda}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          themeVariant="light"
          onValueChange={(_, selectedDate) => {
            setDataVenda(selectedDate);
            setShowPicker(false);
          }}
          onDismiss={() => {
            setShowPicker(false);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.botaoBuscar}
        onPress={buscar}
        disabled={loading}
      >
        <Text style={styles.textoBotaoBuscar}>Buscar vendas</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          style={{
            marginTop: 20,
          }}
        />
      )}

      <FlatList
        data={vendas}
        keyExtractor={(item) => item.cd_vd.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          !loading ? (
            <Text
              style={{
                marginTop: 20,
                textAlign: "center",
              }}
            >
              Nenhuma venda encontrada.
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default VendaListScreen;
