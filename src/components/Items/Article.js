import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Article = (props) => {
  const { nom, prix, description, couleur, stock } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.nom}>{nom}</Text>
      <Text style={styles.prix}>{prix} €</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.couleur}>Couleur : {couleur}</Text>
      <Text style={styles.stock}>Stock : {stock}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
  nom: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  prix: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 11,
    marginBottom: 5,
  },
  couleur: {
    fontSize: 14,
    marginBottom: 5,
  },
  stock: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Article;
