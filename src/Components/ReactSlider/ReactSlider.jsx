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

const prepareData = (data, carouselMode) => {
  if (!Array.isArray(data)) return false;

  return (carouselMode)
    ? [data[data.length - 1], ...data, data[0]]
    : data;
};

const ReactSlider = ({
  slidesData, options, children, id, className,
}) => {
  const [sliderOptions, setSliderOptions] = useState({
    ...defaultOptions,
    ...options,
    autoPlayPaused: false,
  });
  const [slideNavigation] = useState(sliderOptions.slideNavigation);
  const [slidesPerView] = useState(sliderOptions.slidesPerView);
  const [transitionAnimation, setTransitionAnimation] = useState(null);
  const transitionBasedValue = useRef(null);
  const [transitionState, setTransitionState] = useState(
    sliderOptions.carouselMode ? (parseFloat(-100 / slidesPerView)) : 0,
  );
  const [autoPlayReverse, setAutoPlayReverse] = useState(false);
  const [swipeIsEnded, setSwipeIsEnded] = useState(true);
  const [swipeStartPos, setSwipeStartPos] = useState(null);

  const [preparedData] = useState((children)
    ? prepareData(children, sliderOptions.carouselMode)
    : prepareData(slidesData, sliderOptions.carouselMode));
  const maxLTransition = 0;
  // eslint-disable-next-line max-len
  const maxRTransition = -((preparedData.length - 1 / slidesPerView) * (parseFloat(100 / slidesPerView)));

  // Functions for Slider
  const pxToPercent = (value) => Math.round((value / document.body.clientWidth) * 100);

  const moveSlidesToLeft = (pauseAction = false) => {
    setTransitionAnimation(null);
    const transition = (transitionBasedValue.current !== null)
      ? transitionBasedValue.current
      : transitionState;
    if (transition < maxLTransition) {
      setTransitionState(transition + (parseFloat(100 / slidesPerView)));
    } else {
      setTransitionState(0); // transition);
    }

    if (pauseAction) setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
  };

  const moveSlidesToRight = (pauseAction = false) => {
    setTransitionAnimation(null);
    const transition = (transitionBasedValue.current !== null)
      ? transitionBasedValue.current
      : transitionState;
    if (transition > maxRTransition) {
      setTransitionState(transition - (parseFloat(100 / slidesPerView)));
    } else {
      setTransitionState(transition);
    }

    if (pauseAction) setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
  };

  const moveToSlide = (slidePosition) => {
    setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
    setTransitionAnimation(null);
    setTransitionState(slidePosition);
  };

  const handlerTransitionEnd = () => {
    if (transitionState === 0) {
      if (sliderOptions.carouselMode) {
        setTransitionAnimation('none');
        setTransitionState((preparedData.length - 2) * (parseFloat(-100 / slidesPerView)));
      } else {
        setAutoPlayReverse(false);
      }
    }

    if (
      transitionState === (preparedData.length - 1) * (parseFloat(-100 / slidesPerView))
    ) {
      if (sliderOptions.carouselMode) {
        setTransitionAnimation('none');
        setTransitionState(parseFloat(-100 / slidesPerView));
      } else {
        setAutoPlayReverse(true);
      }
    }
  };

  const autoSliding = () => {
    if (sliderOptions.autoPlayPaused) {
      return;
    }

    if (sliderOptions.carouselMode || !autoPlayReverse) {
      moveSlidesToRight();
    } else {
      moveSlidesToLeft();
    }
  };

  const handleSwipeStart = (event) => {
    setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
    if (swipeIsEnded) {
      transitionBasedValue.current = Math.round(transitionState);
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
      const swipeMove = (event.type === 'touchmove') ? event.changedTouches[0].screenX : event.screenX;
      const diff = Math.round(
        Math.max(swipeStartPos, swipeMove) - Math.min(swipeStartPos, swipeMove),
      );

      let transitionValue = 0;
      if (swipeMove > swipeStartPos) {
        transitionValue = transitionBasedValue.current + pxToPercent(diff);
      } else {
        transitionValue = transitionBasedValue.current - pxToPercent(diff);
      }

      if ((transitionValue > maxRTransition) && (transitionValue < maxLTransition)) {
        setTransitionState(transitionValue);
      }

      const minSwipeValue = Math.round(document.body.clientWidth / 4);

      if (diff > minSwipeValue) {
        setSwipeIsEnded(true);
        if (swipeMove > swipeStartPos) {
          moveSlidesToLeft();
        } else {
          moveSlidesToRight();
        }
        setSwipeStartPos(null);
        transitionBasedValue.current = null;
      }
    }

    return false;
  };

  useEffect(() => {
    if (sliderOptions.autoPlay) {
      setTimeout(() => autoSliding(), sliderOptions.autoPlayDelay * 1000);
    }
  });

  const navigationItemsIds = [];
  const slidesList = preparedData.map((item, idx) => {
    const idxKey = idx + 1;
    if (slideNavigation) {
      let indexForNavigation;
      if (sliderOptions.carouselMode) {
        if (idx !== 0 && idx !== preparedData.length - 1) {
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
        onClick={() => moveSlidesToLeft(false)}
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
        transitionValue={transitionState}
        slidesPerView={slidesPerView}
        onClickFn={moveToSlide}
      />
      <button
        type="button"
        className="react-slider__buttons react-slider__buttons-right"
        onClick={() => moveSlidesToRight(true)}
      >
        &gt;
      </button>
    </div>
  );
};

export default ReactSlider;
