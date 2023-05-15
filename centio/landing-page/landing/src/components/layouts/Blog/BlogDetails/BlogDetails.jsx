import React from "react";
import { ReactSVG } from "react-svg";
import BlogSideBar from "~components/lib/Blog/BlogSideBar";
const BlogDetails = () => {
  return (
    <div className="blogcontent-section-02">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-5">
            <BlogSideBar />
          </div>
          <div className="col-xl-7 offset-xl-1 col-lg-7">
            <div className="blogcontent-card">
              <div className="blogcontent-card--img">
                <img
                  src="./image/blog/blog-detail.png"
                  alt="blog-img"
                  className="mw-100"
                />
              </div>
              <div className="blogcontent-card__body">
                <div className="blogcontent-card__body--meta">
                  <a href="#" className="admmin">
                    <ReactSVG
                      src="./image/blog/admin.svg"
                      className="icon-d-block mb-1"
                      alt="icon"
                    />
                    <span>Admin</span>
                  </a>
                  <a href="#" className="date">
                    <ReactSVG
                      src="./image/blog/clender.svg"
                      className="icon-d-block mb-1"
                      alt="icon"
                    />
                    <span>17 July, 2021</span>
                  </a>
                  <a href="#" className="comment">
                    <ReactSVG
                      src="./image/blog/comment.svg"
                      className="icon-d-block mb-1"
                      alt="icon"
                    />
                    <span>5 Comments</span>
                  </a>
                </div>
                <div className="blogcontent-card__body--texts">
                  <h6>Governing Cyberspace during a Crisis in Trust</h6>
                  <p className="text-dark">
                    It is almost impossible to read the news without coming
                    across a lead story cataloguing the latest cyber breach or
                    misuse of data. Intellectual property is being stolen from
                    companies at an alarming rate. Foreign actors are meddling
                    in elections. Criminals use the dark recesses of the
                    internet to sell drugs, guns and even people. The volume of
                    these events lays bare the paradox of the digital economy
                    and cyber security. On one hand, technology has led to
                    convenience, efficiency and wealth creation. On the other
                    hand, this great push to digitize society has meant building
                    inherent vulnerability into the core of the economic taking
                    place atop a deeply fragmented and underdeveloped system of
                    global rules.
                  </p>
                </div>
                <div className="blogcontent-card__body--texts">
                  <h6>The essentials of cybersecurity solutions</h6>
                  <p className="text-dark">
                    It is almost impossible to read the news without coming
                    across a lead story cataloguing the latest cyber breach or
                    misuse of data. Intellectual property is being stolen from
                    companies at an alarming rate. Foreign actors are meddling
                    in elections. Criminals use the dark recesses of the
                    internet to sell drugs, guns and even people. The volume of
                    these events lays bare the paradox of the digital economy
                    and cyber security. On one hand, technology has led to
                    convenience, efficiency and wealth creation. On the other
                    hand, this great push to digitize society has meant building
                    inherent vulnerability into the core of the economic taking
                    place atop a deeply fragmented and underdeveloped system of
                    global rules.
                  </p>
                </div>
                <div className="blogcontent-card__body--lists">
                  <h6>Major elements that we offer:</h6>
                  <ul className="p-0 m-0">
                    <li>The need to make tough decisions as a company grows</li>
                    <li>
                      Why people are more important than technology in any
                      company
                    </li>
                    <li>
                      The importance of video calls in building team
                      connectivity
                    </li>
                    <li>
                      The role of engagement in a company’s culture and why it’s
                      key to success
                    </li>
                  </ul>
                </div>
                <div className="blogcontent-card__body--social">
                  <h6>Share:</h6>
                  <ul>
                    <li>
                      <a href="https://www.instagram.com/">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="blogcontent-buttons">
              <div className="blogcontent-buttons__button blogcontent-buttons__previous">
                <div className="tag">
                  <span>Previous:</span>
                </div>
                <a href="#">
                  <div className="prev-content">
                    <div className="prev-content__arrow">
                      <ReactSVG
                        src="./image/blog/previous.svg"
                        alt="arrow"
                      />
                    </div>
                    <p className="prev-content__text text-dark">
                      Why a free afternoon each week can
                      <br /> boost employees’ sense.
                    </p>
                  </div>
                </a>
              </div>
              <div className="blogcontent-buttons__button blogcontent-buttons__next text-end">
                <div className="tag">
                  <span>Next:</span>
                </div>
                <a href="#">
                  <div className="next-content">
                    <div className="next-content__arrow">
                      <ReactSVG src="./image/blog/previous.svg"
                        alt="arrow"
                      />
                    </div>
                    <h6 className="next-content__text text-dark">
                      The 7 things Biden should do first <br /> to tackle
                      climate change.
                    </h6>
                  </div>
                </a>
              </div>
            </div>
            <div className="blogcontent-comment">
              <div className="blogcontent-comment__content">
                <h6 className="title">Comments:</h6>
              </div>
              <div className="comment-card-01">
                <div className="comment-card-01--img">
                  <img src="./image/blog/client-1.png" alt="client" />
                </div>
                <div className="comment-card-01__body">
                  <p className="comment-card-01__body--text text-dark">
                    Leading an organization is incredibly rewarding and equally
                    humbling. <br className="d-none d-xl-block" /> Confidence
                    and humility. Every success is rewarding.
                  </p>
                  <div className="comment-card-01__body--info">
                    <div className="data">
                      <h6 className="name">- Marvin McKinney</h6>
                      <span className="date">May 28, 2021</span>
                    </div>
                    <div className="texts">
                      <a href="#" className="text-dark">
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border mt-5 mb-5 mt-lg-6 mb-lg-6" />
              <div className="comment-card-01">
                <div className="comment-card-01--img">
                  <img src="./image/blog/client-2.png" alt="client" />
                </div>
                <div className="comment-card-01__body">
                  <p className="comment-card-01__body--text text-dark">
                    Leading an organization is incredibly rewarding and equally
                    humbling. <br className="d-none d-xl-block" /> Confidence
                    and humility. Every success is rewarding.
                  </p>
                  <div className="comment-card-01__body--info">
                    <div className="data">
                      <h6 className="name">- Savan Nguyen</h6>
                      <span className="date">May 27, 2021</span>
                    </div>
                    <div className="texts">
                      <a href="#" className="text-dark active">
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="comment-card-02">
                <div className="comment-card-02--img">
                  <img src="./image/blog/client-3.png" alt="client" />
                </div>
                <div className="comment-card-01__body">
                  <p className="comment-card-02__body--text text-dark">
                    Leading an organization is incredibly rewarding and
                    <br className="d-none d-xl-block" /> humility. Every success
                    is rewarding..
                  </p>
                  <div className="comment-card-02__body--info">
                    <div className="data">
                      <h6 className="name">- Jerom Max</h6>
                      <span className="date">May 28, 2021</span>
                    </div>
                    <div className="texts">
                      <a href="#" className="text-dark">
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="blogcontent-from">
              <div className="blogcontent-from__content">
                <h6 className="title">Leave a comment</h6>
                <p className="text text-dark">
                  Your email address will not be published*
                </p>
              </div>
              <form action="#" className="from">
                <div className="from__input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="from__input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="from__input-group">
                  <textarea
                    className="from__input-group--box"
                    cols={30}
                    rows={10}
                    placeholder="Write your comment"
                    defaultValue={""}
                  />
                </div>
                <a href="#" className="btn btn-primary  btn-primary-hvr">
                  Submit
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetails;
