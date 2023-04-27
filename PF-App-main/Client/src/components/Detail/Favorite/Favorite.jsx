import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";

const Favorite = ({ userId, productId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await axios.delete("user/fav", { data: { userId, productId } });
        setIsFavorite(false);
      } else {
        await axios.post("user/fav", { userId, productId });
        setIsFavorite(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const handleUserFavorite = async () => {
      try {
        const response = await axios.get(`user/fav/${userId}`);
        const isProductFavorite = response.data.some(
          (product) => product.Favorites && product.Favorites.ProductId === productId
        );
        setIsFavorite(isProductFavorite);
      } catch (error) {
        throw new Error(error);
      }
    };
    handleUserFavorite();
  }, []);

  return (
    <div>
      {isFavorite ? (
        <MdFavorite size={30} color="#4a90e2" className="favorite" onClick={handleFavoriteClick} />
      ) : (
        <MdOutlineFavoriteBorder size={30} color="#4a90e2" className="favorite" onClick={handleFavoriteClick} />
      )}
    </div>
  );
};

export default Favorite;
