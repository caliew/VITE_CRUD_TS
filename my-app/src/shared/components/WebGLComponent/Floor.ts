// my-app/src/shared/components/WebGLComponent/Floor.ts
import * as THREE from "three";

export function createFloor(scene: THREE.Scene) {
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 100,
  });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -0.5, 0);
  scene.add(floor);
}
