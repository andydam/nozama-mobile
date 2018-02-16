import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Alert,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import ProductsList from '../Components/ProductsList';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      loading: false,
      productsData: {
        results: [],
      },
      loggedIn: false,
    };

    this.props.navigation.setParams({
      toggleLogin: this.toggleLogin.bind(this),
      logOut: this.logOut.bind(this),
      loggedIn: false,
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: null,
      headerTitle: 'nozama',
      headerRight: navigation.state.params ? (
        navigation.state.params.loggedIn ? (
          <Button title="Logout" onPress={navigation.state.params.logOut} />
        ) : (
          <Button
            title="Login"
            onPress={() =>
              navigation.navigate('Login', {
                toggleLogin: navigation.state.params.toggleLogin,
              })
            }
          />
        )
      ) : null,
    };
  };

  async componentWillMount() {
    this.setState({ loading: true });
    const username = await AsyncStorage.getItem('username');
    if (username !== null) {
      const password = await AsyncStorage.getItem('password');
      const status = await fetch('http://13.57.59.170/auth', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (status.status === 200) {
        this.toggleLogin();
      } else {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');
        Alert.alert('Unable to login');
      }
    }
    this.setState({ loading: false });
  }

  async search() {
    this.setState({ loading: true });
    const products = await fetch(
      `http://13.57.59.170/products/search/${this.state.searchField}`,
      { credentials: 'include' },
    ).then((resp) => resp.json());
    if (!products.statusCode) {
      this.setState({ productsData: products });
    } else {
      Alert.alert(products.message);
    }
    this.setState({ loading: false });
  }

  async logOut() {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    await fetch('http://13.57.59.170/auth');
    this.toggleLogin();
  }

  toggleLogin() {
    this.setState({ loggedIn: !this.state.loggedIn });
    this.props.navigation.setParams({
      loggedIn: this.state.loggedIn,
    });
    this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar networkActivityIndicatorVisible={this.state.loading} />

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(searchField) => this.setState({ searchField })}
          onSubmitEditing={() => this.search()}
          returnKeyLabel="done"
          value={this.state.searchField}
        />
        <ProductsList
          products={this.state.productsData}
          navigation={this.props.navigation}
          loggedIn={this.state.loggedIn}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
