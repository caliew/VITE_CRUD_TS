// my-app/src/shared/components/WebGLComponent/Camera.ts
import * as THREE from "three";

export function createCamera() {
  return new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
}
