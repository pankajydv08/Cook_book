import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------
   🌫 SOFT MINIMAL STEAM
---------------------------------------------------*/
const SoftSteam = () => {
  const ref = useRef();
  const count = 18;

  const positions = useMemo(
    () => Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 0.5,
      Math.random() * 0.1,
      (Math.random() - 0.5) * 0.5,
    ]),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.children.forEach((p, i) => {
      p.position.y = 0.7 + i * 0.04 + Math.sin(t * 1.4 + i) * 0.04;
      p.position.x += Math.sin(t * 0.5 + i) * 0.0008;
      p.position.z += Math.cos(t * 0.5 + i) * 0.0008;

      p.material.opacity = 0.3 + Math.sin(t + i) * 0.12;
    });
  });

  return (
    <group ref={ref}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

/* ------------------------------------------------
   🍛 BEAUTIFUL CURRY BOWL (STATIC SURFACE)
---------------------------------------------------*/
const Bowl = () => {
  const bowlRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    bowlRef.current.position.x = Math.sin(t * 0.8) * 0.01;
    bowlRef.current.position.z = Math.cos(t * 0.8) * 0.01;
  });

  return (
    <group ref={bowlRef}>
      {/* Bowl outer */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.4, 1.15, 0.8, 64]} />
        <meshStandardMaterial color="#5c3521" roughness={0.45} />
      </mesh>

      {/* Static Curry Surface */}
      <mesh position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 48]} />
        <meshStandardMaterial color="#dfa45e" roughness={0.26} />
      </mesh>
    </group>
  );
};

/* ------------------------------------------------
   🥕 INGREDIENTS (With floating & rotating)
---------------------------------------------------*/
const Ingredient = ({ color, position }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t;
    ref.current.rotation.x = Math.sin(t + position[0]);
  });

  return (
    <Float speed={1.6} floatIntensity={1} rotationIntensity={0.6}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
    </Float>
  );
};

/* ------------------------------------------------
   🎥 CAMERA WITH MOUSE PARALLAX
---------------------------------------------------*/
const ParallaxCamera = ({ mouse }) => {
  const camRef = useRef();

  useFrame(() => {
    camRef.current.position.x += (mouse.current.x * 0.8 - camRef.current.position.x) * 0.08;
    camRef.current.position.y += (1.5 + mouse.current.y * 0.35 - camRef.current.position.y) * 0.08;
    camRef.current.lookAt(0, 0.5, 0);
  });

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 1.5, 4.8]} />;
};

/* ------------------------------------------------
   ⭐ FINAL HERO SCENE
---------------------------------------------------*/
export const ThreeHeroScene = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`h-[380px] w-full rounded-[2rem] border border-white/40 
        bg-white/20 backdrop-blur transition-all duration-500 
        ${hover ? "scale-[1.03]" : "scale-100"}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * -2;
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        mouse.current.x = 0;
        mouse.current.y = 0;
        setHover(false);
      }}
    >
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ParallaxCamera mouse={mouse} />

          {/* Lights */}
          <ambientLight intensity={0.85} />
          <directionalLight position={[3, 5, 3]} intensity={1.3} castShadow />

          {/* Bowl */}
          <Bowl />

          {/* Floating Ingredients */}
          <Ingredient color="#eecb58" position={[-1.1, 1.1, 0.1]} />
          <Ingredient color="#d8c27a" position={[0.3, 1.25, -0.2]} />
          <Ingredient color="#c8c2a4" position={[0.9, 1.05, 0.2]} />
          <Ingredient color="#d4473c" position={[1.3, 1.2, -0.1]} />

          {/* Soft Steam */}
          <SoftSteam />
        </Suspense>
      </Canvas>
    </div>
  );
};
