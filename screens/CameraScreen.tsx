import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type {
  CameraCapturedPicture,
  CameraView as CameraViewType,
} from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";

import { CameraView, useCameraPermissions } from "expo-camera";

import React, { useRef, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootStackParamList } from "../navegation/types";

import { OCRResponse, processarDocumentoOCR } from "../services/ocrService";

import { uploadImagem } from "../services/uploadService";

import styles from "./CameraScreen.styles";

type CameraRouteProp = RouteProp<RootStackParamList, "Camera">;

type EtapaCamera = "documento" | "validando" | "demaisFotos";

const DELAY_FOCO_MS = 350;

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [photos, setPhotos] = useState<CameraCapturedPicture[]>([]);

  const [selectedPhoto, setSelectedPhoto] =
    useState<CameraCapturedPicture | null>(null);

  const [etapa, setEtapa] = useState<EtapaCamera>("documento");

  const [documentoValidado, setDocumentoValidado] = useState(false);

  const [resultadoOCR, setResultadoOCR] = useState<OCRResponse | null>(null);

  const [enviando, setEnviando] = useState(false);

  const [cameraReady, setCameraReady] = useState(false);

  const [capturando, setCapturando] = useState(false);

  const cameraRef = useRef<CameraViewType>(null);

  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const route = useRoute<CameraRouteProp>();

  const { cd_vd, nr_ecf, dt_vd, modo = "inicial" } = route.params;

  React.useEffect(() => {
    const travarOrientacao = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };

    travarOrientacao();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  React.useEffect(() => {
    if (modo === "nova") {
      setEtapa("demaisFotos");
      setDocumentoValidado(true);
    }
  }, [modo]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da sua permissão para usar a câmera
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#007bff",
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            Conceder Permissão
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const validarDocumento = async (foto: CameraCapturedPicture) => {
    try {
      setEtapa("validando");

      const resultado = await processarDocumentoOCR({
        fileUri: foto.uri,
        fileName: `documento_${Date.now()}.jpg`,
        cd_vd,
      });

      if (!resultado) {
        setEtapa("documento");

        Alert.alert(
          "Falha na leitura",
          "Não foi possível processar o documento. Tente tirar outra foto.",
        );

        return;
      }

      setResultadoOCR(resultado);

      if (resultado.documentoValido) {
        setPhotos([foto]);

        setDocumentoValidado(true);

        setEtapa("demaisFotos");

        Alert.alert(
          "Documento validado",
          `Cliente: ${resultado.cliente.nome}\nCPF identificado: ${
            resultado.cpf ?? "Não identificado"
          }\n\nAgora fotografe a receita e a autorização.`,
        );

        return;
      }

      Alert.alert(
        "Documento não corresponde",
        `CPF identificado: ${
          resultado.cpf ?? "Não identificado"
        }\n\nCliente da venda: ${resultado.cliente.nome}\nCPF cadastrado: ${
          resultado.cliente.cpf
        }`,
        [
          {
            text: "Tirar outra foto",
            style: "cancel",

            onPress: () => {
              setResultadoOCR(null);
              setEtapa("documento");
            },
          },
          {
            text: "Continuar mesmo assim",

            onPress: () => {
              setPhotos([foto]);

              setDocumentoValidado(true);

              setEtapa("demaisFotos");
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    } catch (error) {
      console.error("Erro ao validar documento:", error);

      setEtapa("documento");

      Alert.alert("Erro", "Não foi possível validar o documento.");
    }
  };

  const tirarFoto = async () => {
    if (
      !cameraRef.current ||
      !cameraReady ||
      capturando ||
      etapa === "validando" ||
      enviando
    ) {
      return;
    }

    try {
      setCapturando(true);

      await new Promise((resolve) => setTimeout(resolve, DELAY_FOCO_MS));

      const foto = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: false,
      });

      if (!foto) {
        return;
      }

      if (modo === "inicial" && etapa === "documento") {
        await validarDocumento(foto);

        return;
      }

      setPhotos((prev) => [...prev, foto]);
    } catch (error) {
      console.error("Erro ao tirar foto:", error);

      Alert.alert("Erro", "Não foi possível capturar a imagem.");
    } finally {
      setCapturando(false);
    }
  };

  const excluirFoto = (index: number) => {
    if (modo === "inicial" && index === 0) {
      Alert.alert(
        "Remover documento",
        "Ao remover o documento será necessário validá-lo novamente.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },

          {
            text: "Remover",
            style: "destructive",

            onPress: () => {
              setPhotos((prev) => prev.filter((_, i) => i !== index));

              setDocumentoValidado(false);
              setResultadoOCR(null);
              setEtapa("documento");
            },
          },
        ],
      );

      return;
    }

    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const enviarFotos = async () => {
    if (photos.length === 0) {
      Alert.alert("Nenhuma imagem capturada.");

      return;
    }

    if (modo === "inicial" && !documentoValidado) {
      Alert.alert(
        "Documento não validado",
        "Valide primeiro o documento do comprador.",
      );

      return;
    }

    if (modo === "inicial" && photos.length < 3) {
      Alert.alert(
        "Mínimo de imagens",
        "Você precisa digitalizar no mínimo 3 imagens: documento, receita e autorização.",
      );

      return;
    }

    try {
      setEnviando(true);

      for (let i = 0; i < photos.length; i++) {
        let fileName;

        if (modo === "inicial" && i === 0) {
          fileName = `documento_${Date.now()}.jpg`;
        } else if (modo === "inicial" && i === 1) {
          fileName = `receita_${Date.now()}.jpg`;
        } else if (modo === "inicial" && i === 2) {
          fileName = `autorizacao_${Date.now()}.jpg`;
        } else {
          fileName = `imagem_${Date.now()}_${i}.jpg`;
        }

        const sucesso = await uploadImagem({
          fileUri: photos[i].uri,
          fileName,
          cd_vd,
          nr_ecf,
          dt_vd,
        });

        if (!sucesso) {
          Alert.alert("Erro ao enviar imagem", `Falha na imagem ${i + 1}`);

          return;
        }
      }

      Alert.alert("Sucesso", "Todas as imagens foram enviadas!");

      setPhotos([]);
      setDocumentoValidado(false);
      setResultadoOCR(null);

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);

      Alert.alert("Erro", "Não foi possível enviar as imagens.");
    } finally {
      setEnviando(false);
    }
  };

  const textoEtapa = () => {
    if (modo === "nova") {
      return "Capture a nova imagem";
    }

    if (etapa === "documento") {
      return "Fotografe o documento do comprador";
    }

    if (etapa === "validando") {
      return "Validando documento...";
    }

    if (photos.length === 1) {
      return "Documento validado. Agora fotografe a receita";
    }

    if (photos.length === 2) {
      return "Agora fotografe a autorização";
    }

    return "Você pode enviar ou adicionar mais imagens";
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        ref={cameraRef}
        autofocus="on"
        onCameraReady={() => setCameraReady(true)}
      />

      {/* Instrução da etapa atual */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 10,
          left: 20,
          right: 20,
          backgroundColor: "rgba(0,0,0,0.65)",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {textoEtapa()}
        </Text>
      </View>

      {/* Overlay enquanto a câmera ainda não está pronta */}
      {!cameraReady && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />

          <Text
            style={{
              color: "#fff",
              marginTop: 10,
            }}
          >
            Preparando câmera...
          </Text>
        </View>
      )}

      {/* Overlay enquanto OCR processa */}
      {etapa === "validando" && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />

          <Text
            style={{
              color: "#fff",
              marginTop: 15,
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Validando documento...
          </Text>

          <Text
            style={{
              color: "#fff",
              marginTop: 5,
            }}
          >
            Aguarde enquanto verificamos o CPF
          </Text>
        </View>
      )}

      {/* Modal de visualização */}
      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.modalCloseArea}
            onPress={() => setSelectedPhoto(null)}
          />

          <View style={styles.modalContent}>
            {selectedPhoto && (
              <Image
                source={{
                  uri: selectedPhoto.uri,
                }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedPhoto(null)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Preview */}
      {photos.length > 0 && (
        <View style={styles.previewContainer}>
          <ScrollView horizontal style={styles.previewScroll}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.previewItem}>
                <TouchableOpacity onPress={() => setSelectedPhoto(photo)}>
                  <Image
                    source={{
                      uri: photo.uri,
                    }}
                    style={styles.preview}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => excluirFoto(index)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>

                {modo === "inicial" && (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                    }}
                  >
                    {index === 0
                      ? "Documento"
                      : index === 1
                        ? "Receita"
                        : index === 2
                          ? "Autorização"
                          : `Imagem ${index + 1}`}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Botões */}
      <View
        style={[
          styles.buttonContainer,
          {
            paddingBottom: insets.bottom || 10,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.captureButtonAbsolute,
            {
              bottom: 10 + (insets.bottom || 0),

              opacity:
                !cameraReady || capturando || etapa === "validando" || enviando
                  ? 0.5
                  : 1,
            },
          ]}
          onPress={tirarFoto}
          activeOpacity={0.7}
          disabled={
            !cameraReady || capturando || etapa === "validando" || enviando
          }
        />

        <TouchableOpacity
          style={[
            styles.sendButtonAbsolute,
            {
              bottom: 18 + (insets.bottom || 0),

              opacity:
                enviando ||
                etapa === "validando" ||
                (modo === "inicial" && photos.length < 3)
                  ? 0.5
                  : 1,
            },
          ]}
          onPress={enviarFotos}
          disabled={
            enviando ||
            etapa === "validando" ||
            (modo === "inicial" && photos.length < 3)
          }
        >
          <Text style={styles.sendButtonText}>
            {enviando ? "Enviando..." : "Enviar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
