import React from "react";
import BlogSideBar from "~components/lib/Blog/BlogSideBar";
import BlogCard from "~components/lib/Card/BlogCard";
import data from "./data";
const Blog = () => {
  return (
    <div className="blogcontent-section-01">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-5">
            <BlogSideBar />
          </div>
          <div className="col-xl-8 col-lg-7">
            <div className="row widgets-row">
              {data.map(({ image, title, text, meta, date, id }) => {
                return (
                  <div className="col-md-6" key={id}>
                    <BlogCard
                      image={image}
                      title={title}
                      text={text}
                      meta={meta}
                      date={date}
                    />
                  </div>
                );
              })}
            </div>
            <div className="blogcontent-section-01__pagination">
              <ul className="pagination m-0 p-0">
                <li className="page-item previous">
                  <a href="#">
                    <i className="fas fa-chevron-left" />
                  </a>
                </li>
                <li className="page-item active">
                  <a href="#">1</a>
                </li>
                <li className="page-item">
                  <a href="#">2</a>
                </li>
                <li className="page-item">
                  <a href="#">3</a>
                </li>
                <li className="page-item next">
                  <a href="#">
                    <i className="fas fa-chevron-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
