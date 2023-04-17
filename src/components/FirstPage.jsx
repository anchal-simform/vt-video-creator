import Sidebar from "./Sidebar/Sidebar";
import Timeline from "./Timeline/Timeline";
import Viewport from "./Viewport/Viewport";
import Toolbox from "./Toolbox/Toolbox";
import "./FirstPage.scss";

function FirstPage() {
  return (
    <div className="editor">
      <div className="editor__top">
        <Sidebar />
        <div className="viewport-wrapper">
          <Viewport />
          <Toolbox />
        </div>
      </div>
      <div className="editor__bottom">
        <Timeline />
      </div>
    </div>
  );
}

export default FirstPage;
