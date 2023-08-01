import { LinkedList, EmbedBlot } from 'parchment';
import Block from '../blots/block';

class Image extends EmbedBlot {
  static blotName = 'image';
  static tagName = 'IMG';

}

class Figure extends Block {
  static blotName = 'figure';
  static tagName = 'FIGURE';

  // static allowedChildren = ['EmbedBlot'];
  children: LinkedList<Image>;

  static create(value) {
    const domNode = super.create(value) as Element;
    return domNode;
  }


}
Figure.allowedChildren = [EmbedBlot];
EmbedBlot.requiredContainer = Figure;

export default Figure;