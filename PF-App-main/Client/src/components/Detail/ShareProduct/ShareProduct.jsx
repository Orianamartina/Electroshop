import React from "react";
import { FacebookShareButton, WhatsappShareButton, TelegramShareButton } from "react-share";
import { FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";

const ShareProduct = ({ id, name, image }) => {
  const shareImage = image;
  const shareUrl = `https://electroshop-delta.vercel.app/detail/${id}`;
  const shareText = `Hola, te quiero compartir este producto que acabo de encontrar en Electroshop. Se trata de ${name}.
  
  `;

  return (
    <div className="share">
      <h4>Compartir en:</h4>
      <div className="share-icons">
        <WhatsappShareButton url={shareUrl} title={shareText} media={shareImage}>
          <FaWhatsapp size={30} color="#1bd741" />
          <span className="share-tooltip">WhatsApp</span>
        </WhatsappShareButton>
        <FacebookShareButton url={shareUrl} quote={shareText} hashtag="#electroshop" media={shareImage}>
          <FaFacebook size={30} color="#1877F2" />
          <span className="share-tooltip">Facebook</span>
        </FacebookShareButton>
        <TelegramShareButton url={shareUrl} title={shareText} media={shareImage}>
          <FaTelegram size={30} color="#29aaea" />
          <span className="share-tooltip">Telegram</span>
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default ShareProduct;
