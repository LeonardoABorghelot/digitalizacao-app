import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from "../navegation/types";
import {
  buscarResumoRelatorio,
  buscarVendasDigitalizadas,
  buscarVendasPendentes,
  ReportSale,
  ReportSummary,
} from "../services/reportsService";

import styles from "./ReportsScreen.styles";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Reports">;

type Aba = "pendentes" | "digitalizadas";

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const ReportsScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const [dataReferencia, setDataReferencia] = useState(new Date());
  const [resumo, setResumo] = useState<ReportSummary | null>(null);
  const [vendas, setVendas] = useState<ReportSale[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<Aba>("pendentes");
  const [loading, setLoading] = useState(true);

  const mes = dataReferencia.getMonth() + 1;
  const ano = dataReferencia.getFullYear();

  const buscarDados = useCallback(async () => {
    setLoading(true);

    try {
      const [dadosResumo, dadosVendas] = await Promise.all([
        buscarResumoRelatorio(mes, ano),
        abaAtiva === "pendentes"
          ? buscarVendasPendentes(mes, ano)
          : buscarVendasDigitalizadas(mes, ano),
      ]);

      setResumo(dadosResumo);
      setVendas(dadosVendas);
    } catch (error) {
      console.error("Erro ao buscar relatório:", error);
      Alert.alert("Erro", "Não foi possível carregar o relatório.");
    } finally {
      setLoading(false);
    }
  }, [mes, ano, abaAtiva]);

  useFocusEffect(
    useCallback(() => {
      void buscarDados();
    }, [buscarDados]),
  );

  const trocarAba = (novaAba: Aba) => {
    setAbaAtiva(novaAba);
  };

  const alterarMes = (direcao: number) => {
    const novaData = new Date(ano, mes - 1 + direcao, 1);
    setDataReferencia(novaData);
  };

  const abrirVenda = (item: ReportSale) => {
    if (abaAtiva === "pendentes") {
      navigation.navigate("Camera", {
        cd_vd: item.cd_vd,
        nr_ecf: item.nr_ecf,
        dt_vd: item.dt_vd,
        modo: item.quantidade_imagens === 0 ? "inicial" : "nova",
      });
    } else {
      navigation.navigate("ViewImages", {
        cd_vd: item.cd_vd,
        nr_ecf: item.nr_ecf,
        dt_vd: item.dt_vd,
      });
    }
  };

  const renderVenda = (item: ReportSale) => {
    const quantidade = Number(item.quantidade_imagens) || 0;
    const atrasada = Number(item.atrasada) === 1 || item.atrasada === true;

    return (
      <TouchableOpacity
        key={`${item.cd_vd}-${item.nr_ecf}`}
        style={styles.vendaItem}
        onPress={() => abrirVenda(item)}
      >
        <View style={styles.vendaHeader}>
          <Text style={styles.vendaCupom}>Cupom {item.nr_ecf}</Text>

          <Text
            style={[
              styles.vendaStatus,
              abaAtiva === "digitalizadas"
                ? styles.statusCompleto
                : atrasada
                  ? styles.statusAtrasado
                  : styles.statusPendente,
            ]}
          >
            {abaAtiva === "digitalizadas"
              ? "Completa"
              : atrasada
                ? "Atrasada"
                : "Pendente"}
          </Text>
        </View>

        <Text style={styles.vendaCliente}>Cliente: {item.nome_cliente}</Text>

        <Text style={styles.vendaData}>Data: {item.dt_vd}</Text>

        <Text style={styles.vendaImagens}>Imagens: {quantidade}/3</Text>

        <Text style={styles.vendaAcao}>
          {abaAtiva === "pendentes"
            ? "Toque para continuar a digitalização"
            : "Toque para visualizar as imagens"}
        </Text>
      </TouchableOpacity>
    );
  };

  const percentual = Math.max(
    0,
    Math.min(100, Number(resumo?.percentualDigitalizado) || 0),
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>Relatório de vendas</Text>

      <View style={styles.periodoContainer}>
        <TouchableOpacity
          style={styles.botaoMes}
          onPress={() => alterarMes(-1)}
        >
          <Text style={styles.setaMes}>{"<"}</Text>
        </TouchableOpacity>

        <View style={styles.periodoTexto}>
          <Text style={styles.mesTexto}>{MESES[mes - 1]}</Text>
          <Text style={styles.anoTexto}>{ano}</Text>
        </View>

        <TouchableOpacity
          style={styles.botaoMes}
          onPress={() => alterarMes(1)}
          disabled={
            ano === new Date().getFullYear() &&
            mes === new Date().getMonth() + 1
          }
        >
          <Text style={styles.setaMes}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <>
          <Text style={styles.secaoTitulo}>Resumo do período</Text>

          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <Text style={styles.cardValor}>{resumo?.totalVendas ?? 0}</Text>
              <Text style={styles.cardDescricao}>Total de vendas</Text>
            </View>

            <View style={styles.card}>
              <Text style={[styles.cardValor, styles.valorVerde]}>
                {resumo?.totalDigitalizadas ?? 0}
              </Text>
              <Text style={styles.cardDescricao}>Digitalizadas</Text>
            </View>

            <View style={styles.card}>
              <Text style={[styles.cardValor, styles.valorVermelho]}>
                {resumo?.totalPendentes ?? 0}
              </Text>
              <Text style={styles.cardDescricao}>Pendentes</Text>
            </View>
          </View>

          <View style={styles.progressoContainer}>
            <View style={styles.progressoHeader}>
              <Text style={styles.secaoTitulo}>Progresso da digitalização</Text>

              <Text style={styles.percentual}>{percentual.toFixed(1)}%</Text>
            </View>

            <View style={styles.progressoFundo}>
              <View
                style={[
                  styles.progressoPreenchido,
                  { width: `${percentual}%` },
                ]}
              />
            </View>
          </View>

          <Text style={styles.secaoTitulo}>Vendas do período</Text>

          <View style={styles.abasContainer}>
            <TouchableOpacity
              style={[styles.aba, abaAtiva === "pendentes" && styles.abaAtiva]}
              onPress={() => trocarAba("pendentes")}
            >
              <Text
                style={[
                  styles.abaTexto,
                  abaAtiva === "pendentes" && styles.abaTextoAtivo,
                ]}
              >
                Pendentes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.aba,
                abaAtiva === "digitalizadas" && styles.abaAtiva,
              ]}
              onPress={() => trocarAba("digitalizadas")}
            >
              <Text
                style={[
                  styles.abaTexto,
                  abaAtiva === "digitalizadas" && styles.abaTextoAtivo,
                ]}
              >
                Digitalizadas
              </Text>
            </TouchableOpacity>
          </View>

          {vendas.length > 0 ? (
            vendas.map(renderVenda)
          ) : (
            <Text style={styles.semVendas}>
              Nenhuma venda encontrada neste período.
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ReportsScreen;
