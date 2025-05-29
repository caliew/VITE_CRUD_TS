// my-app/src/shared/components/WebGLComponent/Lights.ts
import * as THREE from "three";

export function createLights(scene: THREE.Scene) {
  const ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xffffff, 5, 100);
  pointLight1.position.set(0, 20, 0);
  scene.add(pointLight1);
}
