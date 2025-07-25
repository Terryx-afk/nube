const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aquituariterry@gmail.com',
    pass: 'tbqx zyjt kvov sjox' 
  }
});

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Recibida peticion:', req.body);

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'terrixito_tuchikito23@hotmail.com',
      subject,
      text: message,
      html: `<p>${message}</p>`
    });
    console.log('Correo Enviado exiotosamente', req.body);
    res.json({ message: '¡Mensaje enviado correctamente!' });
  } catch (error) {
    console.error('Error al enviar',error);
    res.status(500).json({ message: 'Error al enviar el mensaje.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});