import React from 'react';
import ModelViewer from './ModelViewer'; 
const ModelViewer = ({ modelUrl }) => {
  console.log("Rendering ModelViewer with modelUrl:", modelUrl);

  return (
    <div>
      {modelUrl ? <iframe src={modelUrl} title="3D Model" width="600" height="400" /> : <p>Model not available</p>}
    </div>
  );
};

export default ModelViewer;
