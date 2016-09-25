import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';
import CreateRequestButton from './CreateRequestButton';

export default class Nav extends Component {
  onBackPress() {
    this.props.navigator.pop();
  }
  render() {
    let leftButton;
    if (this.props.backButton) {
      leftButton =
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={this.onBackPress.bind(this)}>
            <Image
              style={styles.backButton}
              source={require('../../assets/backButton.png')}
              />
        </TouchableOpacity>
    }

    let createRequestButton;
    if (this.props.user !== null && this.props.route.name === "main") {
      leftButton = <ProfileButton {...this.props} />
      createRequestButton = <CreateRequestButton {...this.props} />
    }
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.text}>
            RAOP
          </Text>
        </View>
        <View style={styles.navigation}>

          {leftButton}

          {createRequestButton}

        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    height: 85,
    paddingTop: 30,
    backgroundColor: '#ce0000',
  },
  logo: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingBottom: 21,
    backgroundColor: '#ce0000',
  },
  text: {
    marginTop: 5,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
  },
  backButton: {
    left: 30,
    height: 40,
    width: 40,
  },
});
