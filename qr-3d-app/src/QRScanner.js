import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

import { ReactQRCodeScanner } from 'react-qr-scanner';

const QRScanner = ({ onScan, onError }) => {
  console.log('QRScanner component rendered');
  return (
    <div>
      <ReactQRCodeScanner
        delay={300}
        onScan={onScan}
        onError={onError}
      />
    </div>
  );
};

export default QRScanner;
