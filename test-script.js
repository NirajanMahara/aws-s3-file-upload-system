const assert = require('assert');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

async function runTests() {
  console.log('Starting tests...');

  // Test 1: AWS Configuration
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    await s3.listBuckets().promise();
    console.log('✓ AWS Configuration test passed');
  } catch (error) {
    console.error('✗ AWS Configuration test failed:', error.message);
    process.exit(1);
  }

  // Test 2: S3 Bucket Access
  try {
    const s3 = new AWS.S3();
    await s3
      .listObjects({
        Bucket: process.env.AWS_BUCKET_NAME,
      })
      .promise();
    console.log('✓ S3 Bucket access test passed');
  } catch (error) {
    console.error('✗ S3 Bucket access test failed:', error.message);
    process.exit(1);
  }

  // Test 3: Environment Variables
  const requiredEnvVars = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_BUCKET_NAME',
    'AWS_REGION',
    'SESSION_SECRET',
    'AUTH_USERNAME',
    'AUTH_PIN',
  ];

  for (const envVar of requiredEnvVars) {
    assert(process.env[envVar], `Missing environment variable: ${envVar}`);
  }
  console.log('✓ Environment variables test passed');

  // Test 4: File Structure
  const requiredFiles = [
    'app.js',
    'package.json',
    '.env',
    'public/css/styles.css',
    'public/js/upload.js',
    'views/index.ejs',
    'views/login.ejs',
    'routes/auth.js',
    'routes/upload.js',
    'config/aws.js',
    'middleware/auth.js',
  ];

  for (const file of requiredFiles) {
    assert(
      fs.existsSync(path.join(process.cwd(), file)),
      `Missing file: ${file}`
    );
  }
  console.log('✓ File structure test passed');

  console.log('\nAll tests passed successfully!');
}

// Run tests
require('dotenv').config();
runTests().catch(console.error);
