import * as THREE from "three";
import { useEffect, useRef } from "react";
import { createScene } from "./Scene";
import { createCamera } from "./Camera";
import { createRenderer } from "./Renderer";
import { createOrbitControls } from "./OrbitControls";
import { createLights } from "./Lights";
import { createCube } from "./Cube";
import { createFloor } from "./Floor";
import { createSkybox } from "./Skybox";

const WebGLComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scene = createScene();
      const camera = createCamera();
      camera.position.set(0, 5, 10);
      const renderer = createRenderer(containerRef.current);
      renderer.shadowMap.enabled = true;
      const controls = createOrbitControls(camera, renderer.domElement);
      createLights(scene);
      createCube(scene);
      createFloor(scene);
      createSkybox(scene);

      const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      false && GetMouseEventFeedback(renderer);
    }
  }, []);

  return <div ref={containerRef} className="WebGLComponent" />;
};

export default WebGLComponent;
