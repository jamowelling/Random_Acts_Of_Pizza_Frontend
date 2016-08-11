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
      currentEmail: '',
      requests: [],
      totalDonatedPizzas: null
    }
    this.onUserChange = this.onUserChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.collectRequests = this.collectRequests.bind(this);
    this.sumDonatedPizzas = this.sumDonatedPizzas.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }
  onUserChange(user) {
    this.setState({user})
  }
  onEmailChange(currentEmail) {
    this.setState({currentEmail})
  }
  collectRequests(requests) {
    this.setState({requests})
  }
  sumDonatedPizzas(totalDonatedPizzas) {
    this.setState({totalDonatedPizzas})
  }
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} onUserChange={this.onUserChange} user={this.state.user} onEmailChange={this.onEmailChange} currentEmail={this.state.currentEmail} collectRequests={this.collectRequests} requests={this.state.requests} sumDonatedPizzas={this.sumDonatedPizzas} totalDonatedPizzas={this.state.totalDonatedPizzas}/>;
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
