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
      totalDonatedPizzas: null,
      url: 'https://random-acts-of-pizza.s3-us-west-2.amazonaws.com/iwantpizza.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJPDTXLXBYZIR4XSQ%2F20160924%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20160924T045602Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=96e38daf0a5a8f5f15bc5a86438b69f1ca9ef86b7cfe09c25a7d775bfddd1dac'
    }
    this.onUserChange = this.onUserChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.collectRequests = this.collectRequests.bind(this);
    this.sumDonatedPizzas = this.sumDonatedPizzas.bind(this);
    this.renderScene = this.renderScene.bind(this);
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
    return <Component route={route} navigator={navigator} onUserChange={this.onUserChange} user={this.state.user} onEmailChange={this.onEmailChange} currentEmail={this.state.currentEmail} collectRequests={this.collectRequests} requests={this.state.requests} sumDonatedPizzas={this.sumDonatedPizzas} totalDonatedPizzas={this.state.totalDonatedPizzas} url={this.state.url} />;
  }
  render() {
    const sceneConfig = (renderScene) => {
      if (renderScene.name === 'userProfile') {
        return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
      } else if (renderScene.name === 'newRequest'){
        return Navigator.SceneConfigs.PushFromRight
      } else if (renderScene.name === 'instructions') {
        return Navigator.SceneConfigs.VerticalUpSwipeJump
      } else {
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
