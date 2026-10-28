"use client";

import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsHandle } from "three-stdlib";

type SceneProps = { progress: MutableRefObject<{ value: number }>; controlsRef: MutableRefObject<OrbitControlsHandle | null>; invalidateRef: MutableRefObject<(() => void) | null>; windowImage: string; onOrbitInteraction: () => void };
type RoomProps = { progress: SceneProps["progress"]; controlsRef: SceneProps["controlsRef"]; onOrbitInteraction: SceneProps["onOrbitInteraction"]; windowImage: SceneProps["windowImage"]; mobile: boolean };
const floorStart = new THREE.Color("#aaa89e");
const floorEnd = new THREE.Color("#b99a74");
const wallStart = new THREE.Color("#c7c3b8");
const wallEnd = new THREE.Color("#e9e3d8");

function ease(progress: number, start: number, length: number) {
  const value = THREE.MathUtils.clamp((progress - start) / length, 0, 1);
  return value * value * (3 - 2 * value);
}

function FrameInvalidator({ invalidateRef }: { invalidateRef: SceneProps["invalidateRef"] }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidateRef.current = invalidate;
    invalidate();
    return () => {
      if (invalidateRef.current === invalidate) invalidateRef.current = null;
    };
  }, [invalidate, invalidateRef]);

  return null;
}

