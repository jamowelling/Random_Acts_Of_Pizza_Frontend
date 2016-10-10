import React, { Component } from 'react';
import { Image, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class VideoExample extends Component {
  constructor(props) {
    super(props)

    this.state = {
      paused: true
    };
    this.playVideo = this.playVideo.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  playVideo() {
    this.setState({paused: !this.state.paused});
  }
  onEnd() {
    this.setState({paused: true});
  }

  render() {
    let content;
    if (this.props.preview) {
      content = this.props.videoData.path
    } else if (this.props.userRequest) {
      content = this.props.request.video
    } else {
      content = this.props.url
    }
    const videoDisplay = <Video
      source={{ uri: content }}
      paused={this.state.paused}
      rate={1.0}
      volume={1}
      muted={false}
      playInBackground={true}
      playWhenInactive={true}
      resizeMode={'contain'}
      onEnd={this.onEnd}
      repeat={true}
      style={styles.image}
      />;
    let playButton;
    if (this.state.paused) {
      playButton =
        <Image
          source={require('../../assets/playButton.png')}
          style={styles.playButton}
          />
    } else {
      playButton =
        <Image
          style={styles.playButton}
          />
    }
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.playButtonContainer}
          onPress={this.playVideo}
          >
            {playButton}
        </TouchableHighlight>
        {videoDisplay}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 250,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
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
    height: 250,
    width: 250,
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  playButton: {
    top: 100,
    left: 100,
    width: 50,
    height: 50,
  },
});
