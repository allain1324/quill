import { EmbedBlot } from 'parchment';

class Figure extends EmbedBlot {
  static blotName = 'figure';
  static tagName = 'IMG';

  static create(value) {
    const domNode = super.create(value) as Element;
    return domNode;
  }
}

export default Figure;