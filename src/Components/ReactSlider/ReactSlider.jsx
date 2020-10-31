import React, { useState, useEffect, useRef } from 'react';
import ReactSliderItem from './ReactSliderItem';
import ReactSliderNavigation from './ReactSliderNavigation';
import './ReactSlider.scss';

const defaultOptions = {
  autoPlay: false,
  autoPlayDelay: 5,
  carouselMode: false,
  slideNavigation: false,
  slidesPerView: 1,
};
const swipeSpeadUp = 5;

const prepareData = (data, carouselMode) => {
  if (!Array.isArray(data)) return false;

  return (carouselMode)
    ? [data[data.length - 1], ...data, data[0]]
    : data;
};

const pxToPercent = (value) => parseFloat((value / document.body.clientWidth) * 100);

const ReactSlider = ({
  options, children, id, className,
}) => {
  const [sliderOptions, setSliderOptions] = useState({
    ...defaultOptions,
    ...options,
    autoPlayPaused: false,
  });
  const [slideNavigation] = useState(sliderOptions.slideNavigation);
  const [slidesPerView] = useState(sliderOptions.slidesPerView);
  const [transitionAnimation, setTransitionAnimation] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(sliderOptions.carouselMode ? 1 : 0);
  const deltaXSlides = parseFloat(100 / slidesPerView);
  const [transitionState, setTransitionState] = useState(
    sliderOptions.carouselMode ? (-deltaXSlides) : 0,
  );
  const [autoPlayReverse, setAutoPlayReverse] = useState(false);
  const [swipeIsEnded, setSwipeIsEnded] = useState(true);
  const [swipeStartPos, setSwipeStartPos] = useState(null);
  const [preparedData] = useState(prepareData(children, sliderOptions.carouselMode));
  const transitionBasedValue = useRef(null);
  const autoPlayerTimer = useRef(0);

  const dataLength = preparedData.length;
  const maxLeftSlide = 0;
  const maxRightSlide = dataLength - slidesPerView;

  const moveToSlide = (slideIndex, pauseAction = false) => {
    if (pauseAction) setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
    setTransitionAnimation(null);

    if (slideIndex >= maxLeftSlide && slideIndex <= maxRightSlide) {
      setTransitionState(slideIndex * -deltaXSlides);
      setCurrentSlideIndex(slideIndex);
      return false;
    }

    if (slideIndex < maxLeftSlide) {
      setTransitionState(maxLeftSlide * -deltaXSlides);
      setCurrentSlideIndex(maxLeftSlide);
      return false;
    }

    if (slideIndex > maxRightSlide) {
      setTransitionState(maxRightSlide * -deltaXSlides);
      setCurrentSlideIndex(maxRightSlide);
      return false;
    }

    return false;
  };

  const updateCurrentSlide = (slideIndex, reverse) => {
    if (sliderOptions.carouselMode) {
      setTransitionAnimation('none');
      setCurrentSlideIndex(slideIndex);
      setTransitionState(slideIndex * -deltaXSlides);
    } else {
      setAutoPlayReverse(reverse);
    }
  };

  const handlerTransitionEnd = () => {
    if (currentSlideIndex === 0) {
      updateCurrentSlide(dataLength - 2, false);
    }

    if (currentSlideIndex === maxRightSlide) {
      updateCurrentSlide(1, true);
    }
  };

  const autoSliding = () => {
    if (sliderOptions.autoPlayPaused) {
      return;
    }

    if (sliderOptions.carouselMode || !autoPlayReverse) {
      moveToSlide(currentSlideIndex + 1);
    } else {
      moveToSlide(currentSlideIndex - 1);
    }
  };

  const handleSwipeStart = (event) => {
    setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
    if (swipeIsEnded) {
      transitionBasedValue.current = transitionState;
      setSwipeIsEnded(false);
      setSwipeStartPos((event.type === 'touchstart') ? event.changedTouches[0].screenX : event.screenX);
    }
    return false;
  };

  const handleSwipeEnd = () => {
    if (swipeStartPos) {
      if (transitionBasedValue.current <= 0) {
        setTransitionState(transitionBasedValue.current);
      }
      setSwipeIsEnded(true);
      setSwipeStartPos(null);
      transitionBasedValue.current = null;
    }

    return false;
  };

  const handleSwipeMove = (event) => {
    if (event.type === 'mousemove' && event.buttons !== 1) {
      return false;
    }

    if (swipeStartPos) {
      setTransitionAnimation(null);
      const swipeMove = (event.type === 'touchmove') ? event.changedTouches[0].screenX : event.screenX;
      const diff = Math.max(swipeStartPos, swipeMove) - Math.min(swipeStartPos, swipeMove);

      let transitionValue = 0;
      if (swipeMove > swipeStartPos) {
        transitionValue = transitionBasedValue.current + (pxToPercent(diff) * swipeSpeadUp);
      } else {
        transitionValue = transitionBasedValue.current - (pxToPercent(diff) * swipeSpeadUp);
      }

      if (
        (transitionValue > (maxRightSlide * -deltaXSlides))
        && (transitionValue < (maxLeftSlide * -deltaXSlides))
      ) {
        setTransitionState(transitionValue);
      }

      const minSwipeValue = document.body.clientWidth / 4;

      if (diff > minSwipeValue) {
        setSwipeIsEnded(true);
        if (swipeMove > swipeStartPos) {
          moveToSlide(currentSlideIndex - 1, true);
        } else {
          moveToSlide(currentSlideIndex + 1, true);
        }
        setSwipeStartPos(null);
        transitionBasedValue.current = null;
      }
    }

    return false;
  };

  useEffect(() => {
    if (sliderOptions.autoPlay) {
      clearTimeout(autoPlayerTimer.current);
      autoPlayerTimer.current = setTimeout(autoSliding, sliderOptions.autoPlayDelay * 1000);
    }
  });

  const navigationItemsIds = [];
  const slidesList = preparedData.map((item, idx) => {
    const idxKey = idx + 1;
    if (slideNavigation) {
      let indexForNavigation;
      if (sliderOptions.carouselMode) {
        if (idx !== 0 && idx !== dataLength - 1) {
          indexForNavigation = idx;
        }
      } else indexForNavigation = idx;
      if (indexForNavigation >= 0) navigationItemsIds.push(indexForNavigation);
    }
    return (
      <ReactSliderItem
        key={idxKey}
        slide={item}
        indexElem={idxKey}
        slidesPerView={sliderOptions.slidesPerView}
      />
    );
  });

  const sliderClassNames = (className) ? `react-slider ${className}` : 'react-slider';
  return (
    <div
      className={sliderClassNames}
      id={id || null}
    >
      <button
        type="button"
        className="react-slider__buttons react-slider__buttons-left"
        onClick={() => moveToSlide(currentSlideIndex - 1, true)}
      >
        &lt;
      </button>
      <div
        role="presentation"
        className="react-slider__slides-container"
        style={{
          transition: transitionAnimation,
          transform: `translateX(${transitionState}%)`,
        }}
        onTransitionEnd={handlerTransitionEnd}
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
        onTouchMove={handleSwipeMove}
        onMouseDown={handleSwipeStart}
        onMouseUp={handleSwipeEnd}
        onMouseMove={handleSwipeMove}
        onDragStart={(event) => event.preventDefault()}
      >
        {slidesList}
      </div>
      <ReactSliderNavigation
        slidesIds={navigationItemsIds}
        currentSlideIndex={currentSlideIndex}
        slidesPerView={slidesPerView}
        onClickFn={moveToSlide}
      />
      <button
        type="button"
        className="react-slider__buttons react-slider__buttons-right"
        onClick={() => moveToSlide(currentSlideIndex + 1, true)}
      >
        &gt;
      </button>
    </div>
  );
};

export default ReactSlider;
