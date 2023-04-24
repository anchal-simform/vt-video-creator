import React, { useRef } from 'react';
import useSlidesStore from '../../store/useSlidesStore';
import { DeleteOutlined } from '@ant-design/icons';

const ASPECT_RATIO = 16 / 9;
const DEFAULT_HEIGHT = 250;

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
    if (!file?.type?.startsWith('image/')) {
      console.log('Please select an image file.');
      return;
    }
    const url = window.URL.createObjectURL(file);
    const img = new window.Image();
    const newImage = {
      id: Date.now(),
      image: img,
      previewImage: file,
      x: 0,
      y: 0,
      height: DEFAULT_HEIGHT,
      width: DEFAULT_HEIGHT * ASPECT_RATIO
    };
    let slide = { ...currentSlide };
    slide = {
      ...slide,
      images: [...slide.images, newImage],
      previewImages: [...slide.previewImages, newImage]
    };
    img.onload = () => {
      window.URL.revokeObjectURL(url);
      // Update the slides array
      const index = currentSlideIndex;
      const newSlides =
        slides?.map((obj, idx) => (idx === index ? slide : obj)) ?? [];
      updateSlides(newSlides);
    };
    img.src = url;
    updateCurrentSlide(slide);
    updateSlides();
  };

  const deleteImageItem = (index) => {
    const newImageList = [...currentSlide.images];
    newImageList.splice(index, 1);
    const newPreviewImageList = [...currentSlide.previewImages];
    newPreviewImageList.splice(index, 1);
    const newSlide = {
      ...currentSlide,
      images: newImageList,
      previewImages: newPreviewImageList
    };
    updateCurrentSlide(newSlide);
    const idx = currentSlideIndex;
    const newSlides =
      slides?.map((obj, i) => (idx === idx ? newSlide : obj)) ?? [];
    updateSlides(newSlides);
  };

  return (
    <>
      <div className="toolbox_title">Add Media</div>
      <div className="image_toolbox_container">
        <label htmlFor="Upload image">Image File</label>
        <input
          onChange={handleImageFileSelect}
          accept="image/*"
          type="file"
          name=""
          id=""
        />
        {currentSlide?.previewImages?.length ? (
          <div className="image_list">
            {currentSlide?.previewImages?.map((img, i) => (
              <div className="image_item" key={i}>
                <img
                  alt="preview"
                  src={URL.createObjectURL(img.previewImage)}
                  width="160"
                  height="60"
                />
                <DeleteOutlined onClick={() => deleteImageItem(i)} />
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default MediaToolbox;
