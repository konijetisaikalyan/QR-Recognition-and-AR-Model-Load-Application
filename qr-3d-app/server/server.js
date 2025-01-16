import React, { useState } from 'react';

const ModelUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (!uploadedFile) {
      setError("No file selected.");
      return;
    }

    const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'glb') {
      setError("Invalid file type. Please upload a .glb 3D model.");
      return;
    }

    if (uploadedFile.size > 20 * 1024 * 1024) { // 20MB size limit
      setError("File size is too large. Please upload a model less than 20MB.");
      return;
    }

    setError(''); // Clear any previous error

    // Create form data to send to the server
    const formData = new FormData();
    formData.append('file', uploadedFile);

    // Upload the file to the server
    fetch('https://{your-server-url}/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setUploadUrl(data.modelUrl);
        generateQRCode(data.modelId);  // Generate QR for the model
      })
      .catch((error) => {
        setError("Failed to upload the file.");
        console.error('Error:', error);
      });
  };

  const generateQRCode = (modelId) => {
    const qrCodeLink = `https://{localIP}/${modelId}`;
    setQrCodeUrl(qrCodeLink);
  };

  return (
    <div>
      <h2>Upload a 3D Model (.glb)</h2>
      <input
        type="file"
        accept=".glb"
        onChange={handleFileUpload}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadUrl && <p>Model uploaded successfully! <a href={uploadUrl} target="_blank" rel="noopener noreferrer">View 3D Model</a></p>}
      {qrCodeUrl && (
        <div>
          <h3>Generated QR Code</h3>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeUrl)}&size=150x150`} alt="QR Code" />
          <p>{qrCodeUrl}</p>
        </div>
      )}
    </div>
  );
};

export default ModelUploader;
