import React, { useState, useEffect } from 'react';
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
  const [transitionValue, setTransitionValue] = useState(
    sliderOptions.carouselMode ? (parseFloat(-100 / slidesPerView)) : 0,
  );
  const [autoPlayReverse, setAutoPlayReverse] = useState(false);
  const [touchIsEnded, setTouchIsEnded] = useState(true);
  const [touchStartPos, setTouchStartPos] = useState(null);

  const [preparedData] = useState((children)
    ? prepareData(children, sliderOptions.carouselMode)
    : prepareData(slidesData, sliderOptions.carouselMode));

  // Functions for Slider
  const moveSlidesToLeft = (pauseAction = false) => {
    setTransitionAnimation(null);
    if (transitionValue < 0) {
      setTransitionValue(transitionValue + (parseFloat(100 / slidesPerView)));
    }

    if (pauseAction) setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
  };

  const moveSlidesToRight = (pauseAction = false) => {
    setTransitionAnimation(null);
    const sliderLength = preparedData.length - 1;
    const maxTransition = (sliderLength / slidesPerView) * (parseFloat(100 / slidesPerView));
    if (
      Math.abs(transitionValue) < maxTransition) {
      setTransitionValue(transitionValue - (parseFloat(100 / slidesPerView)));
    }

    if (pauseAction) setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
  };

  const moveToSlide = (slidePosition) => {
    setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
    setTransitionAnimation(null);
    setTransitionValue(slidePosition);
  };

  const handlerTransitionEnd = () => {
    if (transitionValue === 0) {
      if (sliderOptions.carouselMode) {
        setTransitionAnimation('none');
        setTransitionValue((preparedData.length - 2) * (parseFloat(-100 / slidesPerView)));
      } else {
        setAutoPlayReverse(false);
      }
    }

    if (transitionValue === (preparedData.length - 1) * (parseFloat(-100 / slidesPerView))) {
      if (sliderOptions.carouselMode) {
        setTransitionAnimation('none');
        setTransitionValue(parseFloat(-100 / slidesPerView));
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

  const handleTouchStart = (event) => {
    setSliderOptions({ ...sliderOptions, autoPlayPaused: true });
    if (touchIsEnded) {
      setTouchIsEnded(false);
      setTouchStartPos(event.changedTouches[0].screenX);
    }
    return false;
  };
  const handleTouchEnd = (event) => {
    if (touchStartPos) {
      const touchEnd = event.changedTouches[0].screenX;
      const diff = Math.max(touchStartPos, touchEnd) - Math.min(touchStartPos, touchEnd);
      if (diff < 100) return false;

      setTouchIsEnded(true);
      if (touchEnd > touchStartPos) {
        moveSlidesToLeft();
      } else {
        moveSlidesToRight();
      }
      setTouchStartPos(null);
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
    if (sliderOptions.slideNavigation) {
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
        className="react-slider__slides-container"
        style={{
          transition: transitionAnimation,
          transform: `translateX(${transitionValue}%)`,
        }}
        onTransitionEnd={handlerTransitionEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slidesList}
      </div>
      {
        (slideNavigation)
          ? (
            <ReactSliderNavigation
              slidesIds={navigationItemsIds}
              transitionValue={transitionValue}
              slidesPerView={slidesPerView}
              callbackFn={moveToSlide}
            />
          )
          : null
      }
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
