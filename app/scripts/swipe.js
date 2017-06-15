class Swipe {
  constructor() {
    this.setOnUp(function(){ return });
    this.setOnDown(function(){ return });
    this.setOnLeft(function(){ return });
    this.setOnRight(function(){ return });
    this.preventDefault = true;
    this.xDown = null;
    this.yDown = null;
    this.windowEvents = {
      'touchstart': this.handleTouchStart.bind(this),
      'touchmove': this.handleTouchMove.bind(this)
    };
  }

  initialize(element, preventDefault) {
    this.preventDefault = preventDefault;
    $(element).on(this.windowEvents);
  }

  unbind(element) {
    $(element).unbind(this.windowEvents);
  }

  setOnLeft(callback) {
    this.onLeft = callback;
    return this;
  }

  setOnRight(callback) {
    this.onRight = callback;
    return this;
  }

  setOnUp(callback) {
    this.onUp = callback;
    return this;
  }

  setOnDown(callback) {
    this.onDown = callback;
    return this;
  }

  handleTouchStart(evt) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  }

  handleTouchMove(evt) {
    if(this.preventDefault){
      evt.preventDefault();
    }
    if (!this.xDown || !this.yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    this.xDiff = this.xDown - xUp;
    this.yDiff = this.yDown - yUp;
    if (Math.abs( this.xDiff) > Math.abs( this.yDiff)) {
      if (this.xDiff > 0) {
        this.onLeft();
      } else {
        this.onRight();
      }
    } else {
      if (this.yDiff > 0) {
        this.onUp();
      } else {
        this.onDown();
      }
    }
    this.xDown = null;
    this.yDown = null;
  }
}
export { Swipe }
