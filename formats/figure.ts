import Block from '../blots/block';

class Figure extends Block {
  static blotName = 'figure';
  static tagName = 'FIGURE';

  static create(value) {
    const domNode = super.create(value) as Element;
    return domNode;
  }
}

export default Figure;