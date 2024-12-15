// server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configurer le transporteur d'email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Définir une route pour l'envoi de l'email

app.post( "/sendEmailPortfolio",async(req,res)=> {
  const {client,messageClient}=req.body;

  const mailOptionsClient = {
    from: 'andriamalazarodin@gmail.com',
    to: client,
    subject: 'Merci pour votre message !',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 15px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <h2 style="color: #1a73e8; margin-bottom: 20px;">Merci pour votre message !</h2>
        <p style="font-size: 16px; color: #555;">Bonjour,</p>
        <p style="font-size: 14px; color: #666;">Nous avons bien reçu votre message :</p>
        <blockquote style="background-color: #ffffff; padding: 15px; border-left: 4px solid #1a73e8; margin: 15px auto; font-style: italic; color: #555; border-radius: 10px; display: inline-block; text-align: center;">
          ${messageClient}
        </blockquote>
        <p style="font-size: 14px; color: #666;">Nous vous répondrons dans les meilleurs délais.</p>
        <p style="font-size: 14px; color: #666;">En attendant, découvrez mes projets et compétences sur mon portfolio.</p>
        <div style="margin-top: 30px;">
          <a href="https://votreportfolio.com"
             style="background-color: #1a73e8; color: #fff; padding: 12px 20px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; display: inline-block;">
            Visiter Mon Portfolio
          </a>
        </div>
        <p style="font-size: 14px; color: #555; margin-top: 30px;">Cordialement,<br><span style="font-weight: bold;">Rodin</span></p>
      </div>
    `
  };

  const mailOptionsCopie = {
    from: 'andriamalazarodin@gmail.com',
    to: 'andriamalazarbn@gmail.com', // Adresse secondaire
    subject: 'Nouveau message client reçu',
    text: `Un client a envoyé un message : \n\n${messageClient}\n\nDe : ${client}`
  };

  try {
    // Envoi du message au client
    await transporter.sendMail(mailOptionsClient);
    console.log('Message envoyé au client');

    // Envoi de la copie à l’adresse secondaire
    await transporter.sendMail(mailOptionsCopie);
    console.log('Message copié vers l’adresse secondaire');

    // Réponse au frontend
    res.status(200).json({ message: 'Les emails ont été envoyés avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l’envoi d’e-mails :', error);
    res.status(500).json({ message: 'Erreur lors de l’envoi des emails.' });
  }
});


app.get("/notifiactionFolio", async(req,res)=> {

  const mailOptionsConsulation = {
    from: 'andriamalazarodin@gmail.com',
    to: 'andriamalazarbn@gmail.com', // Adresse secondaire
    subject: 'Consultation',
    text: `Nouvelle consulation`
  };

  try {
    // Envoi du message au client
    await transporter.sendMail(mailOptionsConsulation);
    console.log('Message envoyé au client');

    // Réponse au frontend
    res.status(200).json({ message: 'Consulatation de mon portfolio.' });
  } catch (error) {
    console.error('Erreur lors de l’envoi d’e-mails :', error);
    res.status(500).json({ message: 'Erreur lors de l’envoi des emails.' });
  }
});


app.get("",(req,res)=> {
  res.json({salut:"bienvenue"})
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

  console.log(`Serveur lancé sur le port ${PORT}`);

});
