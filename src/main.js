import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Signin from './components/signin';
import UserProfile from './components/user_profile';
import Requests from './components/requests';
import NewRequest from './components/new_request';

const ROUTES = {
  signin: Signin,
  userProfile: UserProfile,
  requests: Requests,
  new_request: NewRequest
};

export default class Raop extends Component {

  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator}/>;
  }
  render() {
    return (
      <Navigator
      initialRoute={{name: 'signin'}}
      renderScene={this.renderScene}
      configureScene={() =>  Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
};
