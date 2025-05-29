import { useEffect, useRef } from "react";
import { createScene } from "./Scene";
import { createCamera } from "./Camera";
import { createRenderer } from "./Renderer";
import { createOrbitControls } from "./OrbitControls";
import { createLights } from "./Lights";
import { createCube } from "./Cube";
import { createFloor } from "./Floor";

const WebGLComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scene = createScene();
      const camera = createCamera();
      const renderer = createRenderer(containerRef.current);
      const controls = createOrbitControls(camera, renderer.domElement);

      createLights(scene);

      controls.enableDamping = true;

      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      createCube(scene);
      createFloor(scene);

      camera.position.z = 5;

      const handleResize = () => {
        camera.aspect =
          containerRef.current.offsetWidth / containerRef.current.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight
        );
      };
      window.addEventListener("resize", handleResize);

      const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      false && GetMouseEventFeedback(renderer);
    }
  }, []);

  return <div ref={containerRef} className="WebGLComponent" />;
};

export default WebGLComponent;
