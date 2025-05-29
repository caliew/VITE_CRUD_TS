// my-app/src/shared/components/WebGLComponent/OrbitControls.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createOrbitControls(
  camera: THREE.Camera,
  domElement: HTMLElement
) {
  return new OrbitControls(camera, domElement);
}
