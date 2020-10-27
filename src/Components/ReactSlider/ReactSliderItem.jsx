import React from 'react';

const ReactSliderItem = ({ slide, indexElem, slidesPerView }) => {
  let resultElem = [];
  if (React.isValidElement(slide)) {
    resultElem = slide;
  } else {
    resultElem = [];
    if (slide.image) resultElem.push(<img key={`image_${indexElem}`} src={slide.image.src} alt={slide.image.alt} className="react-slider__item-image" />);
    if (slide.title) resultElem.push(<h2 key={`title_${indexElem}`} className="react-slider__item-title">{slide.title}</h2>);
    if (slide.description) resultElem.push(<p key={`desc_${indexElem}`} className="react-slider__item-description">{slide.description}</p>);
  }

  const elementIsReady = (resultElem.length > 0 || React.isValidElement(resultElem));

  return (
    (elementIsReady)
      ? (
        <div key={indexElem} className="react-slider__item" style={{ minWidth: `${100 / slidesPerView}%` }}>
          {resultElem}
        </div>
      )
      : null
  );
};

export default ReactSliderItem;
