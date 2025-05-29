// my-app/src/shared/components/WebGLComponent/Lights.ts
import * as THREE from "three";

export function createLights(scene: THREE.Scene) {
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xffffff, 5, 100);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 5, 100);
  pointLight2.position.set(-5, -5, -5);
  scene.add(pointLight2);
}
