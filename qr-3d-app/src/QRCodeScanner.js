

// QRScanner.js
import React from 'react';
import QRCodeScanner from 'react-qr-scanner';

export const QRScanner = ({ onScan, onError }) => {
  return (
    <div>
      <QRCodeScanner
        delay={300}
        onScan={onScan}
        onError={onError}
      />
    </div>
  );
};
