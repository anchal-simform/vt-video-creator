import React, { useEffect, useRef, useState, useTransition } from 'react';
import { Image, Layer, Rect, Stage, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import useSlidesStore from '../../store/useSlidesStore';
import './Viewport.scss';
import ResizableImage from './ResizableImage';

function Viewport() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });

  const play = useSlidesStore((state) => state.play);
  const updatePlay = useSlidesStore((state) => state.updatePlay);

  const isRecording = useSlidesStore((state) => state.isRecording);
  const updateIsRecording = useSlidesStore((state) => state.updateIsRecording);

  const totalDuration = useSlidesStore((state) => state.totalDuration);
  const updateDuration = useSlidesStore((state) => state.updateTotalDuration);

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
    }, parseInt(totalDuration) * 1000);
  };

  const recordVideo = async () => {
    try {
      const totalDurationInMs = (parseInt(currentSlide.duration) + 1.5) * 1000;
      if (!audioSelected) {
        updatePlay(false);
        updateIsRecording(false);
        alert('No Audio Selecte, Audio is mandatory');
        return;
      }
      // const audio = new Audio(URL.createObjectURL(audioSelected));
      // await audio.play();
      // const audioStream = audio.captureStream();

      // const canvas = document.querySelector('.konva_current_canvas canvas');
      // const ctx = canvas.getContext('2d');

      // const video = document.querySelector('video');

      // const videoStream = canvas.captureStream(30);

      // audioStream.getAudioTracks().forEach((track) => {
      //   videoStream.addTrack(track);
      // });

      // const mediaRecorder = new MediaRecorder(videoStream);
      // let chunks = [];

      // mediaRecorder.ondataavailable = function (e) {
      //   chunks.push(e.data);
      // };

      // mediaRecorder.onstop = function (e) {
      //   const blob = new Blob(chunks, { type: 'video/mp4' });
      //   console.log({ blob });
      //   chunks = [];
      //   const videoURL = URL.createObjectURL(blob);
      //   // video.src = videoURL;
      //   let a = document.createElement('a');
      //   document.body.appendChild(a);
      //   a.style = 'display: none';
      //   a.href = videoURL;
      //   a.download = 'video.mp4';
      //   a.click();
      // };

      updatePlay(false);
      // updateIsRecording(false);
      const tween = new Konva.Tween({
        node: textRef.current,
        duration: parseInt(currentSlide.duration) + 1.5,
        easing: Konva.Easings['EaseIn'],
        fontSize: 2,
        onFinish: async () => {
          console.log('Inside the on Finish function');
          // mediaRecorder.stop();
          // await audio.pause();
          // updatePlay(false);
          // updateIsRecording(false);
        }
      });

      await tween.play();

      // mediaRecorder.start();
      // setTimeout(async function () {
      //   console.log('Inside the set timeout final function');
      //   mediaRecorder.stop();
      //   await audio.pause();
      //   updatePlay(false);
      //   updateIsRecording(false);
      // }, totalDurationInMs);
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
            // <Image
            //   height={250}
            //   width={250 * ASPECT_RATIO}
            //   key={i}
            //   x={img.x}
            //   y={img.y}
            //   image={img.image}
            //   draggable={true}
            //   onDragEnd={(e) => handleImageDragEnd(e, i)}
            // />
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
              textDecoration={text.decoration}
              fontStyle={text.fontStyle}
              align={text.align}
            />
          ))}

          <Text
            // className="text_demo_canvas"
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
