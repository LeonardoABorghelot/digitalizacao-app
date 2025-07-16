import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { buscarVendas } from '../services/vendaService';
import styles from './VendaListScreen.styles';

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

const renderItem = ({ item }: { item: Venda }) => {
  const itemStyle = [
    styles.item,
    item.possui_imagem && styles.itemComImagem
  ];

  const handlePress = () => {
    if (item.possui_imagem) {
      Alert.alert(
        'Venda já digitalizada',
        'Esta venda já possui imagens digitalizadas.'
      );
    } else {
      navigation.navigate('Camera', {
        cd_vd: item.cd_vd,
        nr_ecf: item.nr_ecf,
        dt_vd: item.dt_vd,
      });
    }
  };

  return (
    <TouchableOpacity
      style={itemStyle}
      onPress={handlePress}
    >
      <Text style={styles.nr_ecf}>Cupom {item.nr_ecf}</Text>
      <Text style={styles.data}>Data: {item.dt_vd}</Text>
      <Text>Venda: {item.cd_vd}</Text>
      <Text>Autorização: {item.nr_autorizacao}</Text>
      <Text style={item.possui_imagem ? styles.textoVerde : styles.textoVermelho}>
        Imagem: {item.possui_imagem ? '✔️ Sim' : '❌ Não'}
      </Text>
    </TouchableOpacity>
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a data da venda:</Text>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateBox}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{dataVenda.toLocaleDateString()}</Text>
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

      {/* <Button title="Buscar vendas" onPress={buscar} /> */}
      <TouchableOpacity style={styles.botaoBuscar} onPress={buscar}>
        <Text style={styles.textoBotaoBuscar}>Buscar vendas</Text>
      </TouchableOpacity>
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
