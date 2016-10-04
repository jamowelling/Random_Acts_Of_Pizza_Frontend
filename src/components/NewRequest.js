import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { SegmentedControls } from 'react-native-radio-buttons';
import Nav from './Nav';
import GuestView from './GuestView';
import Video from './Video';
// import { file, options } from './AWS';
import { RNS3 } from 'react-native-aws3';

export default class NewRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pizzas: '',
      vendor: '',
      video: '',
      errorMessage: ' '
    };
    this.onPizzasChange = this.onPizzasChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
  }
  onPizzasChange(pizzas) {
    this.setState({pizzas})
  }
  onVendorChange(vendor) {
    this.setState({vendor})
  }
  onSubmitRequest() {
    const userID = this.props.user.id
    const first_name = this.props.user.first_name
    if (this.state.pizzas.length < 1) {
      this.setState({errorMessage: 'Please select how many pizzas you need.'})
    } else if (this.state.vendor.length < 5) {
      this.setState({errorMessage: 'Please choose your preferred pizza place.'})
    } else {
      this.setState({errorMessage: ' '})

      // RNS3.put(file, options)
      //   .catch(/* ... */)
      //   .progress((e) => console.log(e.loaded / e.total));

      let file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: this.props.videoData.path,
        name: "test.mov",
        type: "video/quicktime"
      }

      let options = {
        keyPrefix: "uploads/",
        bucket: "random-acts-of-pizza",
        region: "us-west-2",
        accessKey: "",
        secretKey: "",
        successActionStatus: 201
      }

      console.log("file", file);
      console.log("options", options);

      RNS3.put(file, options)
        .then(response => {
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
            console.log("response.body", response.body);
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      });

      // Obtain AWS address

      // Include AWS address in New Request Post Request
      // const {
      //   pizzas,
      //   vendor
      // } = this.state;
      // fetch('http://random-acts-of-pizza.herokuapp.com/requests', {
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   method: 'POST',
      //   body: JSON.stringify({
      //     userID,
      //     first_name,
      //     pizzas,
      //     vendor,
      //     video
      //   })
      // })
      // .then((response) => {
      //   return response.json()})
      // .then((responseJson) => {
      //   if (responseJson.errorMessage) {
      //     this.setState({errorMessage: responseJson.errorMessage})
      //   } else {
      //     this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
      //     this.props.collectRequests(responseJson.requests)
      //     this.props.navigator.resetTo({name: 'main'});
      //   }
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    }
  }
  openVideoRec() {
    this.props.navigator.push({name: 'camera'});
    // this.props.navigator.immediatelyResetRouteStack([{name: 'camera'}])
  }
  selectPizzas(pizzas){
    this.setState({pizzas});
  }
  selectVendor(vendor){
    this.setState({vendor});
  }
  render() {
    const pizzas= [
      1,
      2,
      3,
    ];
    const vendors= [
      "Papa Johns",
      "Dominos",
      "Pizza Hut",
    ];
    let videoDisplay;
    if (this.props.videoData) {
      videoDisplay =
        <Video preview {...this.props} />
    }
    let display;
    if (this.props.user === null) {
      display = <GuestView {...this.props} />
    } else {
      display =
      <View style={styles.container}>
        <Nav backButton {...this.props} />

        <View style={styles.wrapper}>

          <View style={styles.formTitle}>
            <Text style={styles.title}>
              Submit your pizza request here:
            </Text>
          </View>

          <View>
            <Text style={styles.instructions}>
              Tell us your story.
            </Text>
          </View>

          <Button
            text={'Record Video'}
            onPress={this.openVideoRec.bind(this)}
            />

          {videoDisplay}

          <View style={styles.choices}>
            <Text style={styles.instructions}>
              How many pizzas do you need?
            </Text>
            <SegmentedControls
              tint={'#ce0000'}
              options={ pizzas }
              onSelection={ this.selectPizzas.bind(this) }
              selectedOption={ this.state.pizzas }
              />

            <Text style={styles.instructions}>
              Who delivers to you?
            </Text>
            <SegmentedControls
              tint={'#ce0000'}
              fontSize={50}
              options={ vendors }
              onSelection={ this.selectVendor.bind(this) }
              selectedOption={ this.state.vendor }
              />
          </View>

          <View style={styles.errorContainer}>
            <Text style={styles.error}>
              {this.state.errorMessage}
            </Text>
          </View>


          <Button
            style={styles.submitButton}
            text={'Submit Request'}
            onPress={this.onSubmitRequest.bind(this)}
            />
        </View>

      </View>
    }

    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // borderWidth: 3,
  },
  formTitle: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  choices: {
    width: 250,
    alignItems: 'center',
  },
  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 15,
  },
  pizzas: {
    tintColor: 'red',
    fontWeight: 'bold',
  },
  vendor: {

  },
  submitButton: {
    backgroundColor: 'gray',
  },
  errorContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ce0000',
  },
});
