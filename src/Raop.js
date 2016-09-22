import React, { Component } from 'react';
import { Navigator } from 'react-native';
import UserProfile from './components/UserProfile';
import Requests from './components/Requests';
import Request from './components/Request';
import NewRequest from './components/NewRequest';
import Camera from './components/Camera';
import Main from './components/Main';
import Instructions from './components/Instructions';

const ROUTES = {
  main: Main,
  instructions: Instructions,
  userProfile: UserProfile,
  requests: Requests,
  request: Request,
  newRequest: NewRequest,
  camera: Camera
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
    const sceneConfig = (renderScene) => {
      if (renderScene.name === 'userProfile') {
        return Navigator.SceneConfigs.FloatFromLeft
      } else if (renderScene.name === 'newRequest'){
        return Navigator.SceneConfigs.FloatFromRight
      } else if (renderScene.name === 'instructions') {
        return Navigator.SceneConfigs.VerticalUpSwipeJump
      }
    }
    return (
      <Navigator
      initialRoute={{name: 'main'}}
      renderScene={this.renderScene}
      configureScene={sceneConfig}
      />
    );
  }
};
