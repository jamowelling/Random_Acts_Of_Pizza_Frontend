import { RNS3 } from 'react-native-aws3';

let file = {
  // `uri` can also be a file system path (i.e. file://)
  uri: "assets-library://asset/asset.PNG?id=655DBE66-8008-459C-9358-914E1FB532DD&ext=PNG",
  name: "image.png",
  type: "image/png"
}

let options = {
  keyPrefix: "uploads/",
  bucket: "your-bucket",
  region: "us-east-1",
  accessKey: "your-access-key",
  secretKey: "your-secret-key",
  successActionStatus: 201
}

RNS3.put(file, options).then(response => {
  if (response.status !== 201)
    throw new Error("Failed to upload image to S3");
  console.log(response.body);
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
