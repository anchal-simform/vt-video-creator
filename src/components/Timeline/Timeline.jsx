import {
  DeleteOutlined,
  PlayCircleTwoTone,
  PlusCircleFilled
} from '@ant-design/icons';
import { Slider } from 'antd';
import { MusicBold } from '../../assets/icons/MusicBold';
import { PlayBold } from '../../assets/icons/PlayBold';
import { TextBold } from '../../assets/icons/TextBold';
import { ZoomIn } from '../../assets/icons/ZoomIn';
import { ZoomOut } from '../../assets/icons/ZoomOut';
import audioscrub from '../../assets/img/audioscrub.png';
import useSlidesStore from '../../store/useSlidesStore';
import { DEFAULT_SLIDE_OBJECT } from '../../utils/constants';
import './Timeline.scss';
import { sleep } from '../../utils/commonFunction';

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

  const play = useSlidesStore((state) => state.play);
  const updatePlay = useSlidesStore((state) => state.updatePlay);
  const audioSelected = useSlidesStore((state) => state.audio);

  const deleteTextItem = (index) => {
    const newTextList = [...currentSlide?.texts];
    newTextList.splice(index, 1);
    let updatedSlide = { ...currentSlide, texts: newTextList };
    updateCurrentSlide(updatedSlide);
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
    // updateIsRecording(true);
    let index = 0;
    let slide = slides[0];
    const audio = new Audio(URL.createObjectURL(audioSelected));
    await audio.play();

    const totalDuration = slides.reduce(function (acc, obj) {
      return acc + obj.duration;
    }, 0);

    // // Play animation for first 5 secs and after sometime start playing video again
    // // First reset currentIndex and currentSlide to first slide

    updateCurrentSlideIndex(index);
    updateCurrentSlide(slide);
    updatePlay(true);
    await sleep(parseInt(slide.duration) * 1000);
    setTimeout(() => {
      updatePlay(false);
    }, 100);

    setTimeout(async () => {
      slides.map(async (current, index) => {
        if (index === 0) {
          return;
        }
        setTimeout(async () => {
          updatePlay(true);
          updateCurrentSlideIndex(index);
          updateCurrentSlide(current);
          await sleep(parseInt(current.duration) * 1000);
          updatePlay(false);
        }, 100);
      });
    }, 200);
    setTimeout(async () => {
      await audio.pause();
      // updateIsRecording(false);
    }, totalDuration * 1000);
  };

  return (
    <div className="timeline">
      <div className="timeline__left">
        <PlayCircleTwoTone
          onClick={handlePlayCompleteVideo}
          style={{ fontSize: '40px' }}
        />
        <MusicBold />
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
          <img src={audioscrub} alt="audio" />
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
