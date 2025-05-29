// my-app/src/shared/components/WebGLComponent/Renderer.ts
import * as THREE from "three";

export function createRenderer(container: HTMLDivElement) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  return renderer;
}
