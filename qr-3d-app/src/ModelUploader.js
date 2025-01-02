import React, { useState } from 'react';

const ModelUploader = () => {
  const [file, setFile] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [error, setError] = useState(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (!uploadedFile) {
      setError("No file selected");
      return;
    }

    // Check file type (optional)
    const fileType = uploadedFile.type;
    if (!fileType.includes("model") && !fileType.includes("image")) {
      setError("Invalid file type. Please upload a 3D model or an image.");
      return;
    }

    setError(null); // Reset error if valid file

    const reader = new FileReader();

    // When file is loaded, update state
    reader.onloadend = () => {
      if (fileType.includes("model")) {
        setModelUrl(reader.result); // Process 3D model
      } else {
        setModelUrl(null); // If it's an image, we can display it as image
        setFile(reader.result); // Store image data URL
      }
    };

    reader.readAsDataURL(uploadedFile);
  };

  // Function to render 3D model (use a library like three.js or AR.js for this)
  const render3DModel = () => {
    // This is where you will render your 3D model using a library like three.js or AR.js
    // For now, we will just display the model URL for reference.
    return modelUrl ? (
      <iframe
        src={modelUrl}
        title="3D Model"
        width="100%"
        height="500px"
        frameBorder="0"
      ></iframe>
    ) : (
      <p>No 3D model to display.</p>
    );
  };

  return (
    <div className="model-uploader">
      <h2>Upload Your Model or Image</h2>
      <input type="file" onChange={handleFileUpload} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {file && !modelUrl && <img src={file} alt="Uploaded Preview" />}
      {render3DModel()}
    </div>
  );
};

export default ModelUploader;
