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

  const handlePlayCompleteVideo = async () => {
    const totalDuration = slides.reduce(function (acc, obj) {
      return acc + obj.duration;
    }, 0);

    const totalDurationInMs = (parseInt(totalDuration) + 3) * 1000;

    let index = 0;
    let slide = slides[0];
    const audio = new Audio(URL.createObjectURL(audioSelected));
    await audio.play();

    updateIsRecording(true);

    const audioStream = audio.captureStream();

    const canvas = document.querySelector('.konva_current_canvas canvas');
    // const ctx = canvas.getContext('2d');
    const videoStream = canvas.captureStream(30);

    audioStream.getAudioTracks().forEach((track) => {
      videoStream.addTrack(track);
    });

    const mediaRecorder = new MediaRecorder(videoStream);
    await mediaRecorder.start();
    let chunks = [];

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = function (e) {
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

    updateCurrentSlideIndex(index);
    updateCurrentSlide(slide);
    updatePlay(true);
    await sleep(parseInt(slide.duration) * 1000);
    setTimeout(() => {
      updatePlay(false);
    }, 0);

    setTimeout(async () => {
      slides?.map(async (current, index) => {
        if (index === 0) {
          return;
        }
        setTimeout(async () => {
          updatePlay(true);
          updateCurrentSlideIndex(index);
          updateCurrentSlide(current);
          await sleep(parseInt(current.duration) * 1000);
          updatePlay(false);
        }, 0);
      });
    }, 50);

    setTimeout(async () => {
      mediaRecorder.stop();
      await audio.pause();
      updateIsRecording(false);
      updatePlay(false);
    }, totalDurationInMs);
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
            <Undo />
            <Redo />
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
          <Button onClick={handleSave} type="primary">
            Save
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
