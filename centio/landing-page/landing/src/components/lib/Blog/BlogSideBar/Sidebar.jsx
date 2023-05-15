import React from "react";
import { Link } from "~components/Core";

const Sidebar = () => {
  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar--searchbox">
        <input
          className="form-control"
          type="text"
          placeholder="Type to search..."
        />
        <div className="icon">
          <img src="./image/blog/search.svg" alt="search-icon" />
        </div>
      </div>
      <div className="blog-sidebar--tab">
        <h4 className="title">Blog Categories</h4>
        <ul className="nav flex-column nav-pills">
          <li className="nav-item">
            <Link to="/blog-details">Development (15)</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog-details">Website Construction (08)</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog-details">Cyber Security (20)</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog-details">Virtual Assistant (07)</Link>
          </li>
        </ul>
      </div>
      <div className="blog-sidebar--posts">
        <h4 className="title">Recent Posts</h4>
        <a href="#" className="post-blogs">
          <div className="post-blogs--img">
            <img src="./image/blog/small-blog-1.png" alt="blog-img" />
          </div>
          <div className="post-blogs--texts">
            <h6 className="text-dark">
              Don’t Count on Freeto Win You Customers
            </h6>
            <span className="text-dark">July 02, 2021</span>
          </div>
        </a>
        <a href="#" className="post-blogs">
          <div className="post-blogs--img">
            <img src="./image/blog/small-blog-2.png" alt="blog-img" />
          </div>
          <div className="post-blogs--texts">
            <h6 className="text-dark">
              Is Your Organization Building Bridges?
            </h6>
            <span className="text-dark">June 07, 2021</span>
          </div>
        </a>
        <a href="#" className="post-blogs">
          <div className="post-blogs--img">
            <img src="./image/blog/small-blog-3.png" alt="blog-img" />
          </div>
          <div className="post-blogs--texts">
            <h6 className="text-dark">
              What Makes a Degree Review Successful?
            </h6>
            <span className="text-dark">May 28, 2021</span>
          </div>
        </a>
        <a href="#" className="post-blogs">
          <div className="post-blogs--img">
            <img src="./image/blog/small-blog-4.png" alt="blog-img" />
          </div>
          <div className="post-blogs--texts">
            <h6 className="text-dark">
              Getting Your Team to Buy into a Big Change
            </h6>
            <span className="text-dark">March 03, 2021</span>
          </div>
        </a>
      </div>
      <div className="blog-sidebar--tags">
        <h4 className="title">Tags</h4>
        <div className="tag">
          <a className="tag-item active" href="#">
            Cyber security
          </a>
          <a className="tag-item" href="#">
            Hacker
          </a>
          <a className="tag-item" href="#">
            Blockchain
          </a>
          <a className="tag-item" href="#">
            News
          </a>
          <a className="tag-item" href="#">
            Password
          </a>
          <a className="tag-item" href="#">
            Security
          </a>
          <a className="tag-item" href="#">
            SafetySupport
          </a>
          <a className="tag-item" href="#">
            Service
          </a>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
