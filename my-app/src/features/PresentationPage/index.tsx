import { SlideShow, PageAction } from "@shared/components";
import { PageClasses } from "@shared/utils/classname";
import "./styles.css";

const PresentationPage = () => {
  return (
    <div className={PageClasses}>
      <SlideShow />
      <PageAction />
    </div>
  );
};

export default PresentationPage;
