import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Slider } from 'antd';
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

  const updatePlay = useSlidesStore((state) => state.updatePlay);
  const audioSelected = useSlidesStore((state) => state.audio);

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

  const handlePlayCompleteVideo = async () => {
    updateIsRecording(true);

    const totalDuration = slides.reduce(function (acc, obj) {
      return acc + obj.duration;
    }, 0);

    const totalDurationInMs = (parseInt(totalDuration) + 1) * 1000;

    let index = 0;
    let slide = slides[0];
    const audio = new Audio(URL.createObjectURL(audioSelected));
    await audio.play();
    const audioStream = audio.captureStream();

    const canvas = document.querySelector('.konva_current_canvas canvas');
    // const ctx = canvas.getContext('2d');
    const videoStream = canvas.captureStream(30);

    audioStream.getAudioTracks().forEach((track) => {
      videoStream.addTrack(track);
    });

    const mediaRecorder = new MediaRecorder(videoStream);
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
    await mediaRecorder.start();

    // // Play animation for first 5 secs and after sometime start playing video again
    // // First reset currentIndex and currentSlide to first slide

    updateCurrentSlideIndex(index);
    updateCurrentSlide(slide);
    updatePlay(true);
    await sleep(parseInt(slide.duration) * 1000);
    setTimeout(() => {
      updatePlay(false);
    }, 0);

    setTimeout(async () => {
      slides.map(async (current, index) => {
        if (index === 0) {
          return;
        }

        // if (index === slides.length - 1) {
        //   setTimeout(async () => {
        //     mediaRecorder.stop();
        //     await audio.pause();
        //     updateIsRecording(false);
        //   }, (parseInt(current.duration) + 2) * 1000);
        // }

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
    }, totalDurationInMs);
  };

  const handleAudioFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file?.type.startsWith('audio/')) {
      console.log('Please select an audio file.');
      return;
    }
    updateAudio(file);
  };

  return (
    <div className="timeline">
      <div className="timeline__left">
        <span onClick={handlePlayCompleteVideo} className="hand">
          <PlayBold />
        </span>
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
        <div className="timeline__mid__grid">
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
        </div>
        <div className="timeline__mid__images">
          {slides?.map((slide, i) => (
            <div
              key={i}
              onClick={() => handleSlideClick(slide, i)}
              className={`timeline_slide_preview_item ${
                currentSlideIndex === i ? 'active' : ''
              } `}
              style={{
                backgroundColor: slide.backgroundColor
              }}
            >
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
        <div className="timeline__mid__audio timeline_text_group">
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
        <ZoomIn />
        <div>
          <Slider vertical range step={10} defaultValue={[20, 50]} />
        </div>
        <ZoomOut />
      </div>
    </div>
  );
}

export default Timeline;
