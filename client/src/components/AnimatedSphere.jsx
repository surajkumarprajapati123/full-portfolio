// components/AnimatedSphere.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const AnimatedSphere = ({ imageUrl, mousePosition }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(400, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create sphere with image texture
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load(imageUrl, (texture) => {
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9
      });

      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // Add wireframe
      const wireframe = new THREE.WireframeGeometry(geometry);
      const line = new THREE.LineSegments(wireframe);
      line.material.color = new THREE.Color(0xffffff);
      line.material.transparent = true;
      line.material.opacity = 0.3;
      scene.add(line);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0x00ff00, 1, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      camera.position.z = 5;

      const clock = new THREE.Clock();

      const animate = () => {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        sphere.rotation.x = elapsedTime * 0.2;
        sphere.rotation.y = elapsedTime * 0.3;

        line.rotation.x = sphere.rotation.x;
        line.rotation.y = sphere.rotation.y;

        // Mouse interaction
        sphere.rotation.y += mousePosition.x * 0.0005;
        sphere.rotation.x += mousePosition.y * 0.0005;

        renderer.render(scene, camera);
      };

      animate();
    });

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [imageUrl, mousePosition]);

  return <div ref={mountRef} className="w-96 h-96" />;
};

export default AnimatedSphere;