import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';
import CreateRequestButton from './CreateRequestButton';

export default class Nav extends Component {
  render() {
    let profileButton, createRequestButton;
    if (this.props.user !== null && this.props.route.name === "main") {
      profileButton = <ProfileButton {...this.props} />
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
});
