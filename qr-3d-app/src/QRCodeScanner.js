import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const QRCodeScanner = () => {
  const [file, setFile] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('model', file);

    axios.post('/upload', formData).then((response) => {
      setQrCode(response.data.qrCode);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Generate QR Code</button>
      {qrCode && <QRCode value={qrCode} />}
    </div>
  );
};

export default QRCodeScanner;
