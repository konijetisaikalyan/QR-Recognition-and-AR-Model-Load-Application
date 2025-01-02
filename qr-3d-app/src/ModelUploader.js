import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

const ModelUploader = () => {
  const [file, setFile] = useState(null);
  const [modelUrl, setModelUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('model', file);

    try {
      const response = await axios.post('http://localhost:8000/ar/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const modelId = response.data.modelId;
      setModelUrl(`http://localhost:8000/ar/arinfo/${modelId}`);
      setQrCode(`http://localhost:8000/ar/arinfo/${modelId}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload 3D Model</button>
      {qrCode && (
        <div>
          <h3>QR Code</h3>
          <QRCode value={qrCode} />
        </div>
      )}
    </div>
  );
};

export default ModelUploader;
