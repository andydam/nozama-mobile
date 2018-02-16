import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  item: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    flexWrap: 'wrap',
    flex: 5,
  },
  brand: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});

export default ({ navigation, product, loggedIn }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { product, loggedIn })}
    >
      <View style={styles.item}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>
            ${product.price ? Number(product.price).toFixed(2) : '0.00'}
          </Text>
        </View>
        {product.brand ? (
          <Text style={styles.brand}>Brand: {product.brand}</Text>
        ) : (
          undefined
        )}
      </View>
    </TouchableOpacity>
  );
};
