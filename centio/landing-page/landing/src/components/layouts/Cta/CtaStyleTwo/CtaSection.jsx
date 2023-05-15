import React from "react";

const CtaSection = () => {
  return (
   <div className="cta-section-02 bg-gradient-primary-secondary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10 col-lg-9 col-md-9 col-xs-11">
            <div className="block-title text-center">
              <h2 className="title heading-light">Join of our community of 10,0000 users of the world’s leading
                organizations</h2>
            </div>
            <form action="/" className="form-subscribe-inline--01 cta-section-02__newsletter">
              <input type="email" placeholder="Enter your email" className="form-control" />
              <button className="btn btn-secondary btn-secondary-hvr">Subscribe Now</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CtaSection;
