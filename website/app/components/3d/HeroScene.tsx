'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, PerspectiveCamera, Float, useTexture } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// Clapperboard Component with Logo
function Clapperboard() {
    const groupRef = useRef<THREE.Group>(null);
    const clapperRef = useRef<THREE.Mesh>(null);

    // Load logo texture
    const logoTexture = useTexture('/logo.jpg');
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.magFilter = THREE.LinearFilter;
    logoTexture.minFilter = THREE.LinearFilter;

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating rotation + auto rotation (since we removed OrbitControls)
            groupRef.current.rotation.y = (state.clock.getElapsedTime() * 0.2) + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
            groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
        }
        if (clapperRef.current) {
            // Occasional clapping animation
            const time = state.clock.getElapsedTime();
            const clap = Math.sin(time * 2);
            if (clap > 0.8) {
                clapperRef.current.rotation.z = THREE.MathUtils.lerp(clapperRef.current.rotation.z, 0.4, 0.1);
            } else {
                clapperRef.current.rotation.z = THREE.MathUtils.lerp(clapperRef.current.rotation.z, 0, 0.1);
            }
        }
    });

    return (
        <group ref={groupRef} rotation={[0.1, -0.4, 0]} scale={1.2}>
            {/* Main board */}
            <mesh>
                <boxGeometry args={[3.2, 2.4, 0.15]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.8} />
            </mesh>

            {/* Logo Plane - Front */}
            <mesh position={[0, -0.2, 0.08]}>
                <planeGeometry args={[2.0, 1.0]} />
                <meshStandardMaterial
                    map={logoTexture}
                    transparent
                    alphaTest={0.5}
                    roughness={0.3}
                    metalness={0.2}
                />
            </mesh>

            {/* Logo Plane - Back */}
            <mesh position={[0, -0.2, -0.08]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[2.0, 1.0]} />
                <meshStandardMaterial
                    map={logoTexture}
                    transparent
                    alphaTest={0.5}
                    roughness={0.1}
                    metalness={0.3}
                />
            </mesh>

            {/* White stripes on hinge */}
            <mesh position={[0, 1.25, 0.06]}>
                <boxGeometry args={[3.2, 0.4, 0.05]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Black stripes on hinge */}
            {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
                <mesh key={i} position={[x, 1.25, 0.07]}>
                    <boxGeometry args={[0.4, 0.41, 0.04]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
            ))}

            {/* Top Movable Clapper */}
            <group position={[-1.6, 1.45, 0]}> {/* Hinge point */}
                <group ref={clapperRef as any} position={[1.6, 0.2, 0]}> {/* Center of clapper relative to hinge */}
                    <mesh>
                        <boxGeometry args={[3.2, 0.4, 0.15]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                    {/* Black stripes on clapper */}
                    {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
                        <mesh key={`clap-${i}`} position={[x, 0, 0.01]}>
                            <boxGeometry args={[0.4, 0.41, 0.14]} />
                            <meshStandardMaterial color="#000000" />
                        </mesh>
                    ))}
                </group>
            </group>

            {/* Gold accent text area (bottom strip) */}
            <mesh position={[0, -1.3, 0.08]}>
                <boxGeometry args={[3.2, 0.05, 0.05]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} emissive="#f59e0b" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="w-full h-full">
            <Canvas style={{ touchAction: 'pan-y' }}>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} />

                    <PresentationControls
                        global={false} // Only respond to events on the object
                        cursor={true}
                        snap={true} // Snap back to original position
                        speed={2}
                        zoom={1}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                    >
                        {/* Lighting is kept inside PresentationControls to maintain consistent highlights on the object if needed,
                            but usually lighting is better outside if we want global lighting. */}

                        {/* Single Object */}
                        <Clapperboard />
                    </PresentationControls>

                    {/* Lighting - External to controls so it stays fixed relative to camera */}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                    <pointLight position={[-5, 3, -3]} color="#f59e0b" intensity={2} />
                    <spotLight
                        position={[0, 8, 5]}
                        angle={0.4}
                        penumbra={1}
                        intensity={2}
                        color="#ffffff"
                    />

                    {/* Cinematic Background Particles */}
                    <mesh position={[0, 0, -5]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
                    </mesh>

                </Suspense>
            </Canvas>
        </div>
    );
}
