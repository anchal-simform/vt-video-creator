import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Button, Col, Row } from "antd";
import canvasToVideo from "canvas-to-video";
import Konva from "konva";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Image, Layer, Stage, Text, Rect, Group } from "react-konva";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ANIMATION_EASINGS = [
  { name: "Linear", color: "blue" },
  { name: "EaseIn", color: "green" },
  { name: "EaseOut", color: "green" },
  { name: "EaseInOut", color: "green" },
  { name: "BackEaseIn", color: "blue" },
  { name: "BackEaseOut", color: "blue" },
  { name: "BackEaseInOut", color: "blue" },
  { name: "ElasticEaseIn", color: "green" },
  { name: "ElasticEaseOut", color: "green" },
  { name: "ElasticEaseInOut", color: "green" },
  { name: "BounceEaseIn", color: "blue" },
  { name: "BounceEaseOut", color: "blue" },
  { name: "BounceEaseInOut", color: "blue" },
  { name: "StrongEaseIn", color: "green" },
  { name: "StrongEaseOut", color: "green" },
  { name: "StrongEaseInOut", color: "green" },
];

const SecondEditor = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const stageRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [play, setPlay] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const myRefs = useRef([]);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const audioDemoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [audioSelected, setAudioSelected] = useState(null);
  const [previewAudio, setPreviewAudio] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [duration, setDuration] = useState(1);
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (play) {
      playAnimations();
    }
  }, [play]);

  const handlePlayAnimation = () => {
    removeTextBeforeAnimation();
    setTimeout(() => {
      setPlay(true);
    }, 50);
  };

  const removeTextBeforeAnimation = () => {
    const allTexts = texts.map((text) => {
      return { ...text, fontSize: 1 };
    });

    startTransition(() => {
      setTexts(allTexts);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { colour, text, size, fontFamily, inAnimation } = event.target;
    console.log({ anim: inAnimation.value });
    // if (!fontSize.value)
    const textNode = {
      id: Date.now(),
      text: text.value,
      fontSize: parseInt(size.value) ?? 50,
      size: parseInt(size.value) ?? 50,
      colour: colour.value,
      inAnimation: inAnimation.value,
      outAnimation: "EaseOut",
      duration: 2,
      //   fontFamily: fontFamily.value,
      x: 0,
      y: 0,
    };
    const newTexts = [...texts, textNode];
    startTransition(() => {
      setTexts(newTexts);
    });
  };

  const playAnimations = () => {
    console.log("Inside the play animations");

    const t = texts.map((text, i) => {
      // Render Animation in two steps first remove the animation by adding font 0
      // and then add the new font
      const tween = new Konva.Tween({
        node: myRefs.current[i],
        duration: text.duration,
        easing: Konva.Easings[text.inAnimation],
        fontSize: parseInt(text.size),
        // onFinish: () => {
        //   const updatedTexts = [...texts];
        //   const index = updatedTexts.findIndex(
        //     (t) => t.id === textNode.id
        //   );
        //   updatedTexts[index] = { ...textNode, fontSize: 35 };
        //   setTexts(updatedTexts);
        // },
      });

      tween.play();
      return { ...text, fontSize: text.size, size: text.size };
    });
    startTransition(() => {
      setTexts(t);
    });
    // setTimeout(() => {
    //   console.log("Playing animation stopped");
    //   setPlay(false);
    // }, duration * 1000);
  };

  const generateVideo = async () => {
    try {
      // setIsRendering(true);

      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log("here");
      const videoStream = await canvasToVideo(ctx.canvas, {
        duration: 5,
        fps: 30,
      });
      console.log({ videoStream });
      const data = await videoStream.render();
      const blob = new Blob([data], { type: "video/mp4" });

      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      ffmpeg.FS("writeFile", "video.mp4", await fetchFile(blob));
      await ffmpeg.run("-i", "video.mp4", "-pix_fmt", "yuv420p", "output.mp4");

      const outputData = ffmpeg.FS("readFile", "output.mp4");
      const outputBlob = new Blob([outputData.buffer], { type: "video/mp4" });

      videoRef.current.src = URL.createObjectURL(outputBlob);
      setIsRendering(false);
    } catch (error) {
      setIsRendering(false);
      console.log({ error });
    }
  };

  const recordVideo = async () => {
    handlePlayAnimation();
    setIsRendering(true);

    const audio = new Audio(URL.createObjectURL(audioSelected));
    await audio.play();
    const audioStream = audio.captureStream();

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const video = document.querySelector("video");

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
      const blob = new Blob(chunks, { type: "video/mp4" });
      console.log({ blob });
      chunks = [];
      const videoURL = URL.createObjectURL(blob);
      video.src = videoURL;
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = videoURL;
      a.download = "video.mp4";
      // a.click();
    };

    setPlay(false);
    mediaRecorder.start();
    const tween = new Konva.Tween({
      node: textRef.current,
      duration: duration + 1,
      easing: Konva.Easings["EaseIn"],
      fontSize: parseInt(1),
      onFinish: () => {
        mediaRecorder.stop();
      },
    });

    tween.play();

    setTimeout(async function () {
      // mediaRecorder.stop();
      await audio.pause();
      setIsRendering(false);
    }, duration * 1000);
  };

  const recordVideo2 = async () => {
    handlePlayAnimation();
    setIsRendering(true);
    if (!audioSelected) {
      alert("No Audio Selected");
      return;
    }

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const video = document.querySelector("video");

    const videoStream = canvas.captureStream(30);

    // Load audio file
    const audio = new Audio(URL.createObjectURL(audioSelected));
    audio.src = audio;
    await audio.play();

    // Create audio stream from audio file
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaElementSource(audio);
    const audioStream = audioContext.createMediaStreamDestination().stream;
    audioSource.connect(audioContext.destination);
    audioSource.connect(audioContext.createMediaStreamDestination());

    // Merge canvas and audio streams
    const mergedStream = new MediaStream([
      ...videoStream.getTracks(),
      ...audioStream.getTracks(),
    ]);

    const mediaRecorder = new MediaRecorder(mergedStream);
    let chunks = [];
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = function (e) {
      const blob = new Blob(chunks, { type: "video/mp4" });
      chunks = [];
      const videoURL = URL.createObjectURL(blob);
      video.src = videoURL;
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = videoURL;
      a.download = "video.mp4";
      // a.click();
    };
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };

    mediaRecorder.start();
    setTimeout(async function () {
      mediaRecorder.stop();
      await audio.pause();
      setIsRendering(false);
    }, 4000);
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) {
      console.log("Please select an image file.");
      return;
    }
    const url = window.URL.createObjectURL(file);
    setPreviewImage(file);
    const img = new window.Image();
    img.onload = () => {
      setImage(img);
      window.URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleAudioFileSelect = (event) => {
    const file = event.target.files[0];
    console.log("File Type is ", file.type);

    if (!file.type.startsWith("audio/")) {
      console.log("Please select an audio file.");
      return;
    }

    setPreviewAudio(file);
    const url = window.URL.createObjectURL(file);
    // const audioDemo = document.querySelector("audio");
    // audioDemo.src = url;
    if (file) {
      setAudioSelected(file);
    }
  };

  const handleTextDragEnd = (event) => {
    const textNode = event.target;
    setTexts(
      texts.map((text) => {
        if (text.id === textNode.attrs.id) {
          return {
            ...text,
            x: textNode.attrs.x,
            y: textNode.attrs.y,
          };
        }
        return text;
      })
    );
  };

  return (
    <div className="main__container height_full">
      <Row className="height_full">
        <Col span={6}>
          <h2 className="text_center">Add Features</h2>
          <div className="add_ons">
            <Tabs className={"tabs1"}>
              <TabList className={"tablist1"}>
                <Tab>Settings </Tab>
                <Tab> Text</Tab>
                <Tab> Image</Tab>
                <Tab> Audio</Tab>
              </TabList>
              <TabPanel className={"tabpanel1"}>
                <div>
                  <div className="form_item">
                    <label htmlFor="fontColour">Background Colour</label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={handleBackgroundColorChange}
                    />
                  </div>
                  <div className="form_item">
                    <label htmlFor="fontColour">Video Duration</label>
                    <input
                      type="number"
                      value={duration}
                      placeholder="Enter duration in seconds"
                      onChange={handleDurationChange}
                    />
                  </div>
                  {duration}
                </div>
              </TabPanel>
              <TabPanel className={"tabpanel1"}>
                <form onSubmit={handleSubmit}>
                  <div className="form_item">
                    <label htmlFor="fontSize">Text Content</label>
                    <input
                      required
                      type="text"
                      name="text"
                      placeholder="Enter text"
                    />
                  </div>
                  <div className="text_add_form">
                    <div className="form_item">
                      <label htmlFor="fontSize">Font Size</label>
                      <input
                        type="number"
                        name="size"
                        id="size"
                        required
                        placeholder="Enter Font Size value in px"
                      />
                    </div>
                    <div className="form_item">
                      <label htmlFor="fontColour">Font Colour</label>
                      <input
                        type="color"
                        name="colour"
                        id="colour"
                        required
                        placeholder="Select Color"
                      />
                    </div>
                    <div className="form_item">
                      <label htmlFor="fontColour">Font Family</label>
                      <select
                        name="fontFamily"
                        id="fontFamily"
                        // required
                        placeholder="Select Color"
                      ></select>
                    </div>
                    <div className="form_item">
                      <label>Select animation type</label>
                      <select name="inAnimation" placeholder="Selec">
                        {ANIMATION_EASINGS.map((easing, i) => {
                          return (
                            <option key={i} value={easing.name}>
                              {easing.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form_item">
                      <button type="submit">Add text</button>
                    </div>
                  </div>
                </form>
              </TabPanel>
              <TabPanel className={"tabpanel1"}>
                <div className="tab_panel">
                  <div className="image_select_form">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </div>
                  {previewImage ? (
                    <div>
                      <p>Image Selected</p>
                      <img
                        height={20}
                        width={20}
                        alt="preview"
                        src={URL.createObjectURL(previewImage)}
                      />
                      <Button
                        onClick={() => {
                          setImage(null);
                          setPreviewImage(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </TabPanel>
              <TabPanel className={"tabpanel1"}>
                <div className="audio_select_form">
                  <div className="file__input">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioFileSelect}
                    />
                  </div>
                  {previewAudio ? (
                    <div className="audio_display">
                      <audio
                        ref={audioDemoRef}
                        src={URL.createObjectURL(previewAudio)}
                        controls
                      ></audio>

                      <Button
                        onClick={() => {
                          setAudioSelected(null);
                          setPreviewAudio(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </Col>
        <Col span={18}>
          <h2 className="text_center">React Canvas </h2>
          <div className="buttonGroup">
            <Button
              disabled={play}
              onClick={() => {
                handlePlayAnimation();
                setTimeout(() => {
                  setPlay(false);
                }, duration * 1000 + 200);
              }}
            >
              Play animation
            </Button>{" "}
            <Button onClick={recordVideo} disabled={isRendering}>
              Generate Video 1
            </Button>
            <Button onClick={recordVideo2} disabled={isRendering}>
              Generate Video 2
            </Button>
          </div>
          {/* Not working */}
          {/* <div ref={divRef} className="konvajs_content">
            <Stage
              className="konvajs_stage"
              width={dimensions.width}
              height={dimensions.height}
              ref={stageRef}
            >
              <Layer>
                <Rect
                  x={0}
                  y={0}
                  fill={backgroundColor}
                  width={dimensions.width - 3}
                  height={dimensions.height - 3}
                ></Rect>
              </Layer>
              <Layer>{image && <Image image={image} draggable={true} />}</Layer>

              <Layer>
                {texts.map((text, i) => (
                  <Text
                    key={i}
                    ref={(el) => (myRefs.current[i] = el)}
                    onDragEnd={handleTextDragEnd}
                    text={text.text}
                    fontSize={text.fontSize}
                    fill={text.colour}
                    draggable={true}
                    x={text.x}
                    y={text.y}
                  />
                ))}
              </Layer>
            </Stage>
          </div> */}

          {/* Trying to move into single layer -- Working now */}
          <div ref={divRef} className="konvajs_content">
            <Stage
              className="konvajs_stage"
              width={dimensions.width}
              height={dimensions.height}
              ref={stageRef}
            >
              <Layer>
                <Rect
                  x={0}
                  y={0}
                  fill={backgroundColor}
                  width={dimensions.width - 3}
                  height={dimensions.height - 3}
                ></Rect>
                {image && <Image image={image} draggable={true} />}
                {texts.map((text, i) => (
                  <Text
                    key={i}
                    ref={(el) => (myRefs.current[i] = el)}
                    // onDragEnd={handleTextDragEnd}
                    text={text.text}
                    fontSize={text.fontSize}
                    fill={text.colour}
                    draggable={true}
                    x={text.x}
                    y={text.y}
                  />
                ))}

                <Text
                  key={"123"}
                  text="."
                  ref={textRef}
                  fontSize={1}
                  // fil={"red"}
                  draggable={true}
                  x={0}
                  y={0}
                ></Text>
              </Layer>
              {/* <Layer>{image && <Image image={image} draggable={true} />}</Layer> */}

              {/* <Layer>
                {texts.map((text, i) => (
                  <Text
                    key={i}
                    ref={(el) => (myRefs.current[i] = el)}
                    onDragEnd={handleTextDragEnd}
                    text={text.text}
                    fontSize={text.fontSize}
                    fill={text.colour}
                    draggable={true}
                    x={text.x}
                    y={text.y}
                  />
                ))}
              </Layer> */}
            </Stage>
          </div>

          {/* Working with media recorder */}

          {/* <div className="konvajs_content">
            <Stage
              className="konvajs_stage"
              width={600}
              height={600}
              ref={stageRef}
            >
              <Layer>
                {image && (
                  <Image
                    image={image}
                    width={600}
                    height={600}
                    draggable={true}
                  />
                )}
                {texts.map((text, i) => (
                  <Text
                    key={i}
                    ref={(el) => (myRefs.current[i] = el)}
                    onDragEnd={handleTextDragEnd}
                    text={text.text}
                    fontSize={text.fontSize}
                    fill={text.colour}
                    draggable={true}
                    x={text.x}
                    y={text.y}
                  />
                ))}
              </Layer>
            </Stage>
          </div> */}
        </Col>
      </Row>

      <div className="video">
        <video ref={videoRef} controls></video>
      </div>
    </div>
  );
};

export default SecondEditor;
