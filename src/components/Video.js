import React, { Component } from 'react';
import { Image, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class VideoExample extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showBroadchurch: false
    };
    this.playBroadchurch = this.playBroadchurch.bind(this)
  }

  // source={{uri: "../../assets/broadchurch", mainVer: 1, patchVer: 0}}
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Video should be here.</Text>
  //       <TouchableHighlight>
  //         <Video
  //           source={require('../../assets/broadchurch.mp4')}
  //           key="video"
  //           style={styles.fullscreen}
  //           rate={1.0}
  //           paused={false}
  //           resizeMode="cover"
  //           />
  //       </TouchableHighlight>
  //     </View>
  //   )
  // }

  playBroadchurch() {
    this.setState({showBroadchurch: true});
  }

  render() {
    let videoDisplay;
    if (this.state.showBroadchurch) {
      videoDisplay = <Video
        source={{ uri: this.props.url }}
        paused={false}
        rate={1.0}
        volume={1}
        muted={false}
        resizeMode={'contain'}
        repeat={false}
        style={styles.image}
        />;
    } else {
      videoDisplay = <Image
        style={styles.image}
        source={{uri: 'http://www.covermesongs.com/wp-content/uploads/2014/05/NotoriousBIG.jpg'}}
      />;
    }
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/playButton.png')}
          style={styles.playButton}
          />
        <TouchableHighlight onPress={this.playBroadchurch}>
          {videoDisplay}
        </TouchableHighlight>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    flex: 1,
    borderWidth: 1,
    height: 250,
    width: 250,
  },
  playButton: {
    position: 'absolute',
    zIndex: 1,
    top: 100,
    left: 100,
    width: 50,
    height: 50,
  },
});
