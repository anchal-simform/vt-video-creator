export const ANIMATION_EASINGS = [
  { value: 'Linear', label: 'Linear' },
  { value: 'EaseIn', label: 'EaseIn' },
  { value: 'EaseOut', label: 'EaseOut' },
  { value: 'EaseInOut', label: 'EaseInOut' },
  { value: 'BackEaseIn', label: 'BackEaseIn' },
  { value: 'BackEaseOut', label: 'BackEaseOut' },
  { value: 'BackEaseInOut', label: 'BackEaseInOut' },
  { value: 'ElasticEaseIn', label: 'ElasticEaseIn' },
  { value: 'ElasticEaseOut', label: 'ElasticEaseOut' },
  { value: 'ElasticEaseInOut', label: 'ElasticEaseInOut' },
  { value: 'BounceEaseIn', label: 'BounceEaseIn' },
  { value: 'BounceEaseOut', label: 'BounceEaseOut' },
  { value: 'BounceEaseInOut', label: 'BounceEaseInOut' },
  { value: 'StrongEaseIn', label: 'StrongEaseIn' },
  { value: 'StrongEaseOut', label: 'StrongEaseOut' },
  { value: 'StrongEaseInOut', label: 'StrongEaseInOut' }
];

export const FONT_OPTIONS = Array.from({ length: 120 }, (x, i) => ({
  value: String(i + 1),
  label: String(i + 1)
}));

export const DURATION_OPTIONS = Array.from({ length: 12 }, (x, i) => ({
  value: String((i + 1) * 5),
  label: String((i + 1) * 5)
}));

export const DEFAULT_SLIDE_OBJECT = {
  images: [],
  previewImages: [],
  texts: [],
  audioFile: '',
  previewAudio: '',
  backgroundColor: '#fff',
  duration: 5
};

export const INTRO_STEPS = [
  {
    element: '.konva_current_canvas',
    intro:
      'This is the current slide preview . Every change you make would be visible here'
  },
  {
    element: '.slide_duration',
    intro: 'Here you can select the duration of current slide'
  },
  {
    element: '.media_nav',
    intro: 'Select the images from here and drag images to your '
  },
  {
    element: '.text_nav',
    intro: 'Add text from here'
  },
  {
    element: '.color_palette',
    intro: 'Select background color of the current slide'
  },
  {
    element: '.audio_select',
    intro: 'select audio from here. Audio is required for video'
  },
  {
    element: '.play_slides',
    intro: 'Click here is to play all the slides with audio '
  },
  {
    element: '.preview_current_slide',
    intro: 'Click here to Preview single slide animation without music'
  },
  {
    element: '.play_save_slides',
    intro: 'Click here Play and save to download video'
  }
];

export const INTRO_HINTS = [
  // {
  //   element: '.konva_current_canvas',
  //   intro:
  //     'This is the current slide preview . Every change you make would be visible here'
  // },
  // {
  //   element: '.slide_duration',
  //   intro: 'Here you can select the duration of current slide'
  // },
  // {
  //   element: '.media_nav',
  //   intro: 'Select the images from here and drag images to your '
  // },
  // {
  //   element: '.text_nav',
  //   intro: 'Add text from here'
  // },
  // {
  //   element: '.color_palette',
  //   intro: 'Select background color of the current slide'
  // },
  // {
  //   element: '.audio_select',
  //   intro: 'select audio from here. Audio is required for video'
  // },
  // {
  //   element: '.play_slides',
  //   intro: 'Click here is to play all the slides with audio '
  // },
  // {
  //   element: '.preview_current_slide',
  //   intro: 'Click here to Preview single slide animation without music'
  // },
  // {
  //   element: '.play_save_slides',
  //   intro: 'Click here Play and save to download video'
  // }
];
