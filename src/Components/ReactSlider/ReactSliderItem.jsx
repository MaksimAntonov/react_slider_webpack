import React from 'react';

const ReactSliderItem = ({ slide, indexElem, slidesPerView }) => {
  let resultElem;
  if (React.isValidElement(slide)) {
    resultElem = slide;
  } else {
    return null;
  }

  return (
    (
      <div key={indexElem} className="react-slider__item" style={{ minWidth: `${100 / slidesPerView}%` }}>
        {resultElem}
      </div>
    )
  );
};

export default ReactSliderItem;
