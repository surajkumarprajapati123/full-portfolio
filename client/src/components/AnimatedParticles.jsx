import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedParticles = ({ count = 1000 }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || sceneRef.current) return;

    const container = containerRef.current;
    let isActive = true;
    const mouse = { x: 0, y: 0 };

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create particles
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Create color variation
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Handle resize
    const handleResize = () => {
      if (!isActive) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId;
    const animate = () => {
      if (!isActive) return;
      frameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate particles
      particles.rotation.y = time * 0.05;
      
      // Mouse interaction - smoothly interpolate
      particles.rotation.x += (mouse.y * 0.1 - particles.rotation.x) * 0.1;
      particles.rotation.y += (mouse.x * 0.1 + time * 0.05 - particles.rotation.y) * 0.1;

      // Animate individual particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const y = positions[i3 + 1];
        positions[i3 + 1] = y + Math.sin(time + i * 0.1) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    sceneRef.current = { geometry, material, renderer, frameId };
    animate();

    // Cleanup
    return () => {
      isActive = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (frameId) cancelAnimationFrame(frameId);

      if (sceneRef.current) {
        sceneRef.current.geometry?.dispose();
        sceneRef.current.material?.dispose();
        sceneRef.current.renderer?.dispose();
        
        if (renderer.domElement && container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        
        sceneRef.current = null;
      }
    };
  }, [count]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-8 left-8 text-white pointer-events-none">
        <h1 className="text-4xl font-bold mb-2">Animated Particles</h1>
        <p className="text-lg opacity-80">{count} particles • Move your mouse</p>
      </div>
    </div>
  );
};

export default AnimatedParticles;