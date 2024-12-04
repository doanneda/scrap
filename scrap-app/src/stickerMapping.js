// Import all the sticker images
import Frog from './assets/stickers/frog.png';
import Lotus from './assets/stickers/lotus.png';
import Clothespin from './assets/stickers/clothespin.png';
import Dipper from './assets/stickers/dipper.png';
import Flower from './assets/stickers/flower.png';
import Heart from './assets/stickers/heart.png';
import HumanHeart from './assets/stickers/humanheart.png';
import Leaf from './assets/stickers/leaf.png';
import Moon from './assets/stickers/moon.png';
import Orange from './assets/stickers/orange.png';
import Star from './assets/stickers/star.png';
import Virus from './assets/stickers/virus.png';
import Wing from './assets/stickers/wing.png';
import Lick from './assets/stickers/lick.png';
import Fence from './assets/stickers/fence.png';

// Mapping stickers to their data (image source, size, position)
export const stickerMapping = {
  frog: {
    size: { width: 80, height: 80 },
    imageSource: Frog,
    x: 800,
    y: 0,
  },
  lotus: {
    size: { width: 100, height: 90 },
    imageSource: Lotus,
    x: 950,
    y: 0,
  },
  clothespin: {
    size: { width: 50, height: 100 },
    imageSource: Clothespin,
    x: 1100,
    y: 0,
  },
  dipper: {
    size: { width: 140, height: 90 },
    imageSource: Dipper,
    x: 800,
    y: 150,
  },
  flower: {
    size: { width: 80, height: 80 },
    imageSource: Flower,
    x: 950,
    y: 150,
  },
  heart: {
    size: { width: 80, height: 80 },
    imageSource: Heart,
    x: 1100,
    y: 150,
  },
  humanheart: {
    size: { width: 90, height: 120 },
    imageSource: HumanHeart,
    x: 800,
    y: 300,
  },
  leaf: {
    size: { width: 90, height: 100 },
    imageSource: Leaf,
    x: 950,
    y: 300,
  },
  moon: {
    size: { width: 50, height: 80 },
    imageSource: Moon,
    x: 1100,
    y: 300,
  },
  orange: {
    size: { width: 80, height: 90 },
    imageSource: Orange,
    x: 800,
    y: 450,
  },
  star: {
    size: { width: 90, height: 90 },
    imageSource: Star,
    x: 950,
    y: 450,
  },
  virus: {
    size: { width: 90, height: 90 },
    imageSource: Virus,
    x: 1100,
    y: 450,
  },
  wing: {
    size: { width: 80, height: 90 },
    imageSource: Wing,
    x: 800,
    y: 600,
  },
  lick: {
    size: { width: 210, height: 120 },
    imageSource: Lick,
    x: 950,
    y: 550,
  },
  fence: {
    size: { width: 210, height: 60 },
    imageSource: Fence,
    x: 950,
    y: 650,
  },
};
