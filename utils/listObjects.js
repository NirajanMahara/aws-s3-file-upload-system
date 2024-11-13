const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// First, run the `aws configure` command in your terminal and enter the credentials.
// And, run the `node listObjects.js` to display the list of files stored in your S3 bucket along with their metadata.
// Like, file name, last modified time, size, etc.

const params = {
  Bucket: 'my-aws-s3-upload-bucket',
};

s3.listObjectsV2(params, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('File List', data.Contents);
  }
});
