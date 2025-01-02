import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight } from 'three';

const ModelViewer = ({ modelUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!modelUrl) return; // Don't load anything if no URL is provided

    const renderer = new WebGLRenderer({ canvas: canvasRef.current });
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const loader = new GLTFLoader();

    // Adjust renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up camera
    camera.position.z = 5;

    // Add lights to the scene
    const ambientLight = new AmbientLight(0x404040, 2); // Ambient light
    const directionalLight = new DirectionalLight(0xffffff, 2); // Directional light
    directionalLight.position.set(5, 5, 5);
    scene.add(ambientLight);
    scene.add(directionalLight);

    // Load the .glb model
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
      const modelSize = gltf.scene.getBoundingBox(); // Get model size
      camera.position.z = modelSize ? modelSize.max.z + 2 : 5; // Adjust camera based on model size
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose(); // Cleanup
    };
  }, [modelUrl]);

  return <canvas ref={canvasRef} />;
};

export default ModelViewer;
