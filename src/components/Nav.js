import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class Nav extends Component {
  onNewRequestPress() {
    this.props.navigator.push({name: 'new_request'});
  }
  onProfilePress() {
    this.props.navigator.push({name: 'userProfile'});
  }

  render() {
    let profileButton, createRequestButton;
    if (this.props.user !== null) {
      profileButton =
        <TouchableOpacity onPress={this.onProfilePress.bind(this)}>
          <Image
            style={styles.profileButton}
            source={require('../../assets/profile.png')}
            />
        </TouchableOpacity>
      createRequestButton =
        <TouchableOpacity onPress={this.onNewRequestPress.bind(this)}>
          <Image
            style={styles.createRequestButton}
            source={require('../../assets/add.png')}
            />
        </TouchableOpacity>
    }
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.text}>
            RAOP
          </Text>
        </View>
        <View style={styles.navigation}>

          {profileButton}

          {createRequestButton}

        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingTop: 30,
    paddingBottom: 10,
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
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileButton: {
    left: 30,
    height: 40,
    width: 30,
  },
  createRequestButton: {
    right: 30,
    height: 40,
    width: 40,
  }
});
