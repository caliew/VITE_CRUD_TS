// my-app/src/shared/components/WebGLComponent/Skybox.ts
import * as THREE from "three";

export function createSkybox(scene: THREE.Scene) {
  const skyboxGeometry = new THREE.BoxGeometry(100, 100, 100);
  const skyboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x87ceeb, // light blue color
    side: THREE.BackSide,
  });
  const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  skybox.scale.set(10, 10, 10); // scale the Skybox to cover the entire scene
  scene.add(skybox);
}
