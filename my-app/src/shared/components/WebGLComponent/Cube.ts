// my-app/src/shared/components/WebGLComponent/Cube.ts
import * as THREE from "three";

export function createCube(scene: THREE.Scene) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0x00ff00,
    shininess: 100,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0.5, 0);
  scene.add(cube);
}
