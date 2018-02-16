import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Alert,
  StyleSheet,
  Button,
} from 'react-native';

export default class PostReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      stars: '',
      loading: false,
    };

    this.productId = this.props.navigation.state.params.productId;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Post review',
    };
  };

  async postReview() {
    this.setState({ loading: true });
    if (
      this.state.text.length < 1 ||
      Number(this.state.stars) < 0 ||
      Number(this.state.stars) > 5
    ) {
      Alert.alert('Invalid review');
    } else {
      const status = await fetch(
        `http://13.57.59.170/products/reviews/${this.productId}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            text: this.state.text,
            stars: this.state.stars,
          }),
        },
      );
      this.props.navigation.state.params.forceUpdate();
      this.props.navigation.goBack();
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <View>
        <StatusBar networkActivityIndicatorVisible={this.state.loading} />
        <Text>Text</Text>
        <TextInput
          style={styles.reviewInput}
          onChangeText={(text) => this.setState({ text })}
          returnKeyLabel="next"
          multiline={true}
          value={this.state.text}
        />
        <Text>Stars</Text>
        <TextInput
          style={styles.starsInput}
          onChangeText={(stars) => this.setState({ stars })}
          keyboardType="numeric"
          value={this.state.stars}
        />
        <Button title="Post review" onPress={() => this.postReview()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reviewInput: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
  },
  starsInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
