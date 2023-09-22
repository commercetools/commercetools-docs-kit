export class HoverOutStop {
  element: HTMLElement;
  targetElement: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player: any;
  direction: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(element: HTMLElement, targetElement: HTMLElement, player: any) {
    this.element = element;
    this.targetElement = targetElement;
    this.player = player;
    this.direction = this.reverse ? -1 : 1;
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onConnected() {
    this.targetElement.addEventListener('mouseover', this.onMouseOver);
    this.targetElement.addEventListener('mouseout', this.onMouseOut);
  }

  onDisconnected() {
    this.targetElement.removeEventListener('mouseover', this.onMouseOver);
    this.targetElement.removeEventListener('mouseout', this.onMouseOut);

    this.player.direction = 1;
  }

  onReady() {
    this.player.direction = this.direction;

    if (this.reverse) {
      this.player.goToLastFrame();
    }
  }

  onMouseOver() {
    if (!this.player.isPlaying) {
      this.player.play();
    }
  }

  onMouseOut() {
    if (this.player.isPlaying) {
      this.player.stop();
    }
  }

  get reverse() {
    return this.element.hasAttribute('reverse');
  }
}
