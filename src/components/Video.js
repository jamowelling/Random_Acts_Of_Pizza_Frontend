import React, { Component } from 'react';
import { Image, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class VideoExample extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false
    };
    this.playVideo = this.playVideo.bind(this)
  }

  playVideo() {
    this.setState({playing: !this.state.playing});
  }

  render() {
    let content;
    if (this.props.preview) {
      content = this.props.videoData.path
    } else if (this.props.request) {
      content = this.props.request.video
    } else {
      content = this.props.url
    }
    let videoDisplay;
    if (this.state.playing) {
      videoDisplay = <Video
        source={{ uri: content }}
        paused={false}
        rate={1.0}
        volume={1}
        muted={false}
        resizeMode={'contain'}
        repeat={true}
        style={styles.image}
        />;
    } else {
      videoDisplay = <Image
        style={styles.image}
        source={{uri: 'http://www.covermesongs.com/wp-content/uploads/2014/05/NotoriousBIG.jpg'}}
      />;
    }
    let playButton;
    if (!this.state.playing) {
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
