import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({ review }) => {
  return (
    <View>
      <Text style={styles.text}>Text: {review.text}</Text>
      <Text style={styles.date}>
        Written on: {new Date(review.created_at).toLocaleDateString()}
      </Text>
      <Text style={styles.stars}>Stars: {'⭐'.repeat(review.stars)}</Text>
      <Text style={styles.credibility}>Credibility: {review.credibility}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  date: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  stars: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  credibility: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 10,
  },
});
