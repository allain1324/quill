import { LinkedList } from 'parchment';
import Block from '../blots/block';
import Image from './image'

// class Image extends EmbedBlot {
//   static blotName = 'image';
//   static tagName = 'IMG';

// }
class Figcaption extends Block {
  static blotName = 'figcaption';
  static tagName  = 'FIGCAPTION';
}

class Figure extends Block {
  static blotName = 'figure';
  static tagName = 'FIGURE';

  children: LinkedList<Figcaption>;

  static create(value) {
    const domNode = super.create(value) as Element;
    return domNode;
  }
}
Figure.allowedChildren = [Image, Figcaption];
Image.requiredContainer = Figure;
Figcaption.requiredContainer = Figure;

export default Figure;