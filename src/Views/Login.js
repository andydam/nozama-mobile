import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Alert,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: null,
      headerTitle: 'Login',
    };
  };

  async logIn() {
    this.setState({ loading: true });
    const status = await fetch('http://13.57.59.170/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });
    this.setState({ loading: false });
    if (status.status === 200) {
      await AsyncStorage.setItem('username', this.state.username);
      await AsyncStorage.setItem('password', this.state.password);
      this.props.navigation.state.params.toggleLogin();
      this.props.navigation.goBack();
    } else {
      Alert.alert('Unable to login');
    }
  }

  render() {
    return (
      <View>
        <StatusBar networkActivityIndicatorVisible={this.state.loading} />
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(username) => this.setState({ username })}
          returnKeyLabel="next"
          value={this.state.username}
          autoCorrect={false}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({ password })}
          returnKeyLabel="done"
          secureTextEntry={true}
          value={this.state.password}
          autoCorrect={false}
        />
        <Button title="Login" onPress={() => this.logIn()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
