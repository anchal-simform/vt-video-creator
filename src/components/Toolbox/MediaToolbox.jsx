import React from 'react';
import useSlidesStore from '../../store/useSlidesStore';

function MediaToolbox() {
  // Use current slide to display here
  const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );
  const updateSlides = useSlidesStore((state) => state.updateSlides);

  const handleImageFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file.type.startsWith('image/')) {
      console.log('Please select an image file.');
      return;
    }
    const url = window.URL.createObjectURL(file);
    const img = new window.Image();
    let slide = { ...currentSlide };
    slide = {
      ...slide,
      images: [...slide.images, img],
      previewImages: [...slide.previewImages, file]
    };
    img.onload = () => {
      window.URL.revokeObjectURL(url);
      // Update the slides array
      const index = currentSlideIndex;
      const newSlides =
        slides?.map((obj, idx) =>
          idx === index
            ? {
                ...obj,
                images: [...obj.images, img],
                previewImages: [...obj.previewImages, file]
              }
            : obj
        ) ?? [];
      updateSlides(newSlides);
    };
    img.src = url;
    updateCurrentSlide(slide);
    updateSlides();
  };

  return (
    <>
      <div className="toolbox_title">Add Media</div>
      <input
        onChange={handleImageFileSelect}
        accept="image/*"
        type="file"
        name=""
        id=""
      />
    </>
  );
}

export default MediaToolbox;
