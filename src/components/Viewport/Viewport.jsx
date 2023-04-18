import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage, Text } from 'react-konva';
import useSlidesStore from '../../store/useSlidesStore';
import './Viewport.scss';

function Viewport() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });
  // Use current slide to display here
  // const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  // const updateSlides = useSlidesStore((state) => state.updateSlides);
  // const updateCurrentSlide = useSlidesStore(
  //   (state) => state.updateCurrentSlide
  // );
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const myRefs = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight
      });
    }
  }, []);

  const handleTextDragEnd = (event) => {
    const textNode = event.target;
    // setTexts(
    //   texts.map((text) => {
    //     if (text.id === textNode.attrs.id) {
    //       return {
    //         ...text,
    //         x: textNode.attrs.x,
    //         y: textNode.attrs.y
    //       };
    //     }
    //     return text;
    //   })
    // );
  };

  return (
    <div ref={divRef} className="viewport">
      <Stage
        className="konvajs_stage  konva_current_canvas"
        width={dimensions.width}
        height={dimensions.height}
        ref={stageRef}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            fill={currentSlide?.backgroundColor ?? '#fff'}
            width={dimensions.width - 3}
            height={dimensions.height - 3}
          ></Rect>

          {currentSlide?.images?.map((img, i) => (
            <Image key={i} image={img} draggable={true} />
          ))}
          {currentSlide?.texts.map((text, i) => (
            <Text
              key={i}
              ref={(el) => (myRefs.current[i] = el)}
              // onDragEnd={handleTextDragEnd}
              text={text.text}
              fontSize={text.fontSize}
              fill={text.colour}
              draggable={true}
              x={text.x}
              y={text.y}
              textDecoration={text.decoration}
              fontStyle={text.fontStyle}
              align={text.align}
            />
          ))}

          <Text
            key={'123'}
            text="."
            ref={textRef}
            fontSize={1}
            draggable={true}
            x={0}
            y={0}
          ></Text>
        </Layer>
      </Stage>
    </div>
  );
}

export default Viewport;
