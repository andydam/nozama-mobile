import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DOMParser from 'react-native-html-parser';

export default ({ product }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.price}>
          ${product.price ? Number(product.price).toFixed(2) : '0.00'}
        </Text>
      </View>
      <Text style={styles.categories}>
        Categories: {product.categories.join(', ')}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    flexDirection: 'row',
    padding: 5,
  },
  brand: {
    fontSize: 20,
    padding: 5,
    flex: 1,
    textAlign: 'left',
  },
  price: {
    fontSize: 20,
    padding: 5,
    flex: 1,
    textAlign: 'right',
  },
  categories: {
    padding: 5,
  },
  description: {
    padding: 5,
    paddingBottom: 20,
  },
});
