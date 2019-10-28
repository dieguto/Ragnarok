import React, {Component} from 'react';

export default class Slider extends Component {
    render(){
        return(
            <div id="container">
                {/* <!-- INICIO SLIDER --> */}
        <div id="jssor_1">
        {/* <!-- Loading Screen --> */}
        <div data-u="loading" id="jssorl-009-spin">
            <img src={Spin} />
        </div>
        <div data-u="slides" id="slides">
            <div>
                <img data-u="image" src={Slide1} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini1} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide2} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini2} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide3} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini3} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide4} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini4} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide5} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini5} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide6} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini6} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide0} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini0} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide7} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini7} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide8} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini8} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide9} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini9} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide10} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini10} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
            <div>
                <img data-u="image" src={Slide11} />
                <div data-u="thumb">
                    <img data-u="thumb" class="i" src={SlideMini11} />
                    <span class="ti">Title</span><br />
                    <span class="d">Slide Description</span>
                </div>
            </div>
        </div>
        {/* <!-- Thumbnail Navigator --> */}
        <div data-u="thumbnavigator" class="jssort121" data-autocenter="2" data-scale-left="0.75">
            <div data-u="slides">
                <div data-u="prototype" class="p">
                    <div data-u="thumbnailtemplate" class="t"></div>
                </div>
            </div>
        </div>
        {/* <!-- Bullet Navigator --> */}
        <div data-u="navigator" class="jssorb111" data-scale="0.5">
            <div data-u="prototype" class="i prototype">
                <svg viewbox="0 0 16000 16000"  class="svg">
                    <circle class="b" cx="8000" cy="8000" r="3000"></circle>
                </svg>
                <div data-u="numbertemplate" class="n"></div>
            </div>
        </div>
    </div>
    {/* <!-- Final do Slide --> */}
            </div>
            
        )

    }
}