import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva';
import useSlidesStore from '../../store/useSlidesStore';
import ResizableImage from './ResizableImage';
import './Viewport.scss';

function Viewport() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });

  const [demoTextFontSize, setDemoTextFontSize] = useState(1);

  const play = useSlidesStore((state) => state.play);
  const updatePlay = useSlidesStore((state) => state.updatePlay);

  const isRecording = useSlidesStore((state) => state.isRecording);
  const updateIsRecording = useSlidesStore((state) => state.updateIsRecording);
  const totalDuration = useSlidesStore((state) => state.totalDuration);
  const audioSelected = useSlidesStore((state) => state.audio);

  // Use current slide to display here
  const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );
  const updateSlides = useSlidesStore((state) => state.updateSlides);
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

  const handleTextDragEnd = (event, index) => {
    const textNode = event.target;
    const newTextList = [...currentSlide.texts];
    const text = {
      ...newTextList[index],
      x: textNode.attrs.x,
      y: textNode.attrs.y
    };

    newTextList[index] = text;
    const newSlide = {
      ...currentSlide,
      texts: newTextList
    };
    updateCurrentSlide(newSlide);
    const newSlides =
      slides?.map((obj, i) => (i === currentSlideIndex ? newSlide : obj)) ?? [];
    updateSlides(newSlides);
  };

  const handleImageDragEnd = (event, img, index) => {
    const imageNode = event.target;
    const newImageList = [...currentSlide.images];
    const image = {
      ...newImageList[index],
      x: imageNode.attrs.x,
      y: imageNode.attrs.y
    };

    newImageList[index] = image;
    const newPreviewImageList = [...currentSlide.previewImages];
    newPreviewImageList[index] = image;
    const newSlide = {
      ...currentSlide,
      images: newImageList,
      previewImages: newPreviewImageList
    };
    updateCurrentSlide(newSlide);
    const newSlides =
      slides?.map((obj, i) => (i === currentSlideIndex ? newSlide : obj)) ?? [];
    updateSlides(newSlides);
  };

  const removeAnimationBeforePlaying = () => {
    const allTexts = currentSlide?.texts?.map((text) => {
      return { ...text, fontSize: 1 };
    });
    const newSlide = { ...currentSlide, texts: allTexts };
    updateCurrentSlide(newSlide);
    // const allSlides = slides.map((slide, i) => {
    //   const allTexts = currentSlide?.texts?.map((text) => {
    //     return { ...text, fontSize: 1 };
    //   });
    //   const newSlide = { ...currentSlide, texts: allTexts };
    //   return newSlide;
    // });
    // updateSlides(allSlides);
  };

  const playAnimation = () => {
    removeAnimationBeforePlaying();
    setTimeout(() => {
      startAnimation();
    }, 500);
  };

  const startAnimation = () => {
    const t = currentSlide?.texts?.map((text, i) => {
      // Render Animation in two steps first remove the animation by adding font 0
      // and then add the new font
      const tween = new Konva.Tween({
        node: myRefs?.current[i],
        duration: text.duration,
        easing: Konva.Easings[text.inAnimation],
        fontSize: parseInt(text.size)
      });

      tween.play();
      return { ...text, fontSize: text.size, size: text.size };
    });
    const newSlide = { ...currentSlide, texts: t };

    updateCurrentSlide(newSlide);
    const index = currentSlideIndex;
    const newSlides = slides.map((obj, idx) =>
      idx === index ? newSlide : obj
    );
    updateSlides(newSlides);
    setTimeout(() => {
      console.log('Playing animation stopped');
      updatePlay(false);
      setDemoTextFontSize(1);
    }, parseInt(totalDuration - 0.5) * 1000);
  };

  const recordVideo = async () => {
    try {
      // const totalDurationInMs = (parseInt(currentSlide.duration) + 1.5) * 1000;
      if (!audioSelected) {
        updatePlay(false);
        updateIsRecording(false);
        alert('No Audio Selecte, Audio is mandatory');
        return;
      }

      // updatePlay(false);
      // updateIsRecording(false);
      const tween = new Konva.Tween({
        node: textRef.current,
        duration: parseInt(currentSlide.duration + 5),
        easing: Konva.Easings['EaseIn'],
        fontSize: demoTextFontSize + 1,
        onFinish: async () => {
          console.log('Inside the on Finish function');
          setDemoTextFontSize(1);
          updatePlay(false);
        }
      });

      await tween.play();
    } catch (error) {
      alert('Failed to record video');
      // updatePlay(false);
      // updateIsRecording(false);
    }
  };

  const handleResizeimage = (event, img, index) => {
    const newImageList = [...currentSlide.images];
    const image = {
      ...img
    };

    newImageList[index] = image;
    const newPreviewImageList = [...currentSlide.previewImages];
    newPreviewImageList[index] = image;
    const newSlide = {
      ...currentSlide,
      images: newImageList,
      previewImages: newPreviewImageList
    };
    updateCurrentSlide(newSlide);
    const newSlides =
      slides?.map((obj, i) => (i === currentSlideIndex ? newSlide : obj)) ?? [];
    updateSlides(newSlides);
  };

  useEffect(() => {
    if (play) {
      playAnimation();
    }
  }, [play]);

  useEffect(() => {
    if (isRecording) {
      recordVideo();
    }
  }, [isRecording]);

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
            <React.Fragment key={i}>
              <ResizableImage
                src={img.image}
                onChange={handleResizeimage}
                onDragEnd={handleImageDragEnd}
                imageDetails={img}
                index={i}
              />
            </React.Fragment>
          ))}
          {currentSlide?.texts.map((text, i) => (
            <Text
              key={i}
              ref={(el) => (myRefs.current[i] = el)}
              onDragEnd={(e) => handleTextDragEnd(e, i)}
              text={text.text}
              fontSize={text.fontSize}
              fill={text.colour}
              draggable={true}
              x={text.x}
              y={text.y}
              textDecoration={text.textDecoration}
              fontStyle={text.fontStyle}
              align={text.align}
            />
          ))}

          <Text
            fontStyle="italic"
            key={'123'}
            text="."
            ref={textRef}
            fontSize={demoTextFontSize}
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
