import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = ({ image1, image2, image3, title, subtitle }) => {
  return (
    <Carousel style={{ marginTop: '20px' }}>
      {image1 && (
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={`https://auto-trader-service-test.s3.amazonaws.com/${image1}`}
            alt="First slide"
            style={{ height: '350px' }}
          />
          <Carousel.Caption>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {image2 == null && (
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={`https://auto-trader-service-test.s3.amazonaws.com/${image2}`}
            alt="Second slide"
            style={{ height: '350px' }}
          />
          <Carousel.Caption>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {image3 == null && (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://auto-trader-service-test.s3.amazonaws.com/${image3}`}
            alt="Third slide"
            style={{ height: '350px' }}
          />
          <Carousel.Caption>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
};
export default ImageCarousel;
