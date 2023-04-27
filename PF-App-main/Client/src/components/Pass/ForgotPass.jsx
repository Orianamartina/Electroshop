import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const secret = "forgot"


export default function ForgotPass() {

  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword:""
  });
  const [isLoading, setLoading] = useState(false);


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    }
  const payload = {
    email: input.email,
    password: input.password
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('password/reset', payload)
    toast.info(
      "Revisa tu email para confirmar el cambio"
    );

    setInput({
      email: "",
      password: "",
      confirmPassword:""
    });
    
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  const handleCheck = () => {
    if(input.password !== input.confirmPassword){
      return true
    }else{
      return false
    }
  }
  if(id){
    useEffect(() => {
        navigate("/home");;
    },[])
  }
  
    return (
      <>
        <p>Ingresa tu email y una nueva contraseña. Luego recibiras un correo electrónico para confirmar esta acción</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>email</label>
            <input
              type="text"
              value={input.email}
              placeholder="Enter your email"
              name="email"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Ingresa tu nueva contraseña</label>
            <input
              type="password"
              value={input.password}
              placeholder="Ingresa una nueva contraseña"
              name="password"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Repite la contraseña</label>
            <input
              type="password"
              value={input.confirmPassword}
              placeholder="Ingresa una nueva contraseña"
              name="confirmPassword"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" disabled={handleCheck()}> Enviar</button>
        </form>
      </>
    );
}