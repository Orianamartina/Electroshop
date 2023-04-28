import React, { useEffect, useRef, useState } from "react";
import "./chatBot.scss";
import "bootstrap";
import { v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  type: "bot" | "user";
  text: React.ReactNode;
};

type AnswerType = {
  [key: string]: JSX.Element;
};

const ANSWER: AnswerType = {
  Intro: <p>Hola soy un bot que trabaja para ElectroShop</p>,
  Info: (
    <p>
      Esta es una página de venta de productos relacionados con la computación
    </p>
  ),
  Compra: (
    <p>
      ¿Deseas realizar una compra? Por favor, agregue su producto al carrito, y
      puede comprarlo a través de mercado pago.
    </p>
  ),
  Usuario: (
    <p>
      Como usuario puedes loguearte a través del register, o el login de Google.
      Además, puedes ver y comprar los productos con los que cuenta la página
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
  { text: "Quien sos?", label: "Info" },
  { text: "Que haces ?", label: "Info" },
  { text: "Cual es tu funcion ?", label: "Info" },
  { text: "Necesito ayuda", label: "Info" },
  { text: "Como puedo comprar?", label: "Compra" },
  { text: "Con que puedo comprar", label: "Compra" },
  { text: "que puedo hacer como usuario", label: "Usuario" },
  { text: "que puedo hacer en la pagina", label: "Usuario" },
  { text: "Cuanto el gramo ?", label: "Default" },
  { text: "No entiendo", label: "Default" },
  { text: "Por favor, explique más", label: "Default" },
];

const API_KEY = "S0c4u1GPWX3hv3wubaq3moRVGvqzTE5ELugSxCbw";

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      type: "bot",
      text: "Hola, soy un bot que trabaja para ElectroShop",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    setMessages((messages) =>
      messages.concat({ id: uuidv4(), type: "user", text: question })
    );

    setQuestion("");

    const { classifications } = await fetch("https://api.cohere.ai/v1/classify", {
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
    }).then((res) => res.json());
    setMessages((messages) =>
      messages.concat({
        id: String(Date.now()),
        type: "bot",
        text: ANSWER[classifications[0].prediction as keyof typeof ANSWER] || ANSWER["Default"],
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    container.current?.scrollTo(0, container.current.scrollHeight);
  }, [messages]);

  return (
    <div>
      <div className="caja-chat">
        <div ref={container} className="chat">
          {messages.map((message) => (
            <div
              className={`chat-text ${
                message.type === "bot"
                  ? "bg-primary rounded-pill me-auto text-light"
                  : "bg-info rounded-pill ms-auto"
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
            className={'chat-btn ${loading ? "bg-primary":"bg-info"}'}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatBot;
