class Parallax {
  constructor() {
    this.windowEvents = {
     'scroll': this.parallaxScroll.bind(this)
    };
  }

  initialize() {
    $(window).on(this.windowEvents);
  }

  unbind() {
    $(window).unbind(this.windowEvents);
  }

  isParallaxContainerInView(parrallaxContainer) {
    var viewport = {
      top : $(window).scrollTop(),
    };
    var bounds = $(parrallaxContainer).offset();
    viewport.bottom = viewport.top + window.innerHeight;
    bounds.bottom = bounds.top + $(parrallaxContainer).outerHeight();
    return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  }

  parallaxScroll() {
    $('.parallax-container').toArray().forEach((parallaxContainer) => {
     if (this.isParallaxContainerInView(parallaxContainer)) {
        var parallaxContainerCenter = $(parallaxContainer).offset().top - ($(parallaxContainer).height());
        var parallaxObject = $(parallaxContainer).find(".parallax-object");
        var transformCss = (parallaxContainerCenter - $(window).scrollTop())*-.25;
        parallaxObject.css("transform","translateY("+-transformCss+"px)");
      }
    });
  }
}

export { Parallax }
