import React, { useState, useRef, useEffect } from "react";

const Countdown = ({
  className = "comingsoon-section-01__content--counter",
}) => {
  const [countDays, setCountDays] = useState("00");
  const [countHours, setCountHours] = useState("00");
  const [countMinutes, setCountMinutes] = useState("00");
  const [countSeconds, setCountSeconds] = useState("00");

  let interval = useRef();
  const startTimer = ({ yearTrget, monthTrget, dayTrget }) => {
    const countdowndate = new Date(
      `${yearTrget},${monthTrget},${dayTrget},  00:00:00`
    ).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdowndate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        //update Timer
        setCountDays(days);
        setCountHours(hours);
        setCountMinutes(minutes);
        setCountSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    let intervalClean = interval.current;
    startTimer({ yearTrget: "2021", monthTrget: "08", dayTrget: "31" });
    return () => {
      clearInterval(intervalClean);
    };
  });
  return (
    <div className={className} id="countdown">
      <div className="col-xs-6 col-sm-3 animated rotateIn" id="days">
        <div className="wrapper">
          <span className="time">{countDays}</span>
          <span className="label">days</span>
        </div>
      </div>
      <div className="col-xs-6 col-sm-3 animated rotateIn" id="days">
        <div className="wrapper">
          <span className="time">{countHours}</span>
          <span className="label">hours</span>
        </div>
      </div>
      <div className="col-xs-6 col-sm-3 animated rotateIn" id="days">
        <div className="wrapper">
          <span className="time">{countMinutes}</span>
          <span className="label">minutes</span>
        </div>
      </div>
      <div className="col-xs-6 col-sm-3 animated rotateIn" id="days">
        <div className="wrapper">
          <span className="time">{countSeconds}</span>
          <span className="label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
