import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';
import CreateRequestButton from './CreateRequestButton';
import BackButton from './BackButton';

export default class Nav extends Component {
  render() {
    let leftButton;
    let createRequestButton;

    if (this.props.backButton) {
      leftButton = <BackButton {...this.props} />
    } else if (this.props.route.name === "main") {
      leftButton = <ProfileButton {...this.props} />
      createRequestButton = <CreateRequestButton {...this.props} />
    }

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.text}>
            in knead
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    height: 85,
    paddingTop: 30,
    backgroundColor: '#ce0000',
    // borderWidth: 3,
    // borderColor: 'blue',
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
});
