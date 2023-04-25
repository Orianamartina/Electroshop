import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./stars.scss";

const Stars = ({ rating, editable, setUserReviews, userReviews }) => {
  const [hover, setHover] = useState(null);

  const handleStarClick = (ratingValue) => {
    setUserReviews({ ...userReviews, rating: ratingValue });
    setHover(ratingValue);
  };

  const ratingRounded = Math.round(rating);

  return (
    <div className="reviews-stars">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            {editable ? (
              <FaStar
                className="star"
                color={ratingValue <= (hover || ratingRounded) ? "#3483fa" : "#c5dafa"}
                size={16}
                onClick={() => handleStarClick(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            ) : (
              <FaStar className="star" color={ratingValue <= ratingRounded ? "#3483fa" : "#c5dafa"} size={16} />
            )}
          </label>
        );
      })}{" "}
      {rating > 0 ? <p>({Number.isInteger(rating) ? rating : rating.toFixed(1)})</p> : <p>(0)</p>}
    </div>
  );
};

export default Stars;
