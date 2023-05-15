import React from "react"
// import {RatingWrapper,Star} from "./style"

const RatingWidget = ({star=5,className="client-info--rating list-unstyled d-flex",...props}) => {
  return (
    <ul className={className} {...props}>
      {Number(star) <= 5 ? (
          <>
          {Array.from(Array(Number(star)), (_, index) => {
            return (
              <li key={index + 'fs'}><i className="fas fa-star" ></i></li>
            )
          })}
          {Array.from(Array(5 - Number(star)), (_, index) => {
            return (
              <li key={index + 'es'}><i className="fas fa-star" ></i></li>
            )
          })}
          </>
      ) : null}

    </ul>
  )
}

export default RatingWidget
