import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingTechIcons = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || sceneRef.current) return;

    const container = containerRef.current;
    let isActive = true;
    const mouse = { x: 0, y: 0 };

    const techIcons = [
      { name: 'React', position: [2, 1, 0], color: '#61DAFB' },
      { name: 'JS', position: [-2, -1, 0], color: '#F7DF1E' },
      { name: 'TS', position: [1, -2, 0], color: '#3178C6' },
      { name: 'Node', position: [-1, 2, 0], color: '#339933' },
      { name: 'Python', position: [3, 0, 0], color: '#3776AB' },
      { name: 'AWS', position: [-3, 0, 0], color: '#FF9900' }
    ];

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create group for all icons
    const group = new THREE.Group();
    scene.add(group);

    // Create canvas for text texture
    const createTextTexture = (text, color) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 128;

      // Draw background circle
      context.fillStyle = color;
      context.beginPath();
      context.arc(128, 64, 50, 0, Math.PI * 2);
      context.fill();

      // Draw text
      context.fillStyle = '#000000';
      context.font = 'bold 36px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 128, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const meshes = [];
    const materials = [];

    // Create floating icons
    techIcons.forEach((tech) => {
      const texture = createTextTexture(tech.name, tech.color);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      materials.push(material);

      const geometry = new THREE.PlaneGeometry(1.2, 0.6);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...tech.position);
      
      group.add(mesh);
      meshes.push(mesh);
    });

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

      // Rotate group
      group.rotation.y = time * 0.1;
      group.rotation.x = Math.sin(time * 0.2) * 0.1;

      // Mouse interaction
      group.rotation.y += mouse.x * 0.2;
      group.rotation.x += mouse.y * 0.1;

      // Individual mesh animations
      meshes.forEach((mesh, index) => {
        mesh.rotation.z = Math.sin(time + index) * 0.1;
        mesh.position.y += Math.sin(time * 2 + index) * 0.001;
      });

      renderer.render(scene, camera);
    };

    sceneRef.current = { renderer, materials, frameId };
    animate();

    // Cleanup
    return () => {
      isActive = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (frameId) cancelAnimationFrame(frameId);

      if (sceneRef.current) {
        materials.forEach(mat => mat.dispose());
        meshes.forEach(mesh => mesh.geometry.dispose());
        sceneRef.current.renderer?.dispose();

        if (renderer.domElement && container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }

        sceneRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-8 left-8 text-white pointer-events-none">
        <h1 className="text-4xl font-bold mb-2">Floating Tech Stack</h1>
        <p className="text-lg opacity-80">Move your mouse to interact</p>
      </div>
      <div className="absolute bottom-8 left-8 text-white/60 text-sm pointer-events-none">
        <p>React • JavaScript • TypeScript • Node • Python • AWS</p>
      </div>
    </div>
  );
};

export default FloatingTechIcons;