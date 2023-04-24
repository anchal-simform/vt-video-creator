import { useEffect, useRef, useState } from 'react';
import { Image, Transformer } from 'react-konva';

import '../Viewport/Viewport.scss';

const ImageWithTransformer = ({
  image,
  imageDetails,
  onSelect,
  onDragEnd,
  onChange,
  index
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        ref={shapeRef}
        image={image}
        onClick={() => setIsSelected(true)}
        onSelect={() => setIsSelected(true)}
        onTap={() => setIsSelected(true)}
        draggable
        {...imageDetails}
        onDragEnd={(e) => {
          onDragEnd(
            e,
            { ...imageDetails, x: e.target.x(), y: e.target.y() },
            index
          );
          setIsSelected(false);
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange(
            e,
            {
              ...imageDetails,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY)
            },
            index
          );
          setIsSelected(false);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          anchorSize={10}
          borderDash={[6, 2]}
          borderColor="#a0a0a0"
          rotateEnabled={true}
        />
      )}
    </>
  );
};

export default ImageWithTransformer;
