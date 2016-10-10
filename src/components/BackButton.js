import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class BackButton extends Component {
  onBackPress() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={this.onBackPress.bind(this)}>
            <Image
              style={styles.backButton}
              source={require('../../assets/backButton.png')}
              />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backButton: {
    left: 30,
    height: 40,
    width: 40,
  },
})
