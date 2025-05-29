// my-app/src/shared/components/WebGLComponent/Cube.ts
import * as THREE from "three";

export function createCube(scene: THREE.Scene) {
  // Define Cube Geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0x00ff00,
    shininess: 100,
  });
  const cube = new THREE.Mesh(geometry, material);

  // Draw edges of the cube
  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 2,
  });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  // Add edges to cube
  cube.add(edges);

  cube.position.set(0, 0.5, 0);
  scene.add(cube);
}
