import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { buscarVendas } from '../services/vendaService';

type Venda = {
  cd_vd: number;
  dt_vd: string;
  nr_ecf: number;
  nr_autorizacao: string;
  possui_imagem: boolean;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Vendas'>;

const VendaListScreen = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataVenda, setDataVenda] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const buscar = async () => {
    setLoading(true);
    try {
      const dataFormatada = dataVenda.toISOString().split('T')[0]; // YYYY-MM-DD
      const dados = await buscarVendas(dataFormatada);
      setVendas(dados);
    } catch (err) {
      console.error('Erro ao buscar vendas:', err);
    } finally {
      setLoading(false);
    }
  };

const renderItem = ({ item }: { item: Venda }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() =>
      navigation.navigate('Camera', {
        cd_vd: item.cd_vd,
        nr_ecf: item.nr_ecf,
        dt_vd: item.dt_vd,
      })
}
  >
    <Text style={styles.codigo}>Venda {item.cd_vd}</Text>
    <Text style={styles.data}>Data: {item.dt_vd}</Text>
    <Text>ECF: {item.nr_ecf}</Text>
    <Text>Autorização: {item.nr_autorizacao}</Text>
    <Text>Imagem: {item.possui_imagem ? '✔️ Sim' : '❌ Não'}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a data da venda:</Text>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateBox}>
        <Text>{dataVenda.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dataVenda}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDataVenda(selectedDate);
          }}
        />
      )}

      <Button title="Buscar vendas" onPress={buscar} />
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      <FlatList
        data={vendas}
        keyExtractor={(item) => item.cd_vd.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          !loading ? <Text style={{ marginTop: 20 }}>Nenhuma venda encontrada.</Text> : null
        }
      />
    </View>
  );
};

export default VendaListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  codigo: { fontWeight: 'bold', fontSize: 16 },
  data: { color: '#777' },
});
