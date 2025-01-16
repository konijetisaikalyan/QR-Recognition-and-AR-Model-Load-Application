# QR Code Recognition and 3D Model Viewer Web Application

## Overview

This project is a QR Code Scanner web application built using React and the ZXing library. The application provides users with the ability to scan QR codes using either their webcam or by uploading an image from their computer. This project is designed to offer a user-friendly interface for scanning QR codes and works efficiently across different browsers and devices.

### Key Features
- **Dual Scanning Mode**: The user can choose to scan a QR code either by using the webcam or by uploading an image.
- **QR Code Recognition**: Scan QR codes using the webcam or upload an image for scanning.
- **3D Model Loading**: After QR code scanning, the corresponding GLTF 3D model is fetched and rendered in the browser.
- **Responsive Design**: The app works seamlessly on both desktop and mobile devices.
- **Webcam Support**: Use the webcam to scan QR codes in real-time.
- **Image Upload Support**: Upload image files containing QR codes for scanning.
- **Loading Indicator**: Provides visual feedback during the scanning and loading process.

### Technologies Used
- **React.js**: Frontend framework for building the user interface.
- **ZXing Library**: QR code recognition library used to decode QR codes from webcam feed or uploaded images.
- **Babylon.js**: A powerful 3D engine for rendering the 3D model (GLTF format).
- **MariaDB**: Relational database used to store and fetch information related to the scanned QR code and 3D models.
- **REST API**: Used to interact with the backend for retrieving the 3D model data associated with the QR code.

### How to Use the Application

1. **Clone the repository** to your local machine:

   ```bash
   git clone https://github.com/konijetisaikalyan/QR-Recognition-and-AR-Model-Load-Application.git
   cd QR-Recognition-and-AR-Model-Load-Applications
2. **Navigate to the Project Directory:** Change into the project directory:

   ```bash
     cd QR-Recognition-and-AR-Model-Load-Application
3. **Install Dependencies:** Install the necessary dependencies:

    ```bash
    npm install
4. **Run the Application Locally:** Start the development server to view the app in your browser:

   ```bash
   npm start

5. **Access the app** in your browser at `http://localhost:3000`.

6. **Select an option**:
   - Click on **Scan with Webcam** to activate the camera and scan the QR code in real time.
   - Click on **Upload Image** to upload a file with a QR code, which will be processed and decoded.

### Project Structure

The project contains the following main files:

- `src/App.js`: The core React component that handles the UI and logic for the QR code scanning functionality.
- `public/index.html`: The main HTML file that renders the React app.
- `package.json`: Manages project dependencies and scripts.
  
### Optional Features Beyond Requirements

In addition to the basic requirement of scanning a QR code, the project also includes the following enhancements:

- **File Upload Functionality**: Allows users to scan QR codes from image files directly.
- **Loading State**: A loading spinner or message is shown while the app is scanning the QR code, ensuring better user experience.
- **Error Handling**: If the QR code cannot be read or if there is any issue with file upload or camera access, the app provides informative feedback to the user.
  
### Future Improvements

- **Mobile Compatibility**: While the app works on desktop, enhancements can be made to optimize the experience on mobile devices.
- **QR Code History**: A feature to save scanned QR code results for later reference.
- **Multi-Code Scanning**: Scanning multiple QR codes in a single image.

## Acknowledgments

- **React.js**: For building the user interface.
- **Babylon.js**: For rendering and interacting with 3D models.
- **ZXing Library**: For QR code scanning and decoding.
- **MariaDB**: For storing metadata and model data.
- **Node.js & Express**: For backend server and API handling.

Special thanks to the open-source community for their contributions.

