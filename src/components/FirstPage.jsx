import Sidebar from "./Sidebar/Sidebar";
import Timeline from "./Timeline/Timeline";
import "./FirstPage.scss";

function FirstPage() {
  return (
    <div className="editor">
      <div className="editor__top">
        <Sidebar />
      </div>
      <div className="editor__bottom">
        <Timeline />
      </div>
    </div>
  );
}

export default FirstPage;