function Room({ progress, controlsRef, onOrbitInteraction, windowImage, mobile }: RoomProps) {
  const sofa = useRef<THREE.Group>(null);
  const tables = useRef<THREE.Group>(null);
  const decor = useRef<THREE.Group>(null);
  const plants = useRef<THREE.Group>(null);
  const room = useRef<THREE.Group>(null);
  const frontWall = useRef<THREE.Group>(null);
  const backWall = useRef<THREE.Group>(null);
  const leftWall = useRef<THREE.Group>(null);
  const rightWall = useRef<THREE.Group>(null);
  const openSide = useRef({ x: 1, z: 1 });
  const glow = useRef<THREE.PointLight>(null);
  const floorMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const wallMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const windowGlassMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const windowPhotoMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const [windowTexture, setWindowTexture] = useState<THREE.Texture | null>(null);
  const [sofaHover, setSofaHover] = useState(false);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    let active = true;
    const texture = new THREE.TextureLoader().load(windowImage, (loadedTexture) => {
      if (!active) {
        loadedTexture.dispose();
        return;
      }

      const image = loadedTexture.image as HTMLImageElement;
      const imageRatio = image.width / image.height;
      const windowRatio = 2.58 / 2.23;
      if (imageRatio > windowRatio) {
        loadedTexture.repeat.x = windowRatio / imageRatio;
        loadedTexture.offset.x = (1 - loadedTexture.repeat.x) / 2;
      } else {
        loadedTexture.repeat.y = imageRatio / windowRatio;
        loadedTexture.offset.y = (1 - loadedTexture.repeat.y) / 2;
      }
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      loadedTexture.needsUpdate = true;
      setWindowTexture(loadedTexture);
      invalidate();
    }, undefined, () => {
      if (active) invalidate();
    });

    return () => {
      active = false;
      texture.dispose();
    };
  }, [invalidate, windowImage]);

  useFrame((state) => {
    const p = progress.current.value;
    const sofaIn = ease(p, 0.28, 0.23);
    const tableIn = ease(p, 0.48, 0.2);
    const decorIn = ease(p, 0.7, 0.18);
    const plantIn = ease(p, 0.56, 0.25);
    const windowReveal = ease(p, 0.78, 0.18);

    if (windowGlassMaterial.current) windowGlassMaterial.current.opacity = 1 - windowReveal;
    if (windowPhotoMaterial.current) windowPhotoMaterial.current.opacity = windowTexture ? windowReveal : 0;

    if (sofa.current) {
      sofa.current.scale.setScalar(sofaIn);
      sofa.current.position.y = 0.05 + sofaIn * 0.6;
    }
    if (tables.current) {
      tables.current.scale.setScalar(tableIn);
      tables.current.position.y = 0.04 + tableIn * 0.35;
    }
    if (decor.current) {
      decor.current.scale.setScalar(decorIn);
      decor.current.position.y = 0.05 + decorIn * 0.25;
    }
    if (plants.current) {
      plants.current.scale.setScalar(plantIn);
      plants.current.position.y = 0.04 + plantIn * 0.3;
    }
    floorMaterial.current?.color.lerpColors(floorStart, floorEnd, ease(p, 0.2, 0.38));
    wallMaterial.current?.color.lerpColors(wallStart, wallEnd, ease(p, 0.22, 0.38));
    if (glow.current) glow.current.intensity = 0.15 + ease(p, 0.55, 0.3) * 0.9;
    if (room.current) {
      room.current.rotation.y = -0.05 + p * 0.12;
      room.current.rotation.x = 0;
      const cameraPosition = room.current.worldToLocal(state.camera.position.clone());
      if (Math.abs(cameraPosition.x) > 0.35) openSide.current.x = Math.sign(cameraPosition.x);
      if (Math.abs(cameraPosition.z) > 0.35) openSide.current.z = Math.sign(cameraPosition.z);
      if (frontWall.current) frontWall.current.visible = openSide.current.z < 0;
      if (backWall.current) backWall.current.visible = openSide.current.z > 0;
      if (rightWall.current) rightWall.current.visible = openSide.current.x < 0;
      if (leftWall.current) leftWall.current.visible = openSide.current.x > 0;
    }
  });

  return (
    <group ref={room} position={[0.7, -0.48, 0]} scale={0.9}>
      <ambientLight intensity={1.35} color="#fff5e8" />
      <hemisphereLight args={["#fff7ed", "#756b5e", 1.05]} />
      <directionalLight position={[-4, 8, 5]} intensity={2.35} color="#fff4df" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0003} shadow-radius={7} />
      <pointLight ref={glow} position={[0, 3.3, -1.6]} intensity={0.15} color="#e6a36f" distance={8} />

      <group>
        <RoundedBox args={[8.1, 0.22, 6.2]} radius={0.045} smoothness={3} position={[0, -0.11, 0]} receiveShadow castShadow>
          <meshStandardMaterial ref={floorMaterial} color="#b99a74" roughness={0.85} />
        </RoundedBox>
        <group ref={backWall}>
          <RoundedBox args={[8.1, 4.8, 0.2]} radius={0.045} smoothness={3} position={[0, 2.28, -3.02]} receiveShadow castShadow>
            <meshStandardMaterial ref={wallMaterial} color="#e9e3d8" roughness={0.96} />
          </RoundedBox>
        {Array.from({ length: 10 }, (_, index) => (
          <mesh key={`slat-${index}`} position={[2.15 + index * 0.17, 2.28, -2.88]} castShadow receiveShadow>
            <boxGeometry args={[0.045, 3.75, 0.08]} />
            <meshStandardMaterial color={index % 2 ? "#bb946b" : "#c4a079"} roughness={0.86} />
          </mesh>
        ))}
          <mesh position={[0, 0.16, -2.88]} castShadow>
            <boxGeometry args={[7.9, 0.16, 0.16]} />
            <meshStandardMaterial color="#c5ad8e" roughness={0.82} />
          </mesh>
          {/* The interior window remains visible as the cutaway rotates. */}
          <group position={[-1.75, 2.55, -2.88]}>
            <mesh position={[0, 0, -0.02]}>
              <planeGeometry args={[2.7, 2.35]} />
              <meshBasicMaterial ref={windowGlassMaterial} color="#b9c5c1" transparent opacity={1} depthWrite={false} />
            </mesh>
            <mesh position={[0, 0, 0.005]} renderOrder={2}>
              <planeGeometry args={[2.58, 2.23]} />
              <meshBasicMaterial ref={windowPhotoMaterial} map={windowTexture} transparent opacity={0} depthWrite={false} toneMapped={false} />
            </mesh>
            {[-1.38, 1.38].map((x) => <mesh key={x} position={[x, 0, 0.06]}><boxGeometry args={[0.09, 2.55, 0.13]} /><meshStandardMaterial color="#e7dfd2" roughness={0.65} /></mesh>)}
            {[-1.2, 1.2].map((y) => <mesh key={y} position={[0, y, 0.06]}><boxGeometry args={[2.85, 0.09, 0.13]} /><meshStandardMaterial color="#e7dfd2" roughness={0.65} /></mesh>)}
            <mesh position={[0, 0, 0.07]}><boxGeometry args={[0.055, 2.35, 0.14]} /><meshStandardMaterial color="#d7cdbd" /></mesh>
          </group>
        </group>

        <group ref={leftWall}>
          <RoundedBox args={[0.2, 4.8, 6.0]} radius={0.045} smoothness={3} position={[-4.02, 2.28, 0]} receiveShadow castShadow>
            <meshStandardMaterial color="#ddd5c6" roughness={0.96} />
          </RoundedBox>
          <mesh position={[-3.9, 0.16, 0]} castShadow><boxGeometry args={[0.16, 0.16, 5.9]} /><meshStandardMaterial color="#c5ad8e" roughness={0.82} /></mesh>
          {[-1.9, -1.62, -1.34, -1.06, -0.78, -0.5].map((z) => <mesh key={z} position={[-3.89, 2.28, z]} castShadow><boxGeometry args={[0.06, 3.75, 0.045]} /><meshStandardMaterial color="#c4a079" roughness={0.86} /></mesh>)}
        </group>
        <group ref={rightWall}>
          <RoundedBox args={[0.2, 4.8, 6.0]} radius={0.045} smoothness={3} position={[4.02, 2.28, 0]} receiveShadow castShadow>
            <meshStandardMaterial color="#ddd5c6" roughness={0.96} />
          </RoundedBox>
          <mesh position={[3.9, 0.16, 0]} castShadow><boxGeometry args={[0.16, 0.16, 5.9]} /><meshStandardMaterial color="#c5ad8e" roughness={0.82} /></mesh>
          {[-1.75, -1.47, -1.19, -0.91, -0.63, -0.35].map((z) => <mesh key={z} position={[3.89, 2.28, z]} castShadow><boxGeometry args={[0.06, 3.75, 0.045]} /><meshStandardMaterial color="#c4a079" roughness={0.86} /></mesh>)}
        </group>
        <group ref={frontWall}>
          <RoundedBox args={[8.1, 4.8, 0.2]} radius={0.045} smoothness={3} position={[0, 2.28, 3.02]} receiveShadow castShadow>
            <meshStandardMaterial color="#d8cfbf" roughness={0.96} />
          </RoundedBox>
          <mesh position={[0, 0.16, 2.88]} castShadow><boxGeometry args={[7.9, 0.16, 0.16]} /><meshStandardMaterial color="#c5ad8e" roughness={0.82} /></mesh>
          <group position={[-1.7, 2.5, 2.87]}>
            <mesh><planeGeometry args={[2.4, 1.85]} /><meshBasicMaterial color="#b7c3bc" side={THREE.DoubleSide} /></mesh>
            {[-1.24, 1.24].map((x) => <mesh key={x} position={[x, 0, 0.04]}><boxGeometry args={[0.08, 2, 0.1]} /><meshStandardMaterial color="#eee5d7" /></mesh>)}
            {[-0.96, 0.96].map((y) => <mesh key={y} position={[0, y, 0.04]}><boxGeometry args={[2.55, 0.08, 0.1]} /><meshStandardMaterial color="#eee5d7" /></mesh>)}
          </group>
        </group>
        <RoundedBox args={[3.6, 0.12, 2.65]} radius={0.16} smoothness={5} position={[0, 0.025, 0.75]} receiveShadow>
          <meshStandardMaterial color="#9c6d4e" roughness={1} />
        </RoundedBox>
        {Array.from({ length: 8 }, (_, index) => (
          <mesh key={index} position={[-3.5 + index, 0.04, 0.75]} receiveShadow>
            <boxGeometry args={[0.012, 0.008, 2.4]} />
            <meshStandardMaterial color="#b48a64" roughness={1} />
          </mesh>
        ))}

        {/* Stylized furniture is built from soft-edged, lightweight geometry. */}
        <group ref={sofa} position={[0, 0.05, 0.25]} scale={0}>
          <group onPointerOver={(event) => { event.stopPropagation(); setSofaHover(true); }} onPointerOut={() => setSofaHover(false)}>
            <RoundedBox args={[3.25, 0.48, 1.22]} radius={0.18} smoothness={6} position={[0, 0.46, 0.28]} castShadow receiveShadow>
              <meshStandardMaterial color={sofaHover ? "#d58d68" : "#c17c5d"} roughness={0.78} />
            </RoundedBox>
            <RoundedBox args={[3.25, 0.88, 0.38]} radius={0.16} smoothness={6} position={[0, 1.03, -0.2]} castShadow receiveShadow>
              <meshStandardMaterial color="#b96f52" roughness={0.8} />
            </RoundedBox>
            {[-1.45, 1.45].map((x) => <RoundedBox key={x} args={[0.42, 0.72, 1.2]} radius={0.15} smoothness={6} position={[x, 0.73, 0.23]} castShadow receiveShadow><meshStandardMaterial color="#b96f52" roughness={0.82} /></RoundedBox>)}
            {[-0.94, 0, 0.94].map((x, index) => <RoundedBox key={x} args={[0.82, 0.22, 0.76]} radius={0.12} smoothness={6} position={[x, 0.86, 0.4]} rotation={[0.04, index === 1 ? 0 : index === 0 ? -0.08 : 0.08, 0]} castShadow><meshStandardMaterial color={index === 1 ? "#d7b48a" : "#ead9c4"} roughness={0.9} /></RoundedBox>)}
            {[-1.15, 1.15].flatMap((x) => [-0.02, 0.85].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.17, z]} castShadow><cylinderGeometry args={[0.055, 0.07, 0.34, 8]} /><meshStandardMaterial color="#5e4737" roughness={0.65} /></mesh>))}
          </group>
        </group>

        <group ref={tables} position={[0, 0.04, 0.85]} scale={0}>
          <RoundedBox args={[1.75, 0.16, 0.9]} radius={0.1} smoothness={5} position={[0, 0.52, 1.55]} castShadow receiveShadow><meshStandardMaterial color="#a87955" roughness={0.72} /></RoundedBox>
          {[-0.65, 0.65].flatMap((x) => [1.28, 1.82].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.28, z]} castShadow><cylinderGeometry args={[0.045, 0.055, 0.5, 8]} /><meshStandardMaterial color="#6c523e" roughness={0.65} /></mesh>))}
          <group position={[-2.28, 0.2, -0.05]}>
            <RoundedBox args={[0.8, 0.12, 0.75]} radius={0.08} smoothness={4} position={[0, 0.54, 0]} castShadow><meshStandardMaterial color="#987052" roughness={0.75} /></RoundedBox>
            <mesh position={[0, 0.26, 0]} castShadow><cylinderGeometry args={[0.055, 0.07, 0.52, 10]} /><meshStandardMaterial color="#725942" /></mesh>
            <mesh position={[0, 1.14, 0]} castShadow><cylinderGeometry args={[0.025, 0.025, 1.26, 10]} /><meshStandardMaterial color="#8f795f" metalness={0.25} roughness={0.45} /></mesh>
            <mesh position={[0, 1.82, 0]} castShadow><coneGeometry args={[0.36, 0.42, 24, 1, true]} /><meshStandardMaterial color="#e5d3b6" side={THREE.DoubleSide} roughness={0.8} /></mesh>
            <pointLight position={[0, 1.55, 0]} intensity={0.4} color="#f1c58f" distance={3} />
          </group>
        </group>

        <group ref={plants} position={[0, 0.04, 0]} scale={0}>
          <group position={[2.55, 0, -0.95]}>
            <mesh position={[0, 0.36, 0]} castShadow><cylinderGeometry args={[0.33, 0.25, 0.62, 16]} /><meshStandardMaterial color="#9d6c4d" roughness={0.9} /></mesh>
            <mesh position={[0, 0.68, 0]}><cylinderGeometry args={[0.27, 0.27, 0.07, 16]} /><meshStandardMaterial color="#473f32" /></mesh>
            <mesh position={[0, 1.22, 0]} castShadow><cylinderGeometry args={[0.045, 0.075, 1.15, 8]} /><meshStandardMaterial color="#667457" roughness={0.95} /></mesh>
            {[-0.22, 0.18, 0.29, -0.12].map((x, index) => <mesh key={`branch-${index}`} position={[x * 0.45, 1.55 + (index % 2) * 0.12, 0]} rotation={[0, 0, x * 1.4]} castShadow><cylinderGeometry args={[0.018, 0.03, 0.62, 6]} /><meshStandardMaterial color="#667457" roughness={0.95} /></mesh>)}
            {[[-0.3, 1.5, 0], [0.22, 1.75, 0.03], [0.42, 1.36, -0.04], [-0.05, 1.95, -0.02], [-0.42, 1.86, 0.02], [0.08, 1.35, 0.02]].map(([x, y, z], index) => <mesh key={index} position={[x, y, z]} rotation={[0, 0, (index % 2 ? 1 : -1) * 0.45]} scale={[0.3, 0.58, 0.12]} castShadow><sphereGeometry args={[0.48, 12, 10]} /><meshStandardMaterial color={index % 2 ? "#6c8068" : "#879174"} roughness={0.9} /></mesh>)}
          </group>
        </group>

        <group ref={decor} position={[0, 0.05, 0]} scale={0}>
          <RoundedBox args={[0.86, 0.07, 0.58]} radius={0.04} smoothness={3} position={[1.45, 0.92, 1.55]} castShadow><meshStandardMaterial color="#e6d9c2" roughness={0.85} /></RoundedBox>
          <mesh position={[1.45, 1.07, 1.55]} castShadow><cylinderGeometry args={[0.12, 0.14, 0.22, 16]} /><meshStandardMaterial color="#8b9a7b" roughness={0.6} /></mesh>
          <mesh position={[1.45, 1.29, 1.55]}><sphereGeometry args={[0.15, 20, 16]} /><meshStandardMaterial color="#d8c3a5" roughness={0.35} /></mesh>
          <group position={[1.1, 2.45, -2.86]}>
            <RoundedBox args={[1.45, 0.95, 0.1]} radius={0.035} smoothness={3} castShadow><meshStandardMaterial color="#f1eadf" roughness={0.9} /></RoundedBox>
            <RoundedBox args={[1.26, 0.76, 0.04]} radius={0.02} smoothness={2} position={[0, 0, 0.07]}><meshStandardMaterial color="#8e9a82" roughness={0.9} /></RoundedBox>
            <mesh position={[0, 0.02, 0.1]}><coneGeometry args={[0.34, 0.64, 3]} /><meshStandardMaterial color="#d1aa7c" roughness={1} /></mesh>
          </group>
        </group>
      </group>

      {!mobile && <ContactShadows position={[0, 0.012, 0]} opacity={0.32} scale={9} blur={2.8} far={3.8} resolution={512} color="#493c31" />}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0.63, 0.72, 0]}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.56}
        minPolarAngle={0.82}
        maxPolarAngle={1.62}
        onStart={onOrbitInteraction}
        onEnd={onOrbitInteraction}
      />
    </group>
  );
}

export default function RoomCanvas({ progress, controlsRef, invalidateRef, windowImage, onOrbitInteraction }: SceneProps) {
  const [isMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

  return (
    <Canvas
      className="room-canvas"
      aria-label="Interactive 3D room. Drag or swipe sideways to orbit the room."
      frameloop="demand"
      shadows={isMobile ? false : { type: THREE.PCFShadowMap }}
      dpr={isMobile ? 1 : [1, 1.25]}
      camera={{ position: [6.8, 5.1, 8.5], fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      fallback={<div className="room-canvas-fallback" role="img" aria-label="A warm, stylized living room with a sofa, lamp and coffee table." />}
    >
      <color attach="background" args={["#ece8df"]} />
      <FrameInvalidator invalidateRef={invalidateRef} />
      <Room progress={progress} controlsRef={controlsRef} onOrbitInteraction={onOrbitInteraction} windowImage={windowImage} mobile={isMobile} />
    </Canvas>
  );
}
