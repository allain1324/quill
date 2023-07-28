import Delta from "quill-delta";
import Quill from "../core/quill";
import Module from '../core/module';

class ImageResize extends Module {

  private media?: HTMLImageElement;
  // private overlay?: HTMLDivElement;
  // private parentNode: HTMLElement;
  // private dragCorner?: HTMLDivElement;
  // private dragStartX: number = 0;
  // private preDragWidth: number = 0;
  // private corners: HTMLDivElement[] = [];


  constructor(quill: Quill) {
    super(quill);
    this.quill.root.addEventListener('click', this.handleClick, false);
  }

  handleClick(event: MouseEvent): void {
    const target = event.target ? (event.target as HTMLElement) : null;
    console.log("target", target);
    if (this.media === target) {
      return;
    }
    if (this.media) {
      // this.hide();
    }
    if (target && ["img"].includes(target.tagName.toLowerCase())) {
      // this.show(target as HTMLImageElement);
    }
  }
}

export default ImageResize;