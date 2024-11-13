# AWS S3 File Upload System

This project is a Node.js web application that enables users to upload files to AWS S3, providing a seamless and secure file storage solution. It includes user authentication, file upload handling, and basic AWS S3 interactions.

## Features

- **File Upload:** Users can upload files directly to AWS S3.
- **Authentication:** Basic authentication using sessions to secure the application.
- **Security:** Includes basic security middleware to protect against common web vulnerabilities.
- **File Management:** View and list the uploaded files stored in AWS S3.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [AWS CLI](https://aws.amazon.com/cli/) (configured with your AWS credentials)
- [AWS Account](https://aws.amazon.com/) with an S3 bucket set up

## Setup and Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/NirajanMahara/aws-s3-file-upload-system.git
   cd aws-s3-file-upload-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure AWS credentials:

   Run the following command and provide your AWS Access Key, Secret Access Key, region, and default output format.

   ```bash
   aws configure
   ```

4. Set up environment variables:

   Create a `.env` file in the root of the project with the following content:

   ```bash
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-region
   S3_BUCKET_NAME=your-s3-bucket-name
   ```

5. Start the application:

   ```bash
   npm start
   ```

   The application will run at [http://localhost:3000](http://localhost:3000).

## Usage

- **Upload Files:** After logging in, navigate to the file upload page and select a file to upload.
- **View Files:** After uploading, you can view a list of all files uploaded to the S3 bucket.

## File Structure

- **`index.js`**: The main entry point for the application, where the Express server is set up.
- **`routes/`**: Contains routes for authentication, file upload, and listing files.
- **`public/`**: Static files for the frontend (HTML, CSS, JS).
- **`aws-s3.js`**: Contains the logic for interacting with AWS S3, including file uploads and retrieval.

## Security Considerations

- **Authentication:** The application uses session-based authentication to ensure that only authorized users can upload files.
- **File Validation:** Only certain file types (e.g., images, documents) are allowed for upload.
- **Security Middleware:** Helmet.js and express-rate-limit are used to protect the application from various web vulnerabilities.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-node-js/)
- [Express.js](https://expressjs.com/)
- [Multer](https://www.npmjs.com/package/multer) for handling file uploads
- [Helmet](https://www.npmjs.com/package/helmet) for security headers
