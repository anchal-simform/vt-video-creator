import './Toolbox.scss';
import ColorPaletteToolbox from './ColorPaletteToolbox';
import MediaToolbox from './MediaToolbox';
import TextToolbox from './TextToolbox';
import GraphicToolbox from './GraphicToolbox';

function Toolbox({ activeItem: toolbox }) {
  return (
    <div className="toolbox">
      {toolbox === 'text' && <TextToolbox />}
      {toolbox === 'media' && <MediaToolbox />}
      {toolbox === 'graphics' && <GraphicToolbox />}
      {toolbox === 'colors' && <ColorPaletteToolbox />}
    </div>
  );
}

export default Toolbox;
