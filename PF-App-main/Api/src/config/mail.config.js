const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const EMAIL = process.env.EMAIL;
const EMAIL_PSSWRD = process.env.EMAIL_PSSWRD;

const mail = {
  user: EMAIL,
  pass: EMAIL_PSSWRD,
};

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  tls: {
    rejectUnauthorized: false,
  },
  secure: true, // true for 465, false for other ports
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass, // generated ethereal password
  },
});

module.exports = {
  sendEmail: async (email, subject, html) => {
    try {
      await transporter.sendMail({
        from: `${mail.user}`,
        to: email,
        subject,
        text: "Welcome to Electro Shop",
        html,
      });
    } catch (error) {
      console.log("Something went wrong with your email", error);
    }
  },
  sendStatusEmail: async (email, subject, html) => {
    try {
      await transporter.sendMail({
        from: `${mail.user}`,
        to: email,
        subject,
        text: "IMPORTANT INFORMATION FOR YOU",
        html,
      });
    } catch (error) {
      console.log("Something went wrong with your email", error);
    }
  },

  getTemplate: (email, token) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
          <h2>Hola ${email}</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="http://localhost:3001/user/confirm/${token}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
  },
  templateChangePassword: (email, token) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
              <h2>Hola ${email}</h2>
              <p>Has realizado un cambio de contraseña en ElectroShop. Si tu no realizaste esta acción, ignora este mensaje.</p>
              <a
                  href="http://localhost:3001/user/confirmchange/${token}"
                  target="_blank"
              >Confirma el cambio de tu contraseña</a>
          </div>
        `;
  },
  templateAdminInvitation: (email, token) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
              <h2>Hola ${email}</h2>
              <p>Has sido invitado a formar parate del equipo administrativo de Electro Shop</p>
              <a
                  href="http://localhost:3000/user/login"
                  target="_blank"
              >Te invitamos a iniciar sesión</a>
          </div>
        `;
  },
  templateAdminSuspension: (email, sender) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
              <h2>Hola ${email}</h2>
              <p>Te comunicamos que tu permanencia en el equipo administrativo de Electro Shop ha sido revocada. Para más información comunicate con nosotros a ${sender}</p>
              <a
                  href="http://localhost:3000"
                  target="_blank"
          </div>
        `;
  },
  templateSuspensiónDeCuenta: (email, sender) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
              <h2>Hola ${email}</h2>
              <p>Este este email te ha sido enviado porque tu cuenta en ElectroShop ha sido suspendida.
              Para más información comunicate con nosotros a ${sender}</p>
              
          </div>
        `;
  },
  templateRehabilitacionDeCuenta: (email, sender) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
              <h2>Hola ${email}</h2>
              <p>Este este email te ha sido enviado porque tu cuenta en ElectroShop ha sido restaurada.
              Para más información comunicate con nosotros a ${sender}</p>
              
          </div>
        `;
  },
  templateEliminacionDeCuenta: (email, sender) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
              <h2>Hola ${email}</h2>
              <p>Lamentamos verte partir. Si tu no has realizado esta acción o si tienes alguna sugerencia para hacernos y así tenerte de vuelta, te pedimos que nos escribas a ${sender}</p>
              
          </div>
        `;
  },

  getForgotPassTemplate: (email, token) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
              <h2>Hola ${email}</h2>
              <p>Para establecer una nueva contraseña has click en el siguiente enlace</p>
              <a
                  href="http://localhost:3001/pasword/reset/${token}"
                  target="_blank"
              >Establecer nueva contraseña</a>
          </div>
        `;
  },
};
