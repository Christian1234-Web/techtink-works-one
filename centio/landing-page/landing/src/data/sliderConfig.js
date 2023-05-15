export const FourColSliderConfig = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 20000,
        settings: "unslick",
      },
    ],
  }
export const threeColSliderConfig = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 20000,
        settings: "unslick",
      }
    ]
  }

export const screenshotSlider = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  centerMode: true,
  centerPadding: "130px",
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  easing: "linear",
  speed: 800,
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 5,
        centerPadding: "100px",
      },
    },
    {
      breakpoint: 1750,
      settings: {
        slidesToShow: 5,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 1670,
      settings: {
        slidesToShow: 5,
        centerPadding: "60px",
      },
    },
    {
      breakpoint: 1640,
      settings: {
        slidesToShow: 5,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 5,
        centerPadding: "10px",
      },
    },
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 3,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 3,
        centerPadding: "10px",
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
        centerPadding: "0px",
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 3,
        centerPadding: "10px",
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 3,
        centerPadding: "0",
      },
    },
    {
      breakpoint: 830,
      settings: {
        fade: true,
        slidesToShow: 1,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 650,
      settings: {
        fade: true,
        slidesToShow: 1,
        centerPadding: "10px",
      },
    },
    {
      breakpoint: 515,
      settings: {
        fade: true,
        slidesToShow: 1,
        autoplay: true,
        centerPadding: "0px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        fade: true,
        slidesToShow: 1,
        autoplay: true,
        centerPadding: "0px",
        arrows: false,
      },
    },
  ],
}