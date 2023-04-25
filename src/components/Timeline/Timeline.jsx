import {
  DeleteFilled,
  DeleteOutlined,
  PauseCircleOutlined,
  PlusCircleFilled
} from '@ant-design/icons';
import { Slider } from 'antd';
import React, { useRef, useTransition } from 'react';
import { MusicBold } from '../../assets/icons/MusicBold';
import { PlayBold } from '../../assets/icons/PlayBold';
import { TextBold } from '../../assets/icons/TextBold';
import { ZoomIn } from '../../assets/icons/ZoomIn';
import { ZoomOut } from '../../assets/icons/ZoomOut';
import useSlidesStore from '../../store/useSlidesStore';
import { sleep } from '../../utils/commonFunction';
import { DEFAULT_SLIDE_OBJECT } from '../../utils/constants';
import Waveform from '../Waveform/Waveform';
import './Timeline.scss';

function Timeline() {
  const [isPending, setTransition] = useTransition();
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlideIndex = useSlidesStore(
    (state) => state.updateCurrentSlideIndex
  );
  const slides = useSlidesStore((state) => state.slides);
  const updateSlides = useSlidesStore((state) => state.updateSlides);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );
  const updateIsRecording = useSlidesStore((state) => state.updateIsRecording);
  const updateAudio = useSlidesStore((state) => state.updateAudio);

  const play = useSlidesStore((state) => state.play);
  const updatePlay = useSlidesStore((state) => state.updatePlay);
  const audioSelected = useSlidesStore((state) => state.audio);
  const audioPlaying = useRef(null);

  const deleteTextItem = (index) => {
    const newTextList = [...currentSlide?.texts];
    newTextList.splice(index, 1);
    let updatedSlide = { ...currentSlide, texts: newTextList };
    updateCurrentSlide(updatedSlide);
    const newSlides = slides.map((obj, idx) =>
      idx === currentSlideIndex ? updatedSlide : obj
    );
    updateSlides(newSlides);
  };

  const handleAddNew = () => {
    const newSlide = DEFAULT_SLIDE_OBJECT;
    const allSlides = [...slides];
    updateCurrentSlide(newSlide);
    updateCurrentSlideIndex(allSlides.length);
    updateSlides([...allSlides, newSlide]);
  };

  const handleSlideClick = (slide, index) => {
    updateCurrentSlide(slide);
    updateCurrentSlideIndex(index);
  };

  const handlePlay = async () => {
    setTimeout(() => {
      handlePlayCompleteVideo();
    }, 100);
  };

  const handleMediaRecorder = (videoStream) => {
    const mediaRecorder = new MediaRecorder(videoStream);
    setTimeout(async () => {
      await mediaRecorder.start();
    }, 200);
    let chunks = [];

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = async function (e) {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      chunks = [];
      const videoURL = URL.createObjectURL(blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = videoURL;
      a.download = 'video.mp4';
      a.click();
    };
    return mediaRecorder;
  };

  const switchSlides = async () => {
    for (let i = 0; i < slides.length; i++) {
      let index = i;
      let current = slides[i];
      updatePlay(true);
      updateCurrentSlideIndex(index);
      updateCurrentSlide(current);
      await sleep(parseInt(current.duration) * 1000);
      updatePlay(false);
    }
  };

  const handleRecordingStopped = async (mediaRecorder, audio) => {
    await mediaRecorder.stop();
    audio?.pause();
    audioPlaying.current = null;
    updatePlay(false);
    updateIsRecording(false);
  };

  const startAudioStream = async () => {
    const audio = new Audio(URL.createObjectURL(audioSelected));
    audioPlaying.current = audio;
    audio?.play();
    const audioStream = audio.captureStream();
    return { audioStream, audio };
  };

  const startVideoStream = async () => {
    const canvas = document.querySelector('.konva_current_canvas canvas');
    // const ctx = canvas.getContext('2d');
    const videoStream = canvas.captureStream(30);
    return videoStream;
  };

  const handlePlayCompleteVideo = async () => {
    if (play || audioPlaying.current) return;
    const totalDuration = slides.reduce(function (acc, obj) {
      return acc + obj.duration;
    }, 0);

    const totalDurationInMs = (parseInt(totalDuration) + 1) * 1000;

    const { audioStream, audio } = await startAudioStream();

    const videoStream = await startVideoStream();

    audioStream.getAudioTracks().forEach((track) => {
      videoStream.addTrack(track);
    });

    const mediaRecorder = await handleMediaRecorder(videoStream);

    setTimeout(async () => {
      handleRecordingStopped(mediaRecorder, audio);
    }, totalDurationInMs);
    await switchSlides();
  };

  const handleAudioFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file?.type.startsWith('audio/')) {
      alert('Please select an audio file.');
      return;
    }
    updateAudio(file);
  };

  const deleteSlide = (e, index) => {
    e?.stopPropagation();
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    updateSlides(newSlides);
  };

  const renderSlideDelete = (index) => {
    if (slides.length === 1) return;

    return (
      <DeleteFilled
        style={{
          fontSize: '20px'
        }}
        onClick={(e) => deleteSlide(e, index)}
      />
    );
  };

  return (
    <div className="timeline">
      <div className="timeline__left">
        {play ? (
          <>
            <PauseCircleOutlined
              style={{
                fontSize: '40px'
              }}
              onClick={() => {
                if (play) {
                  audioPlaying.current?.pause();
                  audioPlaying.current = null;
                  updatePlay(false);
                }
              }}
            />
          </>
        ) : (
          <span onClick={handlePlay} className="hand">
            <PlayBold />
          </span>
        )}
        <label class="custom-file-upload">
          <input
            onChange={handleAudioFileSelect}
            accept="audio/*"
            type="file"
            name=""
            id=""
          />
          <MusicBold />
        </label>
        <TextBold />
      </div>
      <div className="timeline__mid">
        {/* <div className="timeline__mid__grid">
          <div>0:00s</div>
          <div>0:20s</div>
          <div>0:40s</div>
          <div>1:00s</div>
          <div>1:20s</div>
          <div>1:40s</div>
          <div>2:00s</div>
          <div>2:20s</div>
          <div>2:40s</div>
          <div>3:00s</div>
          <div>3:20s</div>
          <div>3:40s</div>
          <div>4:00s</div>
          <div>4:20s</div>
          <div>4:40s</div>
          <div>5:00s</div>
          <div>5:20s</div>
          <div>5:40s</div>
          <div>6:00s</div>
          <div>6:20s</div>
          <div>6:40s</div>
          <div>7:00s</div>
          <div>7:20s</div>
          <div>7:40s</div>
        </div> */}
        <div className="timeline__mid__images">
          {slides?.map((slide, i) => (
            <div
              key={i}
              onClick={() => handleSlideClick(slide, i)}
              className={`timeline_slide_preview_item ${
                currentSlideIndex === i ? 'active' : 'not_active'
              } `}
              style={{
                backgroundColor: slide.backgroundColor
              }}
            >
              {/* <div className="slide__delete">{renderSlideDelete(i)}</div> */}
              <div
                style={{
                  padding: '10px'
                }}
                className="image_list"
              >
                {slide.previewImages?.map((img, i) => (
                  <div className="image_item" key={i}>
                    <img
                      alt="preview"
                      src={URL.createObjectURL(img.previewImage)}
                      width="45"
                      height="45"
                    />
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: '10px'
                }}
                className="text_list_box"
              >
                {slide?.texts?.map((text, index) => (
                  <span key={index} className="timeline_text_container">
                    <span className="timeline_text">{text?.text}</span>
                    {/* <DeleteOutlined
                      style={{ marginLeft: '5px' }}
                      onClick={(e) => deleteTextItem(index)}
                    /> */}
                  </span>
                )) ?? ''}
              </div>
            </div>
          ))}
          <PlusCircleFilled
            style={{ fontSize: '46px', margin: '10px' }}
            onClick={handleAddNew}
          />
        </div>
        <div className="timeline__mid__audio">
          {audioSelected ? (
            <Waveform audio={URL.createObjectURL(audioSelected)} />
          ) : (
            'No Audio Selected'
          )}
        </div>
        <div className="timeline__mid__text">
          {currentSlide?.texts?.map((text, index) => (
            <span key={index} className="timeline_text_container">
              <span className="timeline_text">{text?.text}</span>
              <DeleteOutlined
                style={{ marginLeft: '5px' }}
                onClick={(e) => deleteTextItem(index)}
              />
            </span>
          )) ?? ''}
        </div>
      </div>
      <div className="timeline__right">
        {/* <ZoomIn />
        <div>
          <Slider vertical range step={10} defaultValue={[20, 50]} />
        </div>
        <ZoomOut /> */}
      </div>
    </div>
  );
}

export default React.memo(Timeline);
