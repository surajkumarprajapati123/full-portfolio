// components/WatermarkedAvatar.jsx
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

const WatermarkedAvatar = ({ 
  imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  watermarkText = "PORTFOLIO",
  mousePosition = { x: 0, y: 0 },
  onLoad,
  size = 3,
  rotationSpeed = 0.2
}) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { viewport } = useThree();
  
  // Load texture with error handling
  const texture = useLoader(THREE.TextureLoader, imageUrl, (loader) => {
    loader.manager.onLoad = () => {
      setLoaded(true);
      if (onLoad) onLoad();
    };
  });

  // Create custom shader material
  const material = useMemo(() => {
    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uHover;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        vPosition = position;
        
        // Mouse interaction
        vec3 pos = position;
        float dist = distance(pos.xy * 0.5, uMouse * 2.0);
        float wave = sin(dist * 10.0 - uTime * 2.0) * 0.1;
        
        // Hover effect
        float hoverWave = sin(pos.x * 5.0 + uTime) * 0.05 * uHover;
        pos.z += wave + hoverWave;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Fragment shader with watermark effect
    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uHover;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      // Simple noise function for watermark
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      void main() {
        // Sample texture with distortion
        vec2 distortedUv = vUv;
        float distortion = sin(vUv.y * 20.0 + uTime) * 0.01;
        distortedUv.x += distortion;
        
        vec4 color = texture2D(uTexture, distortedUv);
        
        // Edge glow based on normal
        float edge = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
        edge = smoothstep(0.0, 0.5, edge) * 0.3;
        
        // Watermark pattern
        vec2 watermarkUV = vUv * 15.0;
        float watermark = random(floor(watermarkUV + uTime * 0.05));
        watermark = step(0.85, watermark) * 0.15;
        
        // Mouse interaction glow
        vec2 mouseDist = vUv - (uMouse * 0.5 + 0.5);
        float mouseGlow = 1.0 - smoothstep(0.0, 0.4, length(mouseDist));
        mouseGlow *= 0.4;
        
        // Hover glow effect
        float hoverGlow = sin(vPosition.x * 8.0 + uTime) * 0.2 * uHover;
        
        // Combine all effects
        color.rgb += edge;
        color.rgb += watermark;
        color.rgb += mouseGlow;
        color.rgb += hoverGlow;
        
        // Enhance colors on hover
        color.rgb *= 1.0 + uHover * 0.3;
        
        gl_FragColor = color;
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0 }
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true
    });
  }, [texture]);

  // Animation frame
  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      
      // Update shader uniforms
      if (material && material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
        material.uniforms.uMouse.value.set(
          mousePosition.x / 100,
          mousePosition.y / 100
        );
        
        // Smooth hover transition
        const targetHover = hovered ? 1 : 0;
        material.uniforms.uHover.value = THREE.MathUtils.lerp(
          material.uniforms.uHover.value,
          targetHover,
          0.1
        );
      }
      
      // Gentle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    // Group rotation for orbiting elements
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Watermark ring component
  const WatermarkRing = ({ radius, count, size }) => {
    const textRefs = useRef([]);
    
    useFrame((state) => {
      textRefs.current.forEach((text, i) => {
        if (text) {
          const angle = (i / count) * Math.PI * 2 + state.clock.elapsedTime * 0.1;
          text.position.x = Math.cos(angle) * radius;
          text.position.z = Math.sin(angle) * radius;
          text.rotation.y = -angle;
          text.scale.setScalar(size * (0.8 + Math.sin(state.clock.elapsedTime + i) * 0.2));
        }
      });
    });

    return (
      <group>
        {Array.from({ length: count }).map((_, i) => (
          <Text
            key={i}
            ref={(el) => (textRefs.current[i] = el)}
            fontSize={0.3}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.1}
            outlineOpacity={0.3}
            outlineWidth={0.01}
            outlineColor="#3B82F6"
          >
            {watermarkText}
          </Text>
        ))}
      </group>
    );
  };

  // Generate random particles
  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = size * 1.5 + Math.random() * size;
      const height = (Math.random() - 0.5) * size;
      
      positions.push(
        Math.cos(angle) * distance,
        height,
        Math.sin(angle) * distance
      );
    }
    return new Float32Array(positions);
  }, [size]);

  return (
    <group ref={groupRef}>
      {/* Main avatar sphere with watermarked shader */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Watermark text rings */}
      <WatermarkRing radius={size * 1.2} count={6} size={0.3} />
      <WatermarkRing radius={size * 1.6} count={8} size={0.2} />
      <WatermarkRing radius={size * 2.0} count={10} size={0.15} />

      {/* Orbiting particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#3B82F6"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>

      {/* Loading state */}
      {!loaded && (
        <mesh>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial
            color="#1E293B"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
};

export default WatermarkedAvatar;