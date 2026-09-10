import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { RootStackParamList } from "../navegation/types";
import { buscarImagens, excluirImagem } from "../services/imageService";
import styles from "./VisualizarImagemScrem.styles";

type RouteProps = RouteProp<RootStackParamList, "ViewImages">;

type ImagemVenda = {
  id: number;
  nome: string;
  dt_vd: string;
  cd_vd: number;
  nr_ecf: number;
  cd_filial: number;
  imagem_base64: string;
};

const VisualizarImagensScreen = () => {
  const route = useRoute<RouteProps>();

  const { cd_vd, nr_ecf, dt_vd } = route.params;

  const [imagens, setImagens] = useState<ImagemVenda[]>([]);

  const [loading, setLoading] = useState(true);

  const [excluindoId, setExcluindoId] = useState<number | null>(null);

  useEffect(() => {
    const carregarImagens = async () => {
      try {
        setLoading(true);

        const dados = await buscarImagens(cd_vd, nr_ecf, dt_vd);

        setImagens(dados);
      } catch (error) {
        console.error("Erro ao carregar imagens:", error);

        Alert.alert("Erro", "Não foi possível carregar as imagens.");
      } finally {
        setLoading(false);
      }
    };

    carregarImagens();
  }, [cd_vd, nr_ecf, dt_vd]);

  const confirmarExclusao = (imagem: ImagemVenda) => {
    Alert.alert(
      "Excluir imagem",
      `Deseja realmente excluir "${imagem.nome}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",

          onPress: async () => {
            try {
              setExcluindoId(imagem.id);

              const sucesso = await excluirImagem(imagem.id);

              if (!sucesso) {
                Alert.alert("Erro", "Não foi possível excluir a imagem.");

                return;
              }

              setImagens((imagensAtuais) =>
                imagensAtuais.filter((item) => item.id !== imagem.id),
              );

              Alert.alert("Sucesso", "Imagem excluída com sucesso.");
            } catch (error) {
              console.error("Erro ao excluir imagem:", error);

              Alert.alert("Erro", "Não foi possível excluir a imagem.");
            } finally {
              setExcluindoId(null);
            }
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 20,
        }}
      />
    );
  }

  if (imagens.length === 0) {
    return <Text style={styles.emptyText}>Nenhuma imagem encontrada.</Text>;
  }

  return (
    <View style={styles.container}>
      <PagerView
        key={imagens.map((imagem) => imagem.id).join("-")}
        style={styles.pagerView}
        initialPage={0}
      >
        {imagens.map((img) => (
          <View style={styles.page} key={img.id}>
            <Text style={styles.nome}>{img.nome}</Text>

            <Image
              source={{
                uri: `data:image/jpeg;base64,` + img.imagem_base64,
              }}
              style={styles.imagem}
              resizeMode="contain"
              onError={(event) =>
                console.log("Erro ao carregar imagem:", event.nativeEvent)
              }
            />

            <TouchableOpacity
              style={styles.botaoExcluir}
              disabled={excluindoId === img.id}
              onPress={() => confirmarExclusao(img)}
            >
              {excluindoId === img.id ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.textoBotaoExcluir}>Excluir imagem</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default VisualizarImagensScreen;
