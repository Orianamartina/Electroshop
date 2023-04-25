import React, { useState, useEffect } from "react";
import axios from "axios";
import "./reviews.scss";
import Stars from "./Stars";

const Reviews = ({ userId, productId }) => {
  const [reviews, setReviews] = useState([]);
  const [userReviews, setUserReviews] = useState({ rating: 0, text: "" });
  const [numReviewsToShow, setNumReviewsToShow] = useState(5);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const getProductReviews = async () => {
    try {
      const response = await axios.get(`review/product/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddReview = async () => {
    if (!userReviews.rating) return alert("Debes seleccionar una calificación");
    if (!userReviews.text) return alert("Debes escribir una reseña");

    try {
      await axios.post("review/", {
        userId,
        text: userReviews.text,
        rating: userReviews.rating,
        ProductId: productId,
      });
      setUserReviews({ rating: 0, text: "" });
      getProductReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowMoreReviews = () => {
    setNumReviewsToShow(numReviewsToShow + 5);
    setShowAllReviews(true);
  };

  const handleShowLessReviews = () => {
    setNumReviewsToShow(5);
    setShowAllReviews(false);
  };

  useEffect(() => {
    getProductReviews();
  }, []);

  return (
    <div className="reviews">
      <div className="form-reviews">
        <h4>Deja tu opinión sobre el producto</h4>
        <Stars rating={userReviews.rating} editable={true} setUserReviews={setUserReviews} userReviews={userReviews} />
        <div className="reviews-comment">
          <textarea
            className="reviews-textarea"
            placeholder="Escribe tu reseña"
            rows="3"
            cols="40"
            maxLength="200"
            value={userReviews.text}
            onChange={(e) => setUserReviews({ ...userReviews, text: e.target.value })}
          />
          <button className="reviews-button" onClick={handleAddReview}>
            Enviar
          </button>
        </div>
      </div>
      {reviews.length > 0 && (
        <div className="product-reviews">
          <h4>Opiniones del producto</h4>
          {reviews.slice(0, numReviewsToShow).map((review) => (
            <div className="product-review" key={review.id}>
              <Stars rating={review.rating} editable={false} />
              <p className="product-review-comment">{review.text}</p>
            </div>
          ))}
          {reviews.length > numReviewsToShow && !showAllReviews && (
            <button onClick={handleShowMoreReviews}>Mostrar más</button>
          )}
          {reviews.length > 5 && showAllReviews && <button onClick={handleShowLessReviews}>Mostrar menos</button>}
        </div>
      )}
    </div>
  );
};

export default Reviews;
