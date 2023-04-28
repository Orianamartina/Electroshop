import React, { useState, useEffect } from "react";
import "./favorites.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";

const Favorites = () => {
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const [favorites, setFavorites] = useState([]);

  const getFavoriteProducts = async () => {
    try {
      const response = await axios.get(`user/fav/${id}`);
      setFavorites(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  const handleDeleteFavorite = async (productId) => {
    try {
      await axios.delete("user/fav", { data: { userId: id, productId } });
      getFavoriteProducts();
    } catch (error) {
      console.error("Error al eliminar el producto favorito:", error);
    }
  };

  useEffect(() => {
    getFavoriteProducts();
  }, []);

  return (
    <>
      {favorites.length === 0 ? (
        <div className="empty">
          <h2>No tienes productos favoritos</h2>
          <Link to="/home">Ir a la tienda</Link>
        </div>
      ) : (
        <div className="favorites">
          <h2>Favoritos</h2>
          {favorites.map((favorite) => (
            <div className="favorite" key={favorite.Favorites.ProductId}>
              <img src={favorite.image} alt="" />
              <Link to={`/detail/${favorite.Favorites.ProductId}`}>
                {favorite.name}
              </Link>

              <div
                onClick={() =>
                  handleDeleteFavorite(favorite.Favorites.ProductId)
                }
              >
                <MdFavorite size={30} color="#4a90e2" className="favorite-icon" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favorites;
