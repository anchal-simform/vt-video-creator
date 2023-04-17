import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Timeline from '../components/Timeline/Timeline';
import Toolbox from '../components/Toolbox/Toolbox';
import Viewport from '../components/Viewport/Viewport';
import '../styles/Editor.scss';

function Editor() {
  const [activeItem, setActiveItem] = useState('text');
  console.log({ activeItem });
  return (
    <div className="editor">
      <div className="editor__top">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="viewport-wrapper">
          <Viewport />
          <Toolbox activeItem={activeItem} />
        </div>
      </div>
      <div className="editor__bottom">
        <Timeline />
      </div>
    </div>
  );
}

export default Editor;
