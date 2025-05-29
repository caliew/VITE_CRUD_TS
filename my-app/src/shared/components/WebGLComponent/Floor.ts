// my-app/src/shared/components/WebGLComponent/Floor.ts
import * as THREE from "three";

export function createFloor(scene: THREE.Scene) {
  // Define Floor Geometry
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 100,
  });
  const floor = new THREE.Mesh(geometry, material);

  // Draw edges of the Floor
  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 2,
  });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  // Add edges to cube
  floor.add(edges);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -0.5, 0);
  scene.add(floor);
}
