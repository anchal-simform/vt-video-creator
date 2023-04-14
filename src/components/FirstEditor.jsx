import React, { useRef, useState } from "react";
import step1Image from "../step_1.png";

const FirstEditor = () => {
  const canvasRef = useRef(null);
  const [im, setImage] = useState(null);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) {
      console.log("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        addTextToImage(context);
        // downloadVideo(canvas.toDataURL());
      };
      img.src = event.target.result;
      setImage(img);
    };
    reader.readAsDataURL(file);
  };

  const addTextToImage = (context) => {
    // Add the text to the canvas
    context.font = "48px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(
      "Hello World!",
      context.canvas.width / 2,
      context.canvas.height / 2
    );

    // Animate the text
    let x = context.canvas.width / 2;
    let y = context.canvas.height / 2;
    let vx = 5;
    let vy = 5;
    setInterval(() => {
      x += vx;
      y += vy;
      if (x > context.canvas.width || x < 0) {
        vx = -vx;
      }
      if (y > context.canvas.height || y < 0) {
        vy = -vy;
      }
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      console.log({ step1Image });
      context.drawImage(step1Image, 0, 0);
      context.font = "48px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("Hello World!", x, y);
    }, 1000 / 60);
  };

  const downloadVideo = (dataURL) => {
    const link = document.createElement("a");
    link.href = dataURL.replace(
      /^data:image\/[^;]+/,
      "data:application/octet-stream"
    );
    link.download = "video.mp4";
    link.click();
  };

  return (
    <>
      <input type="file" onChange={handleFileSelect} />
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </>
  );
};
export default FirstEditor;
