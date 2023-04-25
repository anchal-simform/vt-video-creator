import { Button, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
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

function Header({ handleGetStarted }) {
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
  const navigate = useNavigate();
  const resetSlideStore = useSlidesStore((state) => state.resetSlideStore);

  const updateSlides = useSlidesStore((state) => state.updateSlides);

  /** This function is to handle a single file previos */
  const handlePreview = async () => {
    updatePlay(true);
    await sleep(parseInt(currentSlide.duration) * 1000);
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

    // When the media recorder stops this would download the video to the device
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

  // This function is for switching the multiple slides after set duration fo that particular slide
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

  // This function is to handle the stopping of recording Just needs to stop media recorder and also pause the audio
  const handleRecordingStopped = async (mediaRecorder, audio) => {
    console.log('Inside the handle recording saved');
    await mediaRecorder.stop();
    await audio.pause();
    // audioPlaying.current = null;
    updatePlay(false);
    updateIsRecording(false);
  };

  // This function is to start the audio stream of the selected audio
  const startAudioStream = async () => {
    const audio = new Audio(URL.createObjectURL(audioSelected));
    // audioPlaying.current = audio;
    await audio.play();
    const audioStream = audio.captureStream();
    return { audioStream, audio };
  };

  // This function is to start the video stream
  const startVideoStream = async () => {
    const canvas = document.querySelector('.konva_current_canvas canvas');
    // const ctx = canvas.getContext('2d');
    const videoStream = canvas.captureStream(30);
    return videoStream;
  };

  // This function is to handle the event when need to play the complete video
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

  const handleBackClick = () => {
    resetSlideStore();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header__action">
        <Link to="/">
          <div onClick={handleBackClick} className="header__action__back">
            <ArrowLeft />
            Go back
          </div>
        </Link>
        <div className="header__action__buttons">
          <div className="buttons__history">
            <Button type="ghost" onClick={() => handleGetStarted()}>
              Get Started
            </Button>
            {/* <Undo />
            <Redo /> */}
          </div>
          <div className="buttons__divider" />
          <div className="buttons__time slide_duration">
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
            className="preview_current_slide"
            disabled={isPlay || isRecording}
            onClick={handlePreview}
            icon={<Play />}
          >
            Preview
          </Button>
          <Button
            className="play_save_slides"
            disabled={isPlay || isRecording}
            onClick={handleSave}
            type="primary"
          >
            Play and Save
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
