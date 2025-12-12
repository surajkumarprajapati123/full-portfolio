// components/GlowingOrbs.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GlowingOrbs = ({ 
  count = 25, 
  radius = 15, 
  colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#10B981'],
  speed = 0.5,
  size = 0.15,
  opacity = 0.6
}) => {
  const pointsRef = useRef();
  const geometryRef = useRef();
  
  // Generate positions using THREE methods
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y) * radius;
      const theta = phi * i;
      
      const i3 = i * 3;
      positions[i3] = Math.cos(theta) * radiusAtY;
      positions[i3 + 1] = y * radius;
      positions[i3 + 2] = Math.sin(theta) * radiusAtY;
    }
    return positions;
  }, [count, radius]);

  // Generate colors
  const colorsArray = useMemo(() => {
    const colorsArray = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      color.set(randomColor);
      
      colorsArray[i3] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;
    }
    return colorsArray;
  }, [count, colors]);

  // Generate sizes
  const sizes = useMemo(() => {
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      sizes[i] = size * (0.5 + Math.random() * 1.5);
    }
    return sizes;
  }, [count, size]);

  // Store original positions
  const originalPositions = useMemo(() => {
    const original = new Float32Array(count * 3);
    original.set(positions);
    return original;
  }, [positions, count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Smooth rotation
      pointsRef.current.rotation.x += delta * speed * 0.2;
      pointsRef.current.rotation.y += delta * speed * 0.3;
      
      // Subtle pulsing
      const time = state.clock.elapsedTime;
      const scale = 1 + Math.sin(time * 2) * 0.1;
      pointsRef.current.scale.setScalar(scale);
    }
    
    // Apply wave animation to geometry
    if (geometryRef.current) {
      const geometry = geometryRef.current;
      const positions = geometry.attributes.position.array;
      const time = state.clock.elapsedTime;
      
      // Apply wave animation
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const offset = i * 0.1;
        const wave = Math.sin(time * 2 + offset) * 0.3;
        
        positions[i3] = originalPositions[i3] + wave;
        positions[i3 + 1] = originalPositions[i3 + 1] + wave * 0.5;
        positions[i3 + 2] = originalPositions[i3 + 2] + wave * 0.2;
      }
      
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colorsArray}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={count}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          vertexColors
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={opacity}
          alphaTest={0.01}
        />
      </points>
    </group>
  );
};

export default GlowingOrbs;