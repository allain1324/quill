import { LinkedList } from 'parchment';
import Block from '../blots/block';
import Image from './image'
import Container from '../blots/container';

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
Figure.allowedChildren = [Image, Container];
Image.requiredContainer = Figure;
Container.requiredContainer = Figure;

export default Figure;