// components/TechOrbit.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const TechOrbit = ({ technologies }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Create orbiting elements
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    technologies.forEach((tech, index) => {
      const radius = 3;
      const angle = (index / technologies.length) * Math.PI * 2;

      const geometry = new THREE.SphereGeometry(0.2, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(tech.threeColor || '#ffffff'),
        transparent: true,
        opacity: 0.8
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.y = Math.sin(angle) * radius;
      
      orbitGroup.add(sphere);

      // Create orbit path
      const orbitGeometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, 32);
      const orbitMaterial = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color(tech.threeColor || '#ffffff'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.1
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
    });

    camera.position.z = 8;

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      orbitGroup.rotation.y = elapsedTime * 0.2;
      orbitGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [technologies]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default TechOrbit;