import React, { useRef } from 'react';
import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpeg';
import EarthNightMap from '../../assets/textures/8k_earth_nightmap.jpeg';
import EarthCloudMap from '../../assets/textures/8k_earth_clouds.jpeg';
import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function Earth(props) {
    const [normalMap, specularMap, cloudMap] =
        useLoader(TextureLoader, [EarthDayMap, EarthNightMap, EarthCloudMap]);

    const earthRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        earthRef.current.rotation.y = elapsedTime / 4.9;
        cloudRef.current.rotation.y = elapsedTime / 4.9;
    });
    return (
        <>

            {/* <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={1.2} /> */}

            <mesh ref={cloudRef}>
                <sphereGeometry args={[2.81, 64, 32]} />
                <meshPhongMaterial
                    map={cloudMap}
                    opacity={0.08}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <ambientLight intensity={12} />
            <mesh ref={earthRef}>
                <sphereGeometry args={[2.8, 64, 32]} />
                <meshPhongMaterial
                    noramlMap={normalMap}
                />
                <meshStandardMaterial
                    map={specularMap}
                    normalMap={normalMap}
                />
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                />
            </mesh>

        </>
    );
}