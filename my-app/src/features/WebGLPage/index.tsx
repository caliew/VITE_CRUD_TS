import { WebGLComponentContainer } from "@shared/components/WebGLComponent";
import { SlideShow, PageAction } from "@shared/components";
import { PageClasses } from "@shared/utils/classname";
import "./index.css";

const WebGLPage = () => {
  return (
    <div className="WebGLPage">
      <h1>WebGL Page</h1>
      <WebGLComponentContainer />
      <PageAction />
    </div>
  );
};

export default WebGLPage;
