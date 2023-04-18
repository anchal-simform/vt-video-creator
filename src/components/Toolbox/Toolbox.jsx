import './Toolbox.scss';
import ColorPaletteToolbox from './ColorPaletteToolbox';
import MediaToolbox from './MediaToolbox';
import TextToolbox from './TextToolbox';

function Toolbox({ activeItem: toolbox }) {
  return (
    <div className="toolbox">
      {toolbox === 'text' && <TextToolbox />}
      {toolbox === 'media' && <MediaToolbox />}
      {toolbox === 'graphics' && (
        <>
          <div className="toolbox_title">Add Shapes</div>
        </>
      )}
      {toolbox === 'colors' && <ColorPaletteToolbox />}
    </div>
  );
}

export default Toolbox;
