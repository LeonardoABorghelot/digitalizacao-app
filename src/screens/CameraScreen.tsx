import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { CameraCapturedPicture, CameraView as CameraViewType } from 'expo-camera';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { uploadImagem } from '../services/uploadService';
import styles from './CameraScreen.styles';

type CameraRouteProp = RouteProp<RootStackParamList, 'Camera'>;

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<CameraCapturedPicture[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<CameraCapturedPicture | null>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraViewType>(null);
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const route = useRoute<CameraRouteProp>();
  const { cd_vd, nr_ecf, dt_vd, modo = 'inicial' } = route.params;

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da sua permissão para usar a câmera</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: '#007bff',
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const tirarFoto = async () => {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync();
      setPhotos((prev) => [...prev, foto]);
    }
  };

  const enviarFotos = async () => {
    if (loading) return;

    if (photos.length === 0) {
      Alert.alert('Nenhuma imagem capturada.');
      return;
    }

    if (modo === 'inicial' && photos.length < 3) {
      Alert.alert(
        'Mínimo de imagens',
        'Você precisa digitalizar no mínimo 3 imagens antes de enviar.',
      );
      return;
    }

    setLoading(true);

    try {
      for (let i = 0; i < photos.length; i++) {
        const sucesso = await uploadImagem({
          fileUri: photos[i].uri,
          fileName: `imagem_${Date.now()}.jpg`,
          cd_vd,
          nr_ecf,
          dt_vd,
        });

        if (!sucesso) {
          Alert.alert('Erro ao enviar imagem', `Falha na imagem ${i + 1}`);
          return;
        }
      }

      Alert.alert('Sucesso', 'Todas as imagens foram enviadas!');
      setPhotos([]);
      navigation.goBack();
    } catch {
      Alert.alert('Erro inesperado', 'Não foi possível enviar as imagens.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />

      {/* Modal de visualização ampliada */}
      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.modalCloseArea} onPress={() => setSelectedPhoto(null)} />
          <View style={styles.modalContent}>
            {selectedPhoto && (
              <Image
                source={{ uri: selectedPhoto.uri }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPhoto(null)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Preview das fotos - fixo na parte inferior */}
      {photos.length > 0 && (
        <View style={styles.previewContainer}>
          <ScrollView horizontal style={styles.previewScroll}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.previewItem}>
                <TouchableOpacity onPress={() => setSelectedPhoto(photo)}>
                  <Image source={{ uri: photo.uri }} style={styles.preview} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    setPhotos((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Botões - fixos na parte inferior */}
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom || 10 }]}>
        <TouchableOpacity
          style={[styles.captureButtonAbsolute, { bottom: 10 + (insets.bottom || 0) }]}
          onPress={tirarFoto}
          activeOpacity={0.7}
        />
        {loading ? (
          <View style={[styles.sendButtonAbsolute, { bottom: 18 + (insets.bottom || 0) }]}>
            <ActivityIndicator size="small" color="#ffffff" />
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.sendButtonAbsolute,
              {
                bottom: 18 + (insets.bottom || 0),
                opacity: modo === 'inicial' && photos.length < 3 ? 0.5 : 1,
              },
            ]}
            onPress={enviarFotos}
            disabled={modo === 'inicial' && photos.length < 3}
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
