import { Swipe } from 'scripts/swipe.js'

class Slider {
  constructor() {
    this.animationSpeed = 300;
    this.transitionInProgress = false;
    this.swipe = new Swipe();
  }

  initialize() {
    var self = this;
    this.currentIndex = 0;
    this.slide = $('.slide');
    this.slideLength = this.slide.length;
    this.slideIndexes = $('.counter-indexes');
    this.slideTotal = $('.counter-total');

    this.setUpSlide();
    this.setUpSlideCounter();
    this.sliderHover();
    this.sliderClick();

    this.swipe.setOnLeft(function() { self.handleClickForward(); });
    this.swipe.setOnRight(function() { self.handleClickBackward(); });
    this.swipe.initialize('.slides-section', false);
  }

  unbind() {
  }

  sliderHover() {
    if (!this.isMobileDevice()) {
      $('.slides').on('mouseover mousemove', function(e) {
          if ((e.pageX - this.offsetLeft) < $(this).width() / 2) {
            $('.chevron-left').show();
            $('.chevron-right').hide();
          } else {
            $('.chevron-right').show();
            $('.chevron-left').hide();
          }
        }).on('mouseout', function(e){
          $('.chevron-left, .chevron-right').hide();
      });
    }
  }

  isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  sliderClick() {
    var self = this;
    $('.slides').on('click', function(e) {
      if ((e.pageX - this.offsetLeft) < $(this).width() / 2) {
        self.handleClickBackward();
      } else {
        self.handleClickForward();
      }
    });
  }

  addSlideIndexes() {
    for (var i = 1; i < this.slideLength + 1; i++) {
      this.slideIndexes.append( '<li>' + this.formatNumber(i, 2) + '</li>');
    }
  }

  addSlideTotal() {
    this.slideTotal.append('/ ' + this.formatNumber(this.slideLength, 2));
  }

  formatNumber(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return output;
  }

  setUpSlideCounter() {
    this.slideIndexes.empty();
    this.slideTotal.empty();
    this.addSlideIndexes();
    this.addSlideTotal();
  }

  setUpSlide() {
    this.slide.eq(this.currentIndex).addClass('visible');
  }

  handleClickForward () {
    var nextPageIndex;
    if (this.transitionInProgress) { return; }
    nextPageIndex = this.currentIndex + 1;
    if (this.nextPageisInvalid(nextPageIndex)) { return; }
    this.animateCounter(nextPageIndex);
    this.transitionPage(nextPageIndex, '-100%', 'transition-forward');
  }

  handleClickBackward () {
    var nextPageIndex;
    if (this.transitionInProgress) { return; }
    nextPageIndex = this.currentIndex - 1;
    if (this.nextPageisInvalid(nextPageIndex)) { return; }
    this.animateCounter(nextPageIndex);
    this.transitionPage(nextPageIndex, '+100%', 'transition-backward');
  }

  nextPageisInvalid (nextPageIndex) {
    return nextPageIndex >= this.slideLength || nextPageIndex < 0;
  }

  getDirectionOperator (nextPageIndex) {
    var directionOperator = null;
    return nextPageIndex > this.currentIndex ? directionOperator = '-' : directionOperator = '+';
  }

  getTopAnimationParams (nextPageIndex, distance) {
    return {
      top: this.getDirectionOperator(nextPageIndex) + '=' + distance +'px'
    }
  }

  animateCounter (nextPageIndex) {
    var indexHeight = $('.counter-indexes li').outerHeight(true);
    this.slideIndexes.animate(this.getTopAnimationParams(nextPageIndex, indexHeight), this.animationSpeed);
  }

  transitionPage (nextPageIndex, xPosition, transitionClass) {
    var self = this;
    this.transitionInProgress = true;

    this.slide.eq(this.currentIndex).animate({
      left: xPosition,
    }, this.animationSpeed, function() {
      $(this).removeClass('visible');
      $(this).css('left', '');
    });

    this.slide.eq(nextPageIndex).addClass('visible' + ' ' + transitionClass);
    this.slide.eq(nextPageIndex).animate({
      left: "0",
    }, this.animationSpeed, function() {
      $(this).removeClass(transitionClass);
      $(this).css('left', '');

      self.currentIndex = nextPageIndex;
      self.transitionInProgress = false;
    });
  }
}

export { Slider }


