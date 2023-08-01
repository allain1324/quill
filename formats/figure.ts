import { LinkedList } from 'parchment';
import Block from '../blots/block';
import Image from './image'

// class Image extends EmbedBlot {
//   static blotName = 'image';
//   static tagName = 'IMG';

// }
class Figcaption extends Block {
  static blotName = 'figcaption';
  static tagName = 'FIGCAPTION';

  next: this | null;

  static create(value) {
    console.log("value figcaption", value);
    const domNode = super.create(value) as Element;
    return domNode;
  }

  value(domNode) {
    console.log("Figcaption domnode", domNode);
  }
}

class Figure extends Block {
  static blotName = 'figure';
  static tagName = 'FIGURE';

  children: LinkedList<Figcaption>;

  static create(value) {
    console.log("value figure", value);
    if (typeof value === 'object') {
      Image.create(value.image);
    }
    const domNode = super.create(value) as Element;
    return domNode;
  }
}
Figure.allowedChildren = [Image, Figcaption];
Image.requiredContainer = Figure;
Figcaption.requiredContainer = Figure;

export { Figcaption, Figure };