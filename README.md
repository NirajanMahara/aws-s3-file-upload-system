# AWS S3 File Upload System

This project is a Node.js web application that enables users to upload files to AWS S3, providing a seamless and secure file storage solution. It includes user authentication, file upload handling, and basic AWS S3 interactions.

## Features

- **File Upload:** Users can upload files directly to AWS S3.
- **Authentication:** Basic authentication using sessions to secure the application.
- **Security:** Includes basic security middleware to protect against common web vulnerabilities.
- **File Management:** View and list the uploaded files stored in AWS S3.

## Screenshots

Below are the screenshots of the application's key screens:

1. **Login Page:**
   <img src="screenshots/5 login Screenshot 2024-11-18 at 9.25.56 PM.png">

2. **File Upload Page:**
   <img src="screenshots/1 project setup Screenshot 2024-11-09 at 1.43.37 PM.png">

3. **File List Page:**
   <img src="screenshots/4 s3 upload Screenshot 2024-11-09 at 8.36.51 PM.png">

4. **Error Handling (Authentication Failure):**
   <img src="screenshots/6 invalid cred Screenshot 2024-11-18 at 9.27.50 PM.png">
   <img src="screenshots/Screenshot 2024-11-12 at 6.28.09 PM.png">

## API Documentation

This section describes the key API endpoints in the application.

### Authentication Endpoints

- **POST /auth/login**

  - Description: Logs a user into the system.
  - Request Body:
    ```json
    {
      "username": "admin",
      "pin": "1234"
    }
    ```
  - Response:
    - Success: Redirects to the file upload page.
    - Failure: Returns a 400 status with an error message.

- **POST /auth/logout**
  - Description: Logs the user out of the system and destroys the session.
  - Response:
    - Success: Redirects to the login page.

### File Upload Endpoints

- **POST /upload**

  - Description: Handles file uploads to AWS S3.
  - Request Body: Form-data containing the file to be uploaded.
  - Response:
    - Success: Returns a JSON object with the file URL on S3.
    - Failure: Returns a 400 status with an error message.

- **GET /files**
  - Description: Retrieves a list of all uploaded files from AWS S3.
  - Response:
    ```json
    [
      {
        "fileName": "file1.jpg",
        "url": "https://s3.amazonaws.com/bucket-name/file1.jpg"
      },
      {
        "fileName": "document.pdf",
        "url": "https://s3.amazonaws.com/bucket-name/document.pdf"
      }
    ]
    ```

## Security Implementation Details

The application incorporates several security measures to ensure the safety and integrity of user data.

### Authentication

- **Session-based Authentication:** The application uses the `express-session` package to manage user sessions. When a user logs in successfully, a session is created, and the user is granted access to upload files.
- **PIN Authentication:** Users authenticate using a combination of a username and PIN. The PIN is hashed and compared on login to ensure security.

### Security Middleware

- **Helmet:** The application uses [Helmet](https://www.npmjs.com/package/helmet) to set various HTTP headers that help protect the app from common web vulnerabilities.
  - Example: Protects against cross-site scripting (XSS) attacks and clickjacking.
- **Express Rate Limiter:** [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) is used to prevent brute-force attacks by limiting the number of requests a user can make in a short time.

### File Upload Security

- **File Type Validation:** Only specific file types are allowed for upload (e.g., `.jpg`, `.png`, `.pdf`). Files that do not match the allowed types are rejected.
- **File Size Limitation:** The application has a file size limit to prevent large files from being uploaded, which could cause performance issues or abuse of system resources.

### AWS S3 Security

- **IAM User Permissions:** The application uses AWS IAM (Identity and Access Management) to restrict access to the S3 bucket. The IAM user used for the application has the minimum required permissions to interact with S3 (e.g., `s3:PutObject` for file uploads).
- **Bucket Policy:** The S3 bucket has a policy that restricts access to only the necessary actions and limits access to only the application.

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

## Acknowledgments

- [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-node-js/)
- [Express.js](https://expressjs.com/)
- [Multer](https://www.npmjs.com/package/multer) for handling file uploads
- [Helmet](https://www.npmjs.com/package/helmet) for security headers
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) for rate-limiting requests
