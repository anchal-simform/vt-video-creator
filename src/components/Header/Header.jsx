import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { Clock } from '../../assets/icons/Clock';
import { Play } from '../../assets/icons/Play';
import { Redo } from '../../assets/icons/Redo';
import { Undo } from '../../assets/icons/Undo';
import logo from '../../assets/img/logo.png';
import './Header.scss';
import useSlidesStore from '../../store/useSlidesStore';
import { sleep } from '../../utils/commonFunction';
import { DURATION_OPTIONS } from '../../utils/constants';

function Header() {
  const isPlay = useSlidesStore((state) => state.play);
  const updatePlay = useSlidesStore((state) => state.updatePlay);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const updateIsRecording = useSlidesStore((state) => state.updateIsRecording);
  const isRecording = useSlidesStore((state) => state.isRecording);
  const slides = useSlidesStore((state) => state.slides);

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

  const handleSave = async () => {
    updatePlay(true);
    updateIsRecording(true);
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
