import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Signin from './components/signin';
import Requests from './components/requests';

const ROUTES = {
  signin: Signin,
  requests: Requests
};

export default class Raop extends Component {
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }
  render() {
    return (
      <Navigator
      initialRoute={{name: 'requests'}}
      renderScene={this.renderScene}
      configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
      />
    );
  }
};
