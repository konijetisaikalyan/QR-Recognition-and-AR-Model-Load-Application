import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';  // Use the correct named export

const QRMaker = ({ modelUrl }) => {
  if (!modelUrl) {
    return <div>No model URL available to generate QR code.</div>;
  }

  return (
    <div>
      <h3>Your QR Code:</h3>
      <QRCodeCanvas value={modelUrl} />  {/* Display the QR code for the model URL */}
      <p>QR Value: {modelUrl}</p>
    </div>
  );
};

export default QRMaker;
