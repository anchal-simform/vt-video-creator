import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { Clock } from '../../assets/icons/Clock';
import { Play } from '../../assets/icons/Play';
import { Redo } from '../../assets/icons/Redo';
import { Undo } from '../../assets/icons/Undo';
import logo from '../../assets/img/logo.png';
import useSlidesStore from '../../store/useSlidesStore';
import { sleep } from '../../utils/commonFunction';
import { DURATION_OPTIONS } from '../../utils/constants';
import './Header.scss';

function Header() {
  const isPlay = useSlidesStore((state) => state.play);
  const updatePlay = useSlidesStore((state) => state.updatePlay);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const updateIsRecording = useSlidesStore((state) => state.updateIsRecording);
  const isRecording = useSlidesStore((state) => state.isRecording);
  const slides = useSlidesStore((state) => state.slides);
  const audioSelected = useSlidesStore((state) => state.audio);
  const updateCurrentSlideIndex = useSlidesStore(
    (state) => state.updateCurrentSlideIndex
  );
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );

  const updateSlides = useSlidesStore((state) => state.updateSlides);

  const handlePreview = async () => {
    updatePlay(true);
    await sleep(currentSlide * 1000);
    updatePlay(false);
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
      console.log('Inside the handle on stop');
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
    console.log('Inside the handle recording saved');
    await mediaRecorder.stop();
    await audio.pause();
    // audioPlaying.current = null;
    updatePlay(false);
    updateIsRecording(false);
  };

  const startAudioStream = async () => {
    const audio = new Audio(URL.createObjectURL(audioSelected));
    // audioPlaying.current = audio;
    await audio.play();
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
    if (isPlay) return;

    if (!audioSelected) {
      alert('Please select an audio file.');
      return;
    }

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

  const handleDurationChange = (value) => {
    let slide = { ...currentSlide };
    slide.duration = parseInt(value);
    updateCurrentSlide(slide);
    // Update the slides array
    const index = currentSlideIndex;
    const newSlides = slides.map((obj, idx) => (idx === index ? slide : obj));

    updateSlides(newSlides);
  };

  const handleSave = async () => {
    handlePlayCompleteVideo();
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header__action">
        <Link to="/">
          <div className="header__action__back">
            <ArrowLeft />
            Go back
          </div>
        </Link>
        <div className="header__action__buttons">
          <div className="buttons__history">
            {/* <Undo />
            <Redo /> */}
          </div>
          <div className="buttons__divider" />
          <div className="buttons__time">
            <Clock />
            <div className="dropdown-wrapper">
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                defaultValue="5"
                value={currentSlide.duration}
                onChange={handleDurationChange}
                options={DURATION_OPTIONS}
              />
            </div>
            Secs
          </div>
          <Button
            disabled={isPlay || isRecording}
            onClick={handlePreview}
            icon={<Play />}
          >
            Preview
          </Button>
          <Button
            disabled={isPlay || isRecording}
            onClick={handleSave}
            type="primary"
          >
            Save
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
