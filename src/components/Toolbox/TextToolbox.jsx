import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined
} from '@ant-design/icons';
import { ANIMATION_EASINGS, FONT_OPTIONS } from '../../utils/constants';
import useSlidesStore from '../../store/useSlidesStore';

const { TextArea } = Input;

function TextToolbox() {
  const [fontFamily, setFontFamily] = useState('Ariel');
  const [fontSize, setFontSize] = useState('32');
  const [fontStyle, setFontStyle] = useState('bold');
  const [color, setColor] = useState('#000000');
  const [text, setText] = useState('');
  const [align, setAlign] = useState('left');
  const [textDecoration, setTextDecoration] = useState('');
  const [inAnimation, setInAnimation] = useState('Linear');

  // Use current slide to display here
  const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );
  const updateSlides = useSlidesStore((state) => state.updateSlides);
  const handleFontSize = (value) => {
    setFontSize(value);
  };

  const resetText = () => {
    setFontSize('32');
    setFontStyle('bold');
    setColor('#000000');
    setAlign('left');
    setTextDecoration('');
    setText('');
    setInAnimation('Linear');
  };

  const handleAddText = () => {
    if (!text) return;
    const textNode = {
      id: Date.now(),
      fontSize: fontSize ? parseInt(fontSize) : 32,
      size: fontSize ? parseInt(fontSize) : 32,
      colour: color,
      outAnimation: 'EaseOut',
      duration: 2,
      //   fontFamily: fontFamily.value,
      x: 0,
      y: 0,
      inAnimation,
      fontStyle,
      text,
      align,
      textDecoration
    };

    //  Update current Slide
    let slide = { ...currentSlide };
    const allTexts = [...slide.texts, textNode];
    slide.texts = allTexts;

    updateCurrentSlide(slide);

    // Update the slides array
    const index = currentSlideIndex;
    const newSlides = slides.map((obj, idx) =>
      idx === index ? { ...obj, texts: [...obj.texts, textNode] } : obj
    );

    updateSlides(newSlides);
    setTimeout(() => {
      resetText();
    }, 100);
  };

  const handleTextChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const handleTextDecoration = () => {
    if (textDecoration === 'underline') {
      setTextDecoration('');
    } else {
      setTextDecoration('underline');
    }
  };

  return (
    <>
      <div className="toolbox_title">Text Properties</div>
      <div>
        <TextArea
          size="24"
          className="textbox"
          rows={4}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter Text"
          maxLength={60}
        />
      </div>
      <div className="stylebox">
        <div className="stylebox_title">Textstyles</div>
        <div className="stylebox_actions">
          <div className="dropdown-wrapper">
            {/* <Select
              className="dropdown-wrapper_fontfamily"
              defaultValue="Ariel"
              onChange={handleChange}
              options={[
                { value: 'Ariel', label: 'Ariel' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled' }
              ]}
            /> */}
            <Select
              style={{
                width: '200px'
              }}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              defaultValue="32"
              value={fontSize}
              onChange={handleFontSize}
              options={FONT_OPTIONS}
            />
          </div>
          <div className="dropdown-wrapper">
            <Select
              defaultValue="Linear"
              style={{
                width: '200px'
              }}
              onChange={(value) => setInAnimation(value)}
              options={ANIMATION_EASINGS}
            />
          </div>
          <div className="stylebox_actions_btngrp">
            <div className="btn-actions">
              <span className="btn">
                <BoldOutlined
                  onClick={() => setFontStyle('bold')}
                  style={{
                    color: fontStyle === 'bold' ? 'black' : 'grey'
                  }}
                />
              </span>
              <span className="btn">
                <ItalicOutlined
                  onClick={() => setFontStyle('italic')}
                  style={{
                    color: fontStyle === 'italic' ? 'black' : 'grey'
                  }}
                />
              </span>
              <span className="btn">
                <UnderlineOutlined
                  onClick={handleTextDecoration}
                  style={{
                    color: textDecoration ? 'black' : 'grey'
                  }}
                />
              </span>
            </div>
            <div className="btn-actions">
              <span className="btn">
                <AlignLeftOutlined
                  onClick={() => setAlign('left')}
                  style={{
                    color: align === 'left' ? 'black' : 'grey'
                  }}
                />
              </span>
              <span className="btn">
                <AlignCenterOutlined
                  onClick={() => setAlign('center')}
                  style={{
                    color: align === 'center' ? 'black' : 'grey'
                  }}
                />
              </span>
              <span className="btn">
                <AlignRightOutlined
                  onClick={() => setAlign('right')}
                  style={{
                    color: align === 'right' ? 'black' : 'grey'
                  }}
                />
              </span>
            </div>
          </div>

          <div className="stylebox_actions_btngrp">
            <input
              type="color"
              onChange={(e) => setColor(e.target.value)}
              name="color"
            />
          </div>

          {/* <div className="stylebox_actions_btngrp">
            <div className="btn-actions">
              <span className="text">Auto</span>
              <span className="icon">
                <Outline />
              </span>
            </div>
            <div className="btn-actions">
              <span className="text">Auto</span>
              <span className="Icon">
                <HorizontalOutline />
              </span>
            </div>
          </div> */}

          <div className="stylebox_actions_btngrp">
            {/* <div className="btn-actions"> */}
            <Button type="primary" onClick={handleAddText}>
              Add Text
            </Button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default TextToolbox;
