import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import ImgOne from '../../assets/images/slider_one_img.webp'
import ImgTwo from '../../assets/images/slider_one_img2.webp'
import ImgThree from '../../assets/images/slider_one_img3.webp'

function SliderOne() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={ImgOne}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={ImgTwo}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={ImgThree}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default SliderOne