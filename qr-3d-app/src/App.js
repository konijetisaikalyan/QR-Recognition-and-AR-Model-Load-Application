import React, { useState, useEffect } from 'react';
import './App.css';
import { QRCodeScanner } from 'react-qr-code-scanner';
import { ModelViewer } from '@google/model-viewer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [scannedData, setScannedData] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data.text);
      fetchModelInfo(data.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
    toast.error('Error scanning QR code');
  };

  // Fetch model info from API using modelId in the QR code
  const fetchModelInfo = async (modelId) => {
    try {
      const response = await fetch(`/arinfo/${modelId}`);
      if (!response.ok) {
        toast.error('Failed to fetch model data');
        setIsModelLoaded(false);
        return;
      }
      const modelData = await response.json();
      if (modelData && modelData.modelUrl) {
        setModelUrl(modelData.modelUrl);
        setIsModelLoaded(true);
      } else {
        toast.error('Model data is not valid');
        setIsModelLoaded(false);
      }
    } catch (error) {
      console.error('Error fetching model info:', error);
      toast.error('Error fetching model data');
      setIsModelLoaded(false);
    }
  };

  // Handle the touch event to trigger animation on the model
  const handleModelTouch = () => {
    if (isModelLoaded) {
      document.querySelector('model-viewer').play();
    }
  };

  return (
    <div className="App">
      <h1>3D Model QR Code Scanner</h1>

      <div className="scanner-container">
        {isScanning ? (
          <QRCodeScanner
            onScan={handleScan}
            onError={handleError}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <button onClick={() => setIsScanning(true)}>Restart Scanning</button>
        )}
      </div>

      {scannedData && (
        <div className="model-container">
          <h2>Scanned QR Code: {scannedData}</h2>
          {isModelLoaded ? (
            <div>
              <model-viewer
                src={modelUrl}
                alt="3D model"
                auto-rotate
                camera-controls
                onClick={handleModelTouch}
                style={{ width: '100%', height: '500px' }}
              />
            </div>
          ) : (
            <p>Loading 3D model...</p>
          )}
        </div>
      )}

      <ToastContainer autoClose={2000} />

    </div>
  );
}

export default App;

