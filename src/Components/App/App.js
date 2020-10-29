import React from 'react';
import ReactSlider from '../ReactSlider/ReactSlider';
import './App.scss';

function App() {
  return (
    <>
      <header className="header" id="header">
        <h1 className="header__title">ReactSlider</h1>
        <nav className="header__navbar">
          <ul className="header__navigation">
            <li className="header__navigation-item"><a className="header__navigation-link" href="#root">Home</a></li>
            <li className="header__navigation-item"><a className="header__navigation-link" href="#demos">Demos</a></li>
            <li className="header__navigation-item"><a className="header__navigation-link" href="https://github.com/BoL4oNoK/react_slider" title="Go to GitHub page" target="_blank" rel="noopener noreferrer">GitHUB</a></li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <section className="about">
          <p className="description">
            {`
              Whith this ReactSlider you can make slides based on React Elements or using special data-object with necessary fields, like as image data (src link), title and description.
            `}
          </p>
        </section>
        <section className="options" id="options">
          <p className="description">
            {`
              For Slider you can indicate some options for it (object Options), with following parameters:
            `}
          </p>
          <table className="options-list">
            <thead className="options-list__header">
              <tr>
                <td>Property</td>
                <td>Type</td>
                <td>Default</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody className="options-list__body">
              <tr>
                <td>autoPlay</td>
                <td>Boolean</td>
                <td>false</td>
                <td>show slide in automatic mode</td>
              </tr>
              <tr>
                <td>autoPlayDelay</td>
                <td>Number</td>
                <td>5</td>
                <td>delay in seconds for each slide</td>
              </tr>
              <tr>
                <td>carouselMode</td>
                <td>Boolean</td>
                <td>false</td>
                <td>slides will be showed in carousel mode</td>
              </tr>
              <tr>
                <td>slideNavigation</td>
                <td>Boolean</td>
                <td>false</td>
                <td>show slide navigation bar</td>
              </tr>
              <tr>
                <td>slidesPerView</td>
                <td>Number</td>
                <td>1</td>
                <td>count of slides, which will be displayed</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section id="demos">
          <div className="demos">
            <h2 className="demos__title">1. ReactSlider with default settings</h2>
            <div>
              <p className="demos__label">Usage:</p>
              <pre className="demos__code">
                {`
<ReactSlider >
  {elements for slider}
</ReactSlider>
                `}
              </pre>
              <ReactSlider
                className="demos__slider"
              >
                <div className="slide-block">
                  <img src="images/iceland-1979445_1920.jpg" alt="White fox by David Mark" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 1</h2>
                </div>
                <div className="slide-block">
                  <img src="images/yellowstone-national-park-1581879_1920.jpg" alt="Yellowstone national park by David Mark" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 2</h2>
                  <p className="slide-block__description">Best park in USA</p>
                </div>
                <div className="slide-block">
                  <img src="images/sunset-1373171_1920.jpg" alt="Cindy Lever" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 3</h2>
                </div>
                <div className="slide-block">
                  <img src="images/road-1072823_1920.jpg" alt="Valiphotos" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 4</h2>
                </div>
              </ReactSlider>
            </div>
          </div>
          <hr />
          <div className="demos">
            <h2 className="demos__title">2. ReactSlider with multiple slides</h2>
            <div>
              <p className="demos__label">Usage:</p>
              <pre className="demos__code">
                {`
<ReactSlider options={{ slidesPerView: 2 }} >
  {elements for slider}
</ReactSlider>
                `}
              </pre>
              <ReactSlider
                className="demos__slider"
                options={{ slidesPerView: 2 }}
              >
                <div className="slide-block">
                  <img src="images/iceland-1979445_1920.jpg" alt="White fox by David Mark" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 1</h2>
                </div>
                <div className="slide-block">
                  <img src="images/yellowstone-national-park-1581879_1920.jpg" alt="Yellowstone national park by David Mark" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 2</h2>
                  <p className="slide-block__description">Best park in USA</p>
                </div>
                <div className="slide-block">
                  <img src="images/sunset-1373171_1920.jpg" alt="Cindy Lever" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 3</h2>
                </div>
                <div className="slide-block">
                  <img src="images/road-1072823_1920.jpg" alt="Valiphotos" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 4</h2>
                </div>
              </ReactSlider>
            </div>
          </div>
          <hr />
          <div className="demos">
            <h2 className="demos__title">3. ReactSlider with carousel mode and autoplay</h2>
            <div>
              <p className="demos__label">Usage:</p>
              <pre className="demos__code">
                {`
<ReactSlider options={{ autoPlay: true, carouselMode: true }} >
  {elements for slider}
</ReactSlider>
                `}
              </pre>
              <ReactSlider
                className="demos__slider"
                options={{ autoPlay: true, carouselMode: true }}
              >
                <div className="slide-block">
                  <img src="images/iceland-1979445_1920.jpg" alt="White fox by David Mark" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 1</h2>
                </div>
                <div className="slide-block">
                  <img src="images/yellowstone-national-park-1581879_1920.jpg" alt="Yellowstone national park by David Mark" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 2</h2>
                  <p className="slide-block__description">Best park in USA</p>
                </div>
                <div className="slide-block">
                  <img src="images/sunset-1373171_1920.jpg" alt="Cindy Lever" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 3</h2>
                </div>
                <div className="slide-block">
                  <img src="images/road-1072823_1920.jpg" alt="Valiphotos" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 4</h2>
                </div>
              </ReactSlider>
            </div>
          </div>
          <hr />
          <div className="demos">
            <h2 className="demos__title">4. ReactSlider with carousel mode and navigation bar</h2>
            <div>
              <p className="demos__label">Usage:</p>
              <pre className="demos__code">
                {`
<ReactSlider options={{ carouselMode: true, slideNavigation: true }} >
  {elements for slider}
</ReactSlider>
                `}
              </pre>
              <ReactSlider
                className="demos__slider"
                options={{ carouselMode: true, slideNavigation: true }}
              >
                <div className="slide-block">
                  <img src="images/iceland-1979445_1920.jpg" alt="White fox by David Mark" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 1</h2>
                </div>
                <div className="slide-block">
                  <img src="images/yellowstone-national-park-1581879_1920.jpg" alt="Yellowstone national park by David Mark" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 2</h2>
                  <p className="slide-block__description">Best park in USA</p>
                </div>
                <div className="slide-block">
                  <img src="images/sunset-1373171_1920.jpg" alt="Cindy Lever" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 3</h2>
                </div>
                <div className="slide-block">
                  <img src="images/road-1072823_1920.jpg" alt="Valiphotos" className="slide-block__image" />
                  <h2 className="slide-block__title">slide 4</h2>
                </div>
              </ReactSlider>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
