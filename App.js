import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './src/Views/Home';
import Details from './src/Views/Details';
import Login from './src/Views/Login';
import PostReview from './src/Views/PostReview';

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
    Login: {
      screen: Login,
    },
    PostReview: {
      screen: PostReview,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
