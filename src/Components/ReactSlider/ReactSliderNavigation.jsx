import React from 'react';

const ReactSliderNavigation = ({
  slidesIds, slidesPerView, transitionValue, onClickFn,
}) => {
  if (!Array.isArray(slidesIds)) return null;

  const navigationList = slidesIds.map((item, idx) => {
    const keyId = idx + 1;
    const itemClass = `react-slider__navigation-item ${(item * (100 / slidesPerView) === Math.abs(transitionValue)) ? 'react-slider__navigation-item_active' : ''}`;

    return (
      <span
        role="presentation"
        key={keyId}
        className={itemClass}
        tabIndex={keyId}
        onClick={() => {
          if (onClickFn) onClickFn(item * (-100 / slidesPerView));
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
