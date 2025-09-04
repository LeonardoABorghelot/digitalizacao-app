import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  View
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { RootStackParamList } from '../navigation/types';
import { buscarImagens } from '../services/imageService';
import styles from './VisualizarImagemScrem.styles';

type RouteProps = RouteProp<RootStackParamList, 'ViewImages'>;

type ImagemVenda = {
  nome: string;
  dt_vd: string;
  cd_vd: number;
  nr_ecf: number;
  imagem_base64: string;
};

const VisualizarImagensScreen = () => {
  const route = useRoute<RouteProps>();
  const { cd_vd, nr_ecf, dt_vd } = route.params;

  const [imagens, setImagens] = useState<ImagemVenda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarImagens = async () => {
      try {
        const dados = await buscarImagens(cd_vd, nr_ecf, dt_vd);
        setImagens(dados);
      } catch (error) {
        console.error('Erro ao carregar imagens:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarImagens();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (imagens.length === 0) {
    return <Text style={styles.emptyText}>Nenhuma imagem encontrada.</Text>;
  }

  return (
    <View style={styles.container}>
      
      <PagerView style={styles.pagerView} initialPage={0}>
        {imagens.map((img, idx) => (
          <View style={styles.page} key={idx}>
            <Text style={styles.nome}>{img.nome}</Text>
            <Image
              source={{ uri: `data:image/jpeg;base64,${img.imagem_base64}` }}
              style={styles.imagem}
              resizeMode="contain"
              onError={(e) =>
                console.log('Erro ao carregar imagem:', e.nativeEvent)
              }
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default VisualizarImagensScreen;