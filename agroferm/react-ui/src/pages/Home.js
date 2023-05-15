import React from 'react'
import NavOne from '../components/home/navOne';
import NavTwo from '../components/home/navTwo';
import NavThree from '../components/home/navThree';
import SliderOne from '../components/home/sliderOne';
import WhyChoose from '../components/home/whyChoose';
import HowItWork from '../components/home/howItWork';
import Deal from '../components/home/deal';
import ImageBanner from '../components/home/imageBanner';


const Home = () => {
    return (
        <>
            <NavOne />
            <NavTwo />
            <NavThree />
            <section id='marginatedSection'>
                <SliderOne />
                <WhyChoose />
                <HowItWork />
                <Deal />
                <ImageBanner />
                <ImageBanner />
                <ImageBanner />
            </section>

        </>
    )
}

export default Home