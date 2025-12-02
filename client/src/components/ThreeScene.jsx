// components/ThreeScene.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const ThreeScene = ({ mousePosition, scrollProgress, onLoaded }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let isActive = true;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      colors[i3] = Math.random();
      colors[i3 + 1] = Math.random();
      colors[i3 + 2] = Math.random();
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Animated geometries
    const geometries = [];
    const materials = [];

    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.IcosahedronGeometry(1, 0);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
        transparent: true,
        opacity: 0.1,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 10;
      mesh.scale.setScalar(Math.random() * 2 + 1);

      scene.add(mesh);
      geometries.push(mesh);
      materials.push(material);
    }

    camera.position.z = 15;

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isActive) return;

      animationIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Animate particles
      particleSystem.rotation.x = elapsedTime * 0.1;
      particleSystem.rotation.y = elapsedTime * 0.2;

      // Animate geometries
      geometries.forEach((mesh, index) => {
        mesh.rotation.x = elapsedTime * 0.1 * (index + 1);
        mesh.rotation.y = elapsedTime * 0.15 * (index + 1);
        
        const material = materials[index];
        material.opacity = 0.1 + Math.sin(elapsedTime + index) * 0.05;
      });

      // Mouse interaction
      camera.position.x += (mousePosition.x * 0.01 - camera.position.x) * 0.05;
      camera.position.y += (-mousePosition.y * 0.01 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      composer.render();
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!isActive) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    onLoaded();

    // Cleanup
    return () => {
      isActive = false;
      window.removeEventListener('resize', handleResize);
      
      // Cancel animation frame
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      // Dispose Three.js resources
      particles.dispose();
      particleMaterial.dispose();
      
      geometries.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
      });
      
      materials.forEach(mat => {
        if (mat) mat.dispose();
      });

      // Safely remove renderer
      if (renderer) {
        renderer.dispose();
        
        // Use the stored mount reference and check if canvas still exists
        if (renderer.domElement && currentMount && currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
      }
      
      rendererRef.current = null;
    };
  }, [mousePosition, scrollProgress, onLoaded]);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default ThreeScene;