import React,{Component, useState} from 'react';
import { Carousel } from 'react-bootstrap';
import Slide1 from '../assets/jumpforce.jpg';
import Slide2 from '../assets/consolesbackground1cortado.png';
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
            <p className="font1 legenda-slide">Novo ou usado, a gente tem um espacinho pra você 😉👌 </p>
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
            <p className="font1 legenda-slide">Eaí, bora anunciar esse console parado na estante 😉👌🔥</p>
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
            <p className="font1 legenda-slide">
              Precisando de um controle pro seu irmão jogar contigo? Nós Temos! 😉👌
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
 

