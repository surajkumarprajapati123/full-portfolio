import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InteractiveCube = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || sceneRef.current) return;

    const canvas = canvasRef.current;
    let isActive = true;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.1, side: THREE.DoubleSide });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Create wireframe
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x6366F1, transparent: true, opacity: 0.8 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    scene.add(wireframe);

    const mouse = { x: 0, y: 0 };
    let frameId;

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      if (!isActive) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      if (!isActive) return;
      frameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      cube.rotation.x = time * 0.2 + mouse.y * 0.3;
      cube.rotation.y = time * 0.3 + mouse.x * 0.5;
      wireframe.rotation.x = cube.rotation.x;
      wireframe.rotation.y = cube.rotation.y;

      const hue = (time * 0.1) % 1;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      material.color = color;
      lineMaterial.color = color;

      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    
    sceneRef.current = { geometry, material, lineMaterial, edges, renderer };
    animate();

    return () => {
      isActive = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      
      if (frameId) cancelAnimationFrame(frameId);
      
      if (sceneRef.current) {
        sceneRef.current.geometry?.dispose();
        sceneRef.current.material?.dispose();
        sceneRef.current.lineMaterial?.dispose();
        sceneRef.current.edges?.dispose();
        sceneRef.current.renderer?.dispose();
        sceneRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute top-8 left-8 text-white pointer-events-none select-none">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Interactive 3D Cube</h1>
        <p className="text-lg opacity-80 drop-shadow">Move your mouse to interact</p>
      </div>
    </div>
  );
};

export default InteractiveCube;