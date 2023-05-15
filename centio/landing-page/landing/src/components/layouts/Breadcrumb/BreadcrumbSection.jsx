import React from "react";
import { SuperTag } from "~components/Core";

const textDefault =
  "An enim nullam tempor sapien gravida donec enim ipsum <br className='d-none d-xl-block' /> porta justo congue purus pretium ligula";
const columnDefault = "col-xl-8 col-lg-8 col-md-10 col-sm-11 col-xs-11";

const Breadcrumb = ({
  column = columnDefault,
  activePage,
  title,
  text = textDefault,
}) => {
  return (
    <div className="breadcrumb-section">
      <div className="breadcrumb-section__bg-shape">
        <img
          src="./image/breadcrumb/breadcrumb-shape.png"
          alt="breadcrumb-shape"
        />
      </div>
      <div className="breadcrumb-section__shape-1 floating-Y-animation-reverse">
        <img
          src="./image/breadcrumb/shape-1.svg"
          className="make-it-inline w-100"
          alt="breadcrumb-shape"
        />
      </div>
      <div className="breadcrumb-section__shape-2 circle-animation">
        <img
          src="./image/breadcrumb/shape-2.svg"
          className="make-it-inline w-100"
          alt="breadcrumb-shape"
        />
      </div>
      <div className="breadcrumb-section__shape-3  floating-Y-animation-02">
        <img
          src="./image/breadcrumb/shape-3.svg"
          className="make-it-inline w-100"
          alt="breadcrumb-shape"
        />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className={column}>
            <div className="breadcrumb-section__content hero-content text-center">
              <h1 className="heading-light title mb-20">{title}</h1>
              <p className="text-light">
                <SuperTag value={text} />
              </p>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item" aria-current="page">
                    {activePage}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
