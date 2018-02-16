import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

import ProductsDetails from '../Components/ProductsDetails';
import ReviewsList from '../Components/ReviewsList';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.product = this.props.navigation.state.params.product;

    this.state = {
      refreshReviews: false,
    };
    this.props.navigation.setParams({
      forceUpdate: this.refresh.bind(this),
    });
  }

  refresh() {
    this.setState({ forceUpdate: true });
    this.setState({ forceUpdate: false });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: null,
      headerTitle: navigation.state.params.product.name,
      headerRight: navigation.state.params ? (
        navigation.state.params.loggedIn ? (
          <Button
            title="+ review"
            onPress={() =>
              navigation.navigate('PostReview', {
                productId: navigation.state.params.product.id,
                forceUpdate: navigation.state.params.forceUpdate,
              })
            }
          />
        ) : null
      ) : null,
    };
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ProductsDetails product={this.product} />
        <ReviewsList
          product={this.product}
          forceUpdate={this.state.forceUpdate}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
