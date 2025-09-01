import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  label: { fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#333' },
  dateBox: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    padding: 14,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginTop: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemComImagem: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  nr_ecf: { fontWeight: 'bold', fontSize: 17, color: '#222' },
  data: { color: '#777', marginBottom: 4 },
  textoVerde: { color: '#388e3c', fontWeight: 'bold' },
  textoVermelho: { color: '#d32f2f', fontWeight: 'bold' },
  botaoBuscar: {
    backgroundColor: '#0EB200',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  textoBotaoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default styles; 