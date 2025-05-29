// my-app/src/shared/components/WebGLComponent/WebGLModules.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createScene() {
  return new THREE.Scene();
}

export function createCamera() {
  return new THREE.PerspectiveCamera();
}

export function createRenderer() {
  return new THREE.WebGLRenderer();
}

export function createOrbitControls(camera, domElement) {
  return new OrbitControls(camera, domElement);
}
