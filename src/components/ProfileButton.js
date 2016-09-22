import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class ProfileButton extends Component {
  onProfilePress() {
    this.props.navigator.push({name: 'userProfile'});
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onProfilePress.bind(this)}>
          <Image
            style={styles.profileButton}
            source={require('../../assets/profile.png')}
            />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileButton: {
    left: 30,
    height: 40,
    width: 30,
  },
})
