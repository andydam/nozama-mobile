import React, { Component } from 'react';
import { View, FlatList, Text, StatusBar } from 'react-native';

import ReviewsListEntry from './ReviewsListEntry';

export default class ReviewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      status: '',
      loading: true,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const reviews = await fetch(
      `http://13.57.59.170/products/reviews/${this.props.product.id}`,
      { credentials: 'include' },
    ).then((resp) => resp.json());
    if (reviews.statusCode === 404) {
      this.setState({ status: 'No reviews found for product' });
    } else {
      this.setState({ reviews, status: `${reviews.length} reviews` });
    }
    this.setState({ loading: false });
  }

  async componentWillUpdate() {
    if (this.props.forceUpdate) {
      this.setState({ loading: true });
      const reviews = await fetch(
        `http://13.57.59.170/products/reviews/${this.props.product.id}`,
        { credentials: 'include' },
      ).then((resp) => resp.json());
      if (reviews.statusCode === 404) {
        this.setState({ status: 'No reviews found for product' });
      } else {
        this.setState({ reviews, status: `${reviews.length} reviews` });
      }
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <View>
        <StatusBar networkActivityIndicatorVisible={this.state.loading} />
        <Text style={{ padding: 5 }}>{this.state.status}</Text>
        <FlatList
          data={this.state.reviews}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <ReviewsListEntry review={item} />}
        />
      </View>
    );
  }
}
