import { LinkedList } from 'parchment';
import Block from '../blots/block';

import Image from './image';

class Figure extends Block {
  static blotName = 'figure';
  static tagName = 'FIGURE';

  children: LinkedList<Image>;

  static create(value) {
    const domNode = super.create(value) as Element;
    return domNode;
  }


}

export default Figure;