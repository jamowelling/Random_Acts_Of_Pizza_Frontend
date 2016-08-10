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
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      requests: []
    }
    this.onUserChange = this.onUserChange.bind(this);
    this.collectRequests = this.collectRequests.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }
  onUserChange(user) {
    this.setState({user})
  }
  collectRequests(requests) {
    this.setState({requests})
  }
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} onUserChange={this.onUserChange} user={this.state.user} collectRequests={this.collectRequests} requests={this.state.requests}/>;
  }
  render() {
    return (
      <Navigator
      initialRoute={{name: 'requests'}}
      renderScene={this.renderScene}
      configureScene={() =>  Navigator.SceneConfigs.FloatFromRight}

      />
    );
  }
};
