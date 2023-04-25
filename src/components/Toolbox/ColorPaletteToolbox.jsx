import React from 'react';
import useSlidesStore from '../../store/useSlidesStore';

function ColorPaletteToolbox() {
  // Use current slide to display here
  const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );
  const updateSlides = useSlidesStore((state) => state.updateSlides);

  // The function is used to handle the color chane and update the slide background color
  const handleColorChange = (e) => {
    const color = e.target.value;
    //  Update current Slide
    let slide = { ...currentSlide };
    slide.backgroundColor = color;
    updateCurrentSlide(slide);
    // Update the slides array
    const index = currentSlideIndex;
    const newSlides = slides.map((obj, idx) =>
      idx === index ? { ...obj, backgroundColor: color } : obj
    );
    updateSlides(newSlides);
  };

  return (
    <>
      <div className="toolbox_title">Pick a background Color</div>
      <input type="color" onChange={handleColorChange} name="" id="" />
    </>
  );
}

export default ColorPaletteToolbox;
