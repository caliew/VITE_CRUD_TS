const GetMouseEventFeedback = (renderer) => {
  const canvas = renderer.domElement;
  canvas.addEventListener("mousemove", (event) => {
    console.log("Mouse move:", event);
  });
  canvas.addEventListener("mousedown", (event) => {
    console.log("Mouse down:", event);
  });
  canvas.addEventListener("mouseup", (event) => {
    console.log("Mouse up:", event);
  });

  return () => {
    window.removeEventListener("resize", handleResize);
    canvas.removeEventListener("mousemove", () => {});
    canvas.removeEventListener("mousedown", () => {});
    canvas.removeEventListener("mouseup", () => {});
  };
};

const handleResize = () => {
  camera.aspect =
    containerRef.current.offsetWidth / containerRef.current.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    containerRef.current.offsetWidth,
    containerRef.current.offsetHeight
  );
};

window.addEventListener("resize", handleResize);
