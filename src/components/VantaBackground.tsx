// components/VantaBackground.tsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any = null;

    const loadVanta = async () => {
      if (
        typeof window !== "undefined" &&
        (window as any).VANTA &&
        (window as any).THREE &&
        vantaRef.current
      ) {
        // Destroy existing effect if any
        if (vantaEffect) {
          vantaEffect.destroy();
        }

        vantaEffect = (window as any).VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x38bdf8,
          backgroundColor: 0x0f1115,
          points: 10,
          maxDistance: 20,
          spacing: 15,
          showDots: true,
          THREE: (window as any).THREE,
        });
      }
    };

    // Increased interval time and max attempts for better reliability
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait time

    const interval = setInterval(() => {
      attempts++;
      if ((window as any).VANTA && (window as any).THREE) {
        clearInterval(interval);
        loadVanta();
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.warn("VantaBackground: Failed to load after maximum attempts");
      }
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(interval);
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="beforeInteractive"
      />
      <div
        ref={vantaRef}
        className="w-full h-screen absolute top-0 left-0 z-0"
      />
    </>
  );
}
