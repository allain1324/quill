// import Delta from "quill-delta";
import Quill from "../core/quill";
import Module from '../core/module';

class ImageResize extends Module {

  private media?: HTMLImageElement;
  private overlay?: HTMLDivElement;
  private parentNode: HTMLElement;
  private dragCorner?: HTMLDivElement;
  private dragStartX: number = 0;
  private preDragWidth: number = 0;
  private corners: HTMLDivElement[] = [];


  constructor(quill: Quill) {
    console.log("modules/imageResize", )
    super(quill);
    this.quill.root.addEventListener('click', this.handleClick, false);
    this.parentNode = this.quill.root.parentNode as HTMLElement;
    this.parentNode.style.position =
      this.parentNode.style.position || "relative";
  }

  handleClick = (event: MouseEvent):void => {
    const target = event.target ? (event.target as HTMLElement) : null;
    console.log("target", target);
    if (this.media === target) {
      return;
    }
    if (this.media) {
      // this.hide();
    }
    if (target && ["img"].includes(target.tagName.toLowerCase())) {
      this.show(target as HTMLImageElement);
    }
  }

  show = (media: HTMLImageElement) => {
    this.media = media;
    this.showOverlay();
    this.showCorners();
  };

  hide = () => {
    this.media = undefined;
    this.hideOverlay();
  };

  showCorners = () => {
    this.addCorner("nwse-resize", { left: "-6px", top: "-6px" }, 'left-top');
    this.addCorner("nesw-resize", { right: "-6px", top: "-6px" }, 'right-top');
    this.addCorner("nwse-resize", { right: "-6px", top: "50%" }, 'center-right');
    this.addCorner("nwse-resize", { right: "-6px", bottom: "-6px" }, 'right-bottom');
    this.addCorner("nesw-resize", { left: "-6px", bottom: "-6px" }, 'left-bottom');
    this.addCorner("nesw-resize", { left: "-6px", bottom: "50%" }, 'center-left');
  };

  addCorner = (cursor: string, positions: { [key: string]: string }, position: string) => {
    const corner = document.createElement("div");
    corner.setAttribute('position', position);
    Object.assign(corner.style, {
      position: "absolute",
      height: "12px",
      width: "12px",
      backgroundColor: "white",
      border: "1px solid #777",
      boxSizing: "border-box",
      opacity: "0.80",
      ...positions,
    });
    corner.style.cursor = cursor;
    corner.addEventListener("mousedown", this.handleMousedown, false);
    this.overlay?.appendChild(corner);
    this.corners.push(corner);
  };

  handleMousedown = (event: MouseEvent) => {
    this.dragCorner = event.target as HTMLDivElement;
    this.dragStartX = event.clientX;
    this.preDragWidth = this.media?.width || this.media?.naturalWidth || 0;
    this.setCursor(this.dragCorner.style.cursor);
    document.addEventListener("mousemove", this.handleDrag, false);
    document.addEventListener("mouseup", this.handleMouseup, false);
  };

  handleMouseup = () => {
    this.setCursor("");
    document.removeEventListener("mousemove", this.handleDrag);
    document.removeEventListener("mouseup", this.handleMouseup);
  };

  handleDrag = (event: MouseEvent) => {
    if (!this.media) {
      // image not set yet
      return;
    }
    // update image size
    const deltaX = event.clientX - this.dragStartX;
    if (
      this.dragCorner === this.corners[0] ||
      this.dragCorner === this.corners[3]
    ) {
      this.media.width = Math.round(this.preDragWidth - deltaX);
    } else {
      this.media.width = Math.round(this.preDragWidth + deltaX);
    }
    this.repositionElements();
  };

  showOverlay = () => {
    this.hideOverlay();
    this.quill.setSelection(0, 0);
    this.setUserSelect("none");
    document.addEventListener("keyup", this.onKeyUp, true);
    this.overlay = document.createElement("div");
    Object.assign(this.overlay.style, {
      position: "absolute",
      boxSizing: "border-box",
      border: "1px dashed #444",
    });
    console.log("overlayyyyy", this.overlay)
    this.parentNode.appendChild(this.overlay);
    this.repositionElements();
  };

  hideOverlay = () => {
    if (this.overlay) {
      this.parentNode.removeChild(this.overlay);
      this.overlay = undefined;
      this.setUserSelect("");
    }
  };

  setUserSelect = (value: string) => {
    ["userSelect", "mozUserSelect", "webkitUserSelect", "msUserSelect"].forEach(
      (prop) => {
        this.quill.root.style[<any>prop] = value;
        document.documentElement.style[<any>prop] = value;
      }
    );
  };

  onKeyUp = (event: KeyboardEvent) => {
    if (this.media) {
      if (
        typeof window !== "undefined" &&
        ["delete", "backspace", "delete"].includes(event.key.toLowerCase())
      ) {
        console.log("Quill find", Quill.find(this.media))
        // Quill.find(this.media).deleteAt(0);
      }
      this.hide();
    }
  };

  repositionElements = () => {
    if (!this.overlay || !this.media) {
      return;
    }

    // position the overlay over the image
    const mediaRect = this.media.getBoundingClientRect();
    const containerRect = this.parentNode.getBoundingClientRect();

    Object.assign(this.overlay.style, {
      left: `${mediaRect.left - containerRect.left - 2 + this.parentNode.scrollLeft
        }px`,
      top: `${mediaRect.top - containerRect.top + this.parentNode.scrollTop}px`,
      width: `${mediaRect.width + 2}px`,
      height: `${mediaRect.height + 1}px`,
    });
  };

  setCursor = (value: string) => {
    [document.body, this.media].forEach((el) => {
      if (el) {
        el.style.cursor = value;
      }
    });
  };
}

export default ImageResize;