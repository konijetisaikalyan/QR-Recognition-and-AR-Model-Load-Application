import React, { useState, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';

const App = () => {
  const [scannedData, setScannedData] = useState(''); // Store scanned data
  const [loading, setLoading] = useState(false); // Track scanning status
  const [isWebcam, setIsWebcam] = useState(false); // Track if webcam scanning is selected
  const videoRef = useRef(null); // Reference to video element

  // Function to start scanning with the webcam
  const startScanner = () => {
    setLoading(true); // Indicate that scanning has started
    const codeReader = new BrowserQRCodeReader(); // Use BrowserQRCodeReader for QR scanning

    // Start decoding the QR code from the default camera
    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
      if (result) {
        setScannedData(result.getText()); // Update the state with the scanned QR data
        setLoading(false); // Stop the loading spinner
      }
      if (error) {
        console.error(error); // Log any errors
      }
    });
  };

  // Function to handle image upload and scanning
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setLoading(true); // Indicate that scanning has started
      const codeReader = new BrowserQRCodeReader(); // Use BrowserQRCodeReader for image scanning
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          codeReader.decodeFromImage(img)
            .then((result) => {
              setScannedData(result.getText()); // Set the scanned QR data
              setLoading(false); // Stop the loading spinner
            })
            .catch((error) => {
              console.error('Error decoding the image: ', error);
              setLoading(false); // Stop the loading spinner
            });
        };
      };

      reader.readAsDataURL(file); // Read the selected image file
    }
  };

  // Function to choose between webcam and file upload options
  const chooseScannerMode = (mode) => {
    setIsWebcam(mode === 'webcam'); // Set mode to webcam or file based on selection
    setScannedData(''); // Reset scanned data
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>

      {/* Option to choose between webcam and file upload */}
      <div>
        <button onClick={() => chooseScannerMode('webcam')} disabled={loading}>
          Scan with Webcam
        </button>
        <button onClick={() => chooseScannerMode('file')} disabled={loading}>
          Upload Image
        </button>
      </div>

      {/* Conditionally render webcam scanning */}
      {isWebcam && (
        <div>
          <button onClick={startScanner} disabled={loading}>
            {loading ? 'Scanning...' : 'Start Webcam Scan'}
          </button>
          <video ref={videoRef} style={{ width: '100%' }} /> {/* Video element to show the camera feed */}
        </div>
      )}

      {/* Conditionally render file upload option */}
      {isWebcam === false && (
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} />
          {/* Input to upload image files for scanning */}
        </div>
      )}

      {/* Display the scanned QR data */}
      {scannedData && (
        <div>
          <h2>Scanned QR Data:</h2>
          <p>{scannedData}</p>
        </div>
      )}
    </div>
  );
};

export default App;
