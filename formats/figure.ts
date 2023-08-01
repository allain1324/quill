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
    let domNode = value as Element;
    if(value instanceof Object) {
      Image.create(value.image);
      Figcaption.create(value.figcaption);
    }
    else {
      domNode = super.create(value) as Element;
    }

    return domNode;
  }
}
// Figure.allowedChildren = [Image, Figcaption];
// Image.requiredContainer = Figure;
// Figcaption.requiredContainer = Figure;

export { Figcaption, Figure };