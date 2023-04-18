import React, { useRef } from 'react';
import useSlidesStore from '../../store/useSlidesStore';
import { DeleteOutlined } from '@ant-design/icons';

function MediaToolbox() {
  // Use current slide to display here
  const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );
  const audioDemoRef = useRef(null);
  const updateSlides = useSlidesStore((state) => state.updateSlides);
  const updateAudio = useSlidesStore((state) => state.updateAudio);
  const audioSelected = useSlidesStore((state) => state.audio);

  const handleImageFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file?.type?.startsWith('image/')) {
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
        slides?.map((obj, idx) => (idx === index ? slide : obj)) ?? [];
      updateSlides(newSlides);
    };
    img.src = url;
    updateCurrentSlide(slide);
    updateSlides();
  };

  const handleAudioFileSelect = (event) => {
    const file = event.target.files[0];
    console.log('File Type is ', file.type);

    if (!file.type.startsWith('audio/')) {
      console.log('Please select an audio file.');
      return;
    }
    updateAudio(file);
    // setPreviewAudio(file);
    // const url = window.URL.createObjectURL(file);
    // if (file) {
    //   setAudioSelected(file);
    // }
  };
  console.log({ audioSelected });
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

  const handleAudioDelete = () => {
    updateAudio(null);
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
                  src={URL.createObjectURL(img)}
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
      <div className="audio_toolbox_container">
        <label htmlFor="Upload audio"> Audio File</label>
        <input
          onChange={handleAudioFileSelect}
          accept="audio/*"
          type="file"
          name=""
          id=""
        />
      </div>
      <div className="audio_preview">
        {/* Selected audio and remove */}
        <div className="audio_preview_container">
          {audioSelected ? (
            <div>
              <audio
                ref={audioDemoRef}
                src={window.URL.createObjectURL(audioSelected)}
                controls
              ></audio>
              <DeleteOutlined
                title="Delete Audio"
                onClick={handleAudioDelete}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}

export default MediaToolbox;
