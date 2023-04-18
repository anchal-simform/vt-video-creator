import { create } from 'zustand';

let defaultSlideObject = {
  images: [],
  previewImages: [],
  texts: [],
  audioFile: '',
  previewAudio: '',
  backgroundColor: '',
  duration: 0
};

const useSlidesStore = create((set) => ({
  slides: [
    {
      images: [],
      previewImages: [],
      texts: [],
      audioFile: '',
      previewAudio: '',
      backgroundColor: '#fff'
    }
  ],
  currentSlide: {
    images: [],
    previewImages: [],
    texts: [],
    audioFile: '',
    previewAudio: '',
    backgroundColor: '#fff'
  },
  currentSlideIndex: 0,
  addSlide: (newSlide) =>
    set((state) => ({ slides: [...state.slides, newSlide] })),

  updateSlides: (slides) => set((state) => ({ slides: slides })),
  updateCurrentSlide: (currentSlide) => set((state) => ({ currentSlide }))
  //   removeCurrentSlide: (index) => set((state) => ({ currentSlide }))
  //   removeSlide: (index) => ,
  // updateSlide : (updatedSlide) =>
}));
export default useSlidesStore;
