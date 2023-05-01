import React, { useEffect, useRef, useState } from "react";
import "./chatBot.scss";
import "bootstrap";
import { v4 as uuidv4 } from "uuid";
import { RxCross1 } from "react-icons/rx";
import { BsFillChatDotsFill } from "react-icons/bs";

type Message = {
  id: string;
  type: "bot" | "user";
  text: React.ReactNode;
};

type AnswerType = {
  [key: string]: JSX.Element;
};

const ANSWER: AnswerType = {
  Intro: (
    <p>
      Soy el bot de ElectroShop, aquí para ayudarte en todo lo que necesites en
      nuestra tienda en línea de electrónica y tecnología. Desde la búsqueda
      hasta el envío, facilito tu experiencia de compra. Si tienes alguna
      pregunta, no dudes en preguntarme. ¡Estoy aquí para ayudarte a tener una
      experiencia de compra excepcional en ElectroShop!
    </p>
  ),
  Info: (
    <p>
      Bienvenido/a a nuestra tienda en línea de tecnología. Ofrecemos una amplia
      variedad de productos de alta calidad relacionados con la computación.
      Todos nuestros productos cuentan con garantía. ¡Explora nuestro catálogo y
      encuentra todo lo que necesitas para mejorar tu experiencia tecnológica!
    </p>
  ),
  Compra: (
    <p>
      ¿Deseas realizar una compra? Agrega el producto que deseas al carrito y
      podrás comprarlo fácilmente a través de MercadoPago, una plataforma de
      pago segura y confiable.
    </p>
  ),
  Usuario: (
    <p>
      Como usuario registrado en la página, tienes dos opciones para iniciar
      sesión: puedes hacerlo a través de un registro básico en la página o
      utilizando tu cuenta de Google. Una vez que hayas iniciado sesión, tendrás
      acceso completo a la tienda virtual y podrás ver todos los productos
      disponibles para la compra. Además, tendrás la capacidad de agregar
      productos a tu carrito de compras, realizar transacciones de pago seguras
      y hacer seguimiento al estado de tus pedidos.
    </p>
  ),
  Default: <p>Lo lamento, no tengo respuesta ante esto</p>,
};

const EXAMPLES = [
  { text: "Hola", label: "Intro" },
  { text: "Buenas", label: "Intro" },
  { text: "Buenos Dias", label: "Intro" },
  { text: "Buenas Tardes", label: "Intro" },
  { text: "Buenas Noches", label: "Intro" },
  { text: "Saludos", label: "Intro" },
  { text: "Que es Electroshop", label: "Info" },
  { text: "Para que sirve la pagina", label: "Info" },
  { text: "Cual es tu funcion ?", label: "Info" },
  { text: "Necesito ayuda", label: "Info" },
  { text: "Como puedo comprar?", label: "Compra" },
  { text: "Con que puedo comprar", label: "Compra" },
  { text: "Como pago?", label: "Compra" },
  { text: "que puedo hacer como usuario", label: "Usuario" },
  { text: "que puedo hacer en la pagina", label: "Usuario" },
  { text: "No se", label: "Default" },
  { text: "No entiendo", label: "Default" },
  { text: "Por favor, explique más", label: "Default" },
];

const API_KEY = "S0c4u1GPWX3hv3wubaq3moRVGvqzTE5ELugSxCbw";

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      type: "bot",
      text: "Hola en que puedo ayudarte",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showChatBot, setShowChatBot] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) {
      setLoading(false);
      return;
    }
    if (loading) return;
    setLoading(true);

    setMessages((messages) =>
      messages.concat({ id: uuidv4(), type: "user", text: question })
    );

    setQuestion("");

    const { classifications } = await fetch(
      "https://api.cohere.ai/v1/classify",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "large",
          inputs: [question],
          examples: EXAMPLES,
        }),
      }
    ).then((res) => res.json());
    setMessages((messages) =>
      messages.concat({
        id: String(Date.now()),
        type: "bot",
        text:
          ANSWER[classifications[0].prediction as keyof typeof ANSWER] ||
          ANSWER["Default"],
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    container.current?.scrollTo(0, container.current.scrollHeight);
  }, [messages]);

  const toggleChatBot = () => setShowChatBot(!showChatBot);
  const handleCloseChat = () => {
    setShowChatBot(false);
  };

  return (
    <div>
      <button className="button-chat" onClick={toggleChatBot}>
        <BsFillChatDotsFill size={30} />
      </button>
      {showChatBot && (
        <div className="caja-chat">
          <div className="chat-header">
            <h4>Atención al cliente</h4>
            <button className="close-button" onClick={handleCloseChat}>
              <RxCross1 />
            </button>
          </div>
          <div ref={container} className="chat">
            {messages.map((message) => (
              <div
                className={`chat-text ${
                  message.type === "bot"
                    ? "me-auto text-light "
                    : "bg-info text-light rounded-pill ms-auto"
                } d-inline-block mb-3`}
                key={message.id}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Hace tu pregunta"
              className="barra"
              type="text"
              name="question"
            />
            <button
              disabled={loading}
              className={`chat-btn ${loading ? "bg-secondary" : "bg-dark"}`}
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
