import React from "react";
import { Row, Col, Card } from 'react-bootstrap'
import BannerLgImgOne from '../../assets/images/banner_lg_imgOne.webp';
import BannerImgTwo from '../../assets/images/banner_img_two.webp';
import BannerImgThree from '../../assets/images/banner_img_three.webp';
import BannerImgFour from '../../assets/images/banner_img_four.webp';
import BannerImgFive from '../../assets/images/banner_img_five.webp';
import BannerImgSix from '../../assets/images/banner_img_six.webp';
import BannerImgSeven from '../../assets/images/banner_img_seven.webp';

function ImageBanner() {

    const data = {
        one: [
            {
                id: 1,
                title: 'Food',
                img: BannerImgTwo
            },
            {
                id: 2,
                title: 'Chicken',
                img: BannerImgThree
            },
            {
                id: 3,
                title: 'Tubers',
                img: BannerImgFour
            }
        ],
        two: [
            {
                id: 1,
                title: 'Maize',
                img: BannerImgFive
            },
            {
                id: 2,
                title: 'Fruits',
                img: BannerImgSix
            },
            {
                id: 3,
                title: 'Vegetable',
                img: BannerImgSeven
            },

        ]
    }
    return (
        <>
            <section className="mt-5 mb-5">
                <Row style={{ border: '1px solid #ddd', borderRadius: "5px", maxWidth: "900px", margin: "0 auto" }}>
                    <Col lg={3} style={{ background: "#45bf88", color: "#fff", padding: "10px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}>
                        <div>
                            <h1 style={{ fontSize: "22px", fontWeight: "700" }}> Food & Beverages</h1>
                        </div>
                        <div>
                            Stock up with Agroferm wide variety of wholesale food and beverages items from top brands
                        </div>
                        <div>
                            <img src={BannerLgImgOne} style={{ marginTop: "2rem" }} className='img-fluid' alt='banner img' />
                        </div>
                    </Col>
                    <Col lg={9}>
                        <Row style={{ borderBottom: "1px solid #ddd" }}>
                            {data.one.map(e => {
                                return (
                                    <Col key={e.id} style={{ width: '15rem', height: "15rem", fontWeight: "600", padding: "10px", borderRight: "1px solid #eee" }}>
                                        <div>
                                            {e.title}
                                        </div>
                                        <div style={{ width: "10rem", paddingTop: "6rem", marginLeft: "7rem" }}>
                                            <img src={e.img} className='img-fluid' style={{ width: "10rem" }} alt='banner image' />

                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                        <Row style={{}}>
                            {data.two.map(e => {
                                return (
                                    <Col key={e.id} style={{ width: '17rem', height: "15rem", fontWeight: "600", padding: "10px", borderRight: "1px solid #eee" }}>
                                        <div style={{ fontWeight: "600" }}>
                                            {e.title}
                                        </div>
                                        <div style={{ width: "10rem", paddingTop: "6rem", marginLeft: "7rem" }}>
                                            <img src={e.img} className='img-fluid' style={{ width: "10rem" }} alt='banner image' />

                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </section >
        </>
    )
}
export default ImageBanner;