import React, { Component } from 'react';
import { Navigator } from 'react-native';
import UserProfile from './components/UserProfile';
import Requests from './components/Requests';
import Request from './components/Request';
import NewRequest from './components/NewRequest';
import Camera from './components/Camera';
import Main from './components/Main';
import Instructions from './components/Instructions';
import FBSDK, { AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import GuestView from './components/GuestView';

const ROUTES = {
  main: Main,
  guestView: GuestView,
  instructions: Instructions,
  userProfile: UserProfile,
  requests: Requests,
  request: Request,
  newRequest: NewRequest,
  camera: Camera,
};

export default class Raop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      guestDonation: false,
      currentEmail: '',
      requests: [],
      totalDonatedPizzas: 0,
      url: '',
      activeDonation: null,
    }
    this.onUserChange = this.onUserChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.collectRequests = this.collectRequests.bind(this);
    this.sumDonatedPizzas = this.sumDonatedPizzas.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handleGuestDonation = this.handleGuestDonation.bind(this);
    this.handleWelcomeUrl = this.handleWelcomeUrl.bind(this);
    this.handleActiveDonation = this.handleActiveDonation.bind(this);
  }
  createSession(userInfo) {
    fetch('http://random-acts-of-pizza.herokuapp.com/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({userInfo})
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      this.onUserChange(responseJson.user)
      this.onEmailChange(responseJson.email)
      this.handleActiveDonation(responseJson.activeDonation)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentDidMount() {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
          const accessToken = data.accessToken
          const responseInfoCallback = (error, result) => {
            if (error) {
              alert('Error fetching data: ' + error.toString());
            } else {
              this.createSession(result)
            }
          }
          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name'
                }
              }
            },
            responseInfoCallback
          );
          new GraphRequestManager().addRequest(infoRequest).start()
        }
      }
    )
  }
  onUserChange(user) {
    this.setState({user})
  }
  handleGuestDonation(guestDonation) {
    this.setState({guestDonation})
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
  handleWelcomeUrl(url) {
    this.setState({url})
  }
  handleActiveDonation(activeDonation) {
    this.setState({activeDonation})
  }
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} onUserChange={this.onUserChange} user={this.state.user} onGuestDonation={this.handleGuestDonation} guestDonation={this.state.guestDonation} onEmailChange={this.onEmailChange} currentEmail={this.state.currentEmail} collectRequests={this.collectRequests} requests={this.state.requests} sumDonatedPizzas={this.sumDonatedPizzas} totalDonatedPizzas={this.state.totalDonatedPizzas} url={this.state.url} handleWelcomeUrl={this.handleWelcomeUrl} collectActiveDonation={this.handleActiveDonation} activeDonation={this.state.activeDonation} />;
  }
  render() {
    const sceneConfig = (renderScene) => {
      if (renderScene.name === 'userProfile') {
        return Navigator.SceneConfigs.FloatFromLeft
      } else if (renderScene.name === 'newRequest'){
        return Navigator.SceneConfigs.FloatFromRight
      } else if (renderScene.name === 'instructions') {
        return Navigator.SceneConfigs.VerticalUpSwipeJump
      } else {
        return Navigator.SceneConfigs.FloatFromRight
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
