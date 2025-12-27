import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";

const info = ["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"];

export const CircleCarousel = ({
  images,
  setFocusElement = () => {},
  offsetAngle = 0,
  carouselRadius = 400,
  centralImageRadius = 125,
  centralImageBoxShadow = "0px 1px 10px #888888",
  peripheralImageRadius = 75,
  peripheralImageBoxShadow = "0px 1px 10px #888888",
  focusElementStyling = {},
  border = true,
  borderWidth = 5,
  borderHexColor = "CB786C",
  autoRotateTime = 0,
  transitionTime = 1.5,
  navigationTextSize = 2,
  navigationButtonRadius = 32.5,
  navigationButtonBgColor = "CB786C",
  navigationButtonColor = "FFFFFF",
  navigationButtonStyling = {},
}) => {
  const [carousel, setCarousel] = useState({
    carouselOrietation: 0,
    elementOrientation: 0,
    focusElement: 0,
  });
  const [autoRotateTimer, setAutoRotateTimer] = useState(null);

  const noOfImages = images.length;
  const theta = 360 / noOfImages;

  setFocusElement(carousel.focusElement);

  // Function to handle rotation
  const rotateToIndex = useCallback(
    (newIndex) => {
      const currentIndex = carousel.focusElement;
      const difference = newIndex - currentIndex;
      const rotationSteps =
        difference < 0 ? difference + noOfImages : difference;

      setCarousel({
        carouselOrietation: carousel.carouselOrietation + theta * rotationSteps,
        elementOrientation: carousel.elementOrientation - theta * rotationSteps,
        focusElement: newIndex,
      });
    },
    [carousel, theta, noOfImages]
  );

  const rotateRight = useCallback(() => {
    const newIndex =
      carousel.focusElement < noOfImages - 1 ? carousel.focusElement + 1 : 0;
    rotateToIndex(newIndex);
  }, [carousel.focusElement, noOfImages, rotateToIndex]);

  const rotateLeft = useCallback(() => {
    const newIndex =
      carousel.focusElement > 0 ? carousel.focusElement - 1 : noOfImages - 1;
    rotateToIndex(newIndex);
  }, [carousel.focusElement, noOfImages, rotateToIndex]);

  // Handle image click
  const handleImageClick = (index) => {
    if (index === carousel.focusElement) return;

    // Clear existing timer
    if (autoRotateTimer) {
      clearTimeout(autoRotateTimer);
    }

    rotateToIndex(index);

    // Reset auto-rotation from new position
    if (autoRotateTime) {
      const newTimer = setTimeout(() => {
        rotateRight();
      }, autoRotateTime * 1000);
      setAutoRotateTimer(newTimer);
    }
  };

  // Set up auto-rotation
  useEffect(() => {
    if (autoRotateTime) {
      const timer = setTimeout(() => {
        rotateRight();
      }, autoRotateTime * 1000);
      setAutoRotateTimer(timer);

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [autoRotateTime, carousel.focusElement, rotateRight]);

  const borderElement = border
    ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${
        carouselRadius * 2
      }' ry='${
        carouselRadius * 2
      }' stroke='%23${borderHexColor}FF' stroke-width='${borderWidth}' stroke-dasharray='6%2c 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
    : "";

  const newCoordinates = images.map((_, index) => [
    carouselRadius -
      peripheralImageRadius +
      carouselRadius * Math.cos((2 * Math.PI * index) / noOfImages),
    carouselRadius -
      peripheralImageRadius +
      carouselRadius * Math.sin((2 * Math.PI * index) / noOfImages),
  ]);

  const totalDeviation = (offsetAngle * Math.PI) / 180 + Math.PI / 2;
  const centerCoordinate = carouselRadius - peripheralImageRadius;

  const rotatedCoordinates = newCoordinates.map(([x, y]) => [
    centerCoordinate +
      (x - centerCoordinate) * Math.cos(totalDeviation) -
      (y - centerCoordinate) * Math.sin(totalDeviation),
    centerCoordinate +
      (x - centerCoordinate) * Math.sin(totalDeviation) +
      (y - centerCoordinate) * Math.cos(totalDeviation),
  ]);

  return (
    <div className="fancy-carousel-wrapper-element">
      <div
        className="fancy-carousel-border "
        style={{
          backgroundImage: borderElement,
          height: `${carouselRadius * 2}px`,
          width: `${carouselRadius * 2}px`,
          transition: `${transitionTime}`,
        }}
      >
        <div
          className="fancy-carousel"
          style={{
            transform: `rotate(${carousel.carouselOrietation}deg)`,
            height: `${carouselRadius * 2}px`,
            width: `${carouselRadius * 2}px`,
          }}
        >
          {images.map((item, index) =>
            index !== carousel.focusElement ? (
              <div
                className="fancy-carousel-element w-24 h-24"
                key={index}
                onClick={() => handleImageClick(index)}
                style={{
                  transform: `rotate(${carousel.elementOrientation}deg)`,
                  // width: `${peripheralImageRadius * 2}px`,
                  // height: `${peripheralImageRadius * 2}px`,
                  left: `${rotatedCoordinates[index][0]}px`,
                  bottom: `${rotatedCoordinates[index][1]}px`,
                  boxShadow: `${peripheralImageBoxShadow}`,
                  transition: `${transitionTime}`,
                  cursor: "pointer",
                }}
              >
                <img
                  className="fancy-carousel-image w-20"
                  src={item}
                  // style={{
                  //   width: `${peripheralImageRadius * 2}px`,
                  //   height: `${peripheralImageRadius * 2}px`,
                  // }}
                />
              </div>
            ) : (
              <div
                className="fancy-carousel-element"
                key={index}
                style={{
                  ...{
                    transform: `rotate(${carousel.elementOrientation}deg)`,
                    width: `${peripheralImageRadius * 2}px`,
                    height: `${peripheralImageRadius * 2}px`,
                    left: `${rotatedCoordinates[index][0]}px`,
                    bottom: `${rotatedCoordinates[index][1]}px`,
                    boxShadow: `${peripheralImageBoxShadow}`,
                    transition: `${transitionTime}`,
                  },
                  ...focusElementStyling,
                }}
              >
                <img
                  className="fancy-carousel-image"
                  src={item}
                  // style={{
                  //   width: `${peripheralImageRadius * 2}px`,
                  //   height: `${peripheralImageRadius * 2}px`,
                  //   transition: `${transitionTime}`,
                  // }}
                />
              </div>
            )
          )}

          <div
            className={`fancy-carousel-element central-img`}
            key={noOfImages}
            style={{
              transform: `rotate(${carousel.elementOrientation}deg)`,
              width: `${centralImageRadius * 2}px`,
              height: `${centralImageRadius * 2}px`,
              left: `${carouselRadius - centralImageRadius - 10}px`,
              bottom: `${carouselRadius - centralImageRadius - 10}px`,
              boxShadow: `${centralImageBoxShadow}`,
              transition: `${transitionTime}`,
            }}
          >
            {/* <img
              className="fancy-carousel-central-image"
              src={images[carousel.focusElement]}
              style={{
                width: `${centralImageRadius * 2}px`,
                height: `${centralImageRadius * 2}px`,
                transition: `${transitionTime}`,
              }}
            /> */}
            <div className="info-box-wrapper">
              <p className="text-5xl"> {info[carousel.focusElement]} </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "fancy-carousel-navigators " + (autoRotateTime ? "invisible" : "")
        }
        style={{
          gap: `${carouselRadius * 2}px`,
          marginLeft: `-${navigationButtonRadius * 1.8}px`,
        }}
      >
        <button
          className="fancy-carousel-navigation-button"
          onClick={rotateLeft}
          style={{
            ...{
              width: `${navigationButtonRadius * 2}px`,
              height: `${navigationButtonRadius * 2}px`,
              backgroundColor: `#${navigationButtonBgColor}`,
              color: `#${navigationButtonColor}`,
              fontSize: `${navigationTextSize}rem`,
            },
            ...navigationButtonStyling,
          }}
        >
          ↓
        </button>
        <button
          className="fancy-carousel-navigation-button"
          onClick={rotateRight}
          style={{
            ...{
              width: `${navigationButtonRadius * 2}px`,
              height: `${navigationButtonRadius * 2}px`,
              backgroundColor: `#${navigationButtonBgColor}`,
              color: `#${navigationButtonColor}`,
              fontSize: `${navigationTextSize}rem`,
            },
            ...navigationButtonStyling,
          }}
        >
          ↓
        </button>
      </div>
    </div>
  );
};
