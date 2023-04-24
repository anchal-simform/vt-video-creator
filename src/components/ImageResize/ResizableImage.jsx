import useImage from 'use-image';
import '../Viewport/Viewport.scss';
import ImageWithTransformer from './ImageWithTransformer';

const ResizableImage = ({ src, imageDetails, onChange, onDragEnd, index }) => {
  const [image] = useImage(src);
  return (
    <ImageWithTransformer
      onDragEnd={onDragEnd}
      image={image}
      onChange={onChange}
      imageDetails={imageDetails}
      index={index}
    />
  );
};

export default ResizableImage;
