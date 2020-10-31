import React from 'react';

const ReactSliderNavigation = ({
  slidesIds, slidesPerView, currentSlideIndex, onClickFn,
}) => {
  if (!Array.isArray(slidesIds) || !slidesIds.length) return null;

  const navigationList = slidesIds.map((item, idx) => {
    const keyId = idx + 1;
    const inViewRange = (currentSlideIndex <= item
      && item <= (currentSlideIndex + slidesPerView - 1));
    const itemClass = `react-slider__navigation-item ${(inViewRange ? 'react-slider__navigation-item_active' : '')}`;

    return (
      <span
        role="presentation"
        key={keyId}
        className={itemClass}
        tabIndex={keyId}
        onClick={() => {
          if (onClickFn) onClickFn(item);
        }}
      />
    );
  });

  return (
    <div className="react-slider__navigation-bar">
      {navigationList}
    </div>
  );
};

export default ReactSliderNavigation;
