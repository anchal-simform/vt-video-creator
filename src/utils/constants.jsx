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
  value: i + 1,
  label: i + 1
}));

export const DEFAULT_SLIDE_OBJECT = {
  images: [],
  previewImages: [],
  texts: [],
  audioFile: '',
  previewAudio: '',
  backgroundColor: '#fff',
  duration: 0
};
