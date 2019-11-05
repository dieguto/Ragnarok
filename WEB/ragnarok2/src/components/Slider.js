import React,{Component, useState} from 'react';
import { Carousel } from 'react-bootstrap';
import Slide1 from '../assets/jumpforce.jpg';
import Slide2 from '../assets/slide03.jpg';
import Slide3 from '../assets/testejogo1.jpg';
import '../css/fontepersonalizada.css';
import '../css/slider.css';
import 'bootstrap';


 
export function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
 

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
    return (
      <Carousel className="carousel" activeIndex={index} direction={direction} onSelect={handleSelect}>
        <Carousel.Item className="item">
          <img
            className="d-block w-100"
            src={Slide1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="fonte-padrao text-center">Jogos</h3>
            <p className="">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="item">
          <img
            className="d-block w-100"
            src={Slide2}
            alt="Second slide"
          />
  
          <Carousel.Caption>
          <h3 className="fonte-padrao text-center">Consoles</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="item">
          <img
            className="d-block w-100"
            src={Slide3}
            alt="Third slide"
          />
  
          <Carousel.Caption>
          <h3 className="fonte-padrao text-center">Acessórios</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
 

