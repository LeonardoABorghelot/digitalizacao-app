import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { RootStackParamList } from '../navigation/types';
import { buscarImagens, deletarImagem } from '../services/imageService';
import styles from './VisualizarImagemScrem.styles';

type RouteProps = RouteProp<RootStackParamList, 'ViewImages'>;

type ImagemVenda = {
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
  const [deletando, setDeletando] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(0);

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

  const handleDeletarImagem = async (imagem: ImagemVenda, index: number) => {
    Alert.alert('Confirmar exclusão', `Deseja realmente excluir a imagem "${imagem.nome}"?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setDeletando(true);
          try {
            await deletarImagem(
              imagem.nome,
              imagem.cd_vd,
              imagem.cd_filial,
              imagem.nr_ecf,
              imagem.dt_vd,
            );

            const novasImagens = imagens.filter((_, idx) => idx !== index);
            setImagens(novasImagens);

            if (paginaAtual >= novasImagens.length && paginaAtual > 0) {
              setPaginaAtual(novasImagens.length - 1);
            }

            Alert.alert('Sucesso', 'Imagem excluída com sucesso!');
          } catch (error) {
            console.error('Erro ao deletar imagem:', error);
            Alert.alert('Erro', 'Não foi possível excluir a imagem. Tente novamente.');
          } finally {
            setDeletando(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (imagens.length === 0) {
    return <Text style={styles.emptyText}>Nenhuma imagem encontrada.</Text>;
  }

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setPaginaAtual(e.nativeEvent.position)}
      >
        {imagens.map((img, idx) => (
          <View style={styles.page} key={idx}>
            <View style={styles.header}>
              <Text style={styles.nome}>{img.nome}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletarImagem(img, idx)}
                disabled={deletando}
              >
                {deletando ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                )}
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: `data:image/jpeg;base64,${img.imagem_base64}` }}
              style={styles.imagem}
              resizeMode="contain"
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default VisualizarImagensScreen;
