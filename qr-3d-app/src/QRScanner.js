import React, { useState, useEffect } from 'react';
import { useQRCodeScanner } from 'react-qr-code-scanner';  // You may need a QR scanner library

const QRScanner = () => {
  const [modelUrl, setModelUrl] = useState('');
  const [error, setError] = useState('');
  
  const handleQRCodeScan = (scannedData) => {
    if (scannedData) {
      fetch(`/arinfo/${scannedData.modelId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setModelUrl(data.modelUrl);  // Load the model from the API response
          } else {
            setError("Failed to load model data.");
            setTimeout(() => setError(''), 2000);  // Error disappears after 2 seconds
          }
        })
        .catch(err => {
          setError("An error occurred while fetching model information.");
          setTimeout(() => setError(''), 2000);  // Error disappears after 2 seconds
        });
    }
  };

  useQRCodeScanner(handleQRCodeScan);  // Hook to handle QR code scanning

  return (
    <div>
      <h2>Scan QR Code</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {modelUrl && (
        <model-viewer
          src={modelUrl}
          alt="3D Model"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
        />
      )}
    </div>
  );
};

export default QRScanner;
