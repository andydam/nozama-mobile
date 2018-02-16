import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import ProductsListEntry from './ProductsListEntry';

export default ({ products, navigation, loggedIn }) => {
  return (
    <View style={styles.container}>
      {products.results.length ? (
        <Text>
          {products.totalItems} items found, displaying{' '}
          {products.firstItemIndex} - {products.lastItemIndex} items
        </Text>
      ) : (
        undefined
      )}
      <FlatList
        data={products.results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductsListEntry
            product={item}
            navigation={navigation}
            loggedIn={loggedIn}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
