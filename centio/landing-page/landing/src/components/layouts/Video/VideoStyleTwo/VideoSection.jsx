import React from "react";
import Video from "~components/Core/VideoModal";

export default function VideoSection() {
  return (
    <div
      className="video-section-02"
      style={{ backgroundImage: "url(./image/home-5/video.png)" }}
    >
      <div className="container">
        <div className="video-block">
          <Video
            id="=LWZ7iytIA6k"
            className="video-btn popup-btn video-btn-1 text-secondary bg-white"
          >
            <i className="fas fa-play text-primary" />
          </Video>
          <p className="heading-light video-block--text">
            Watch a Quick Tutorial
          </p>
        </div>
      </div>
    </div>
  );
}
