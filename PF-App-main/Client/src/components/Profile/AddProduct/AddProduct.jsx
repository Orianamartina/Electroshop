import React, { useState } from "react";
import "./addProduct.scss";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    description: "",
    stock: "",
    category: "",
  });

  const [isLoading, setLoading] = useState(false);

  const API_URL = "products";

  // Cloudinary
  var uploadedImage = "";
  const uploadImage = (e) => {
    const data = new FormData();

    data.append("file", e.target.files[0]);
    data.append("upload_preset", "uq7hpsv9");

    axios
      .post("https://api.cloudinary.com/v1_1/dlzp43wz9/image/upload", data)
      .then((response) => {
        console.log(response);
        uploadedImage = response.data.secure_url;
        console.log(uploadedImage);
        setFormData({
          ...formData,
          image: uploadedImage,
        });
      });
  };
  ///////////

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(API_URL, formData);
      if (response) {
        toast.success("Producto agregado exitosamente");
      }
    } catch (error) {
      toast.error("Error al agregar el producto");
      throw new Error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="add-product">
      <h2>Agregar Productos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen:</label>

          <input
            type="file"
            name="image"
            id="image"
            placeholder=""
            value={uploadedImage}
            onChange={uploadImage}
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Marca:</label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Cantidad en Stock:</label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group form-group-description">
          <label htmlFor="description">Descripción:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="preview">
          <img src={formData.image} alt="Upload Image" width={"100px"} />
          Preview
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <BeatLoader color={"#ffffff"} size={7} />
          ) : (
            "Agregar Producto"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
