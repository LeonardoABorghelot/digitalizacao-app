import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  nome: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  imagem: {
    width: width - 32,
    height: 500,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  emptyText: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default styles;
