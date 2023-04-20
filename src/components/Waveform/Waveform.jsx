import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audio }) => {
  const containerRef = useRef();

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      progressColor: '#E9EBED',
      waveColor: '#E9EBED',
      backgroundColor: '#0693E3'
    });
    waveSurfer.load(audio);

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return <div ref={containerRef} />;
};

export default React.memo(Waveform);
