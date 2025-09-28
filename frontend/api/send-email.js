import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { subject, name, email, message } = req.body;

  if (!subject || !name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `'${name}' < ${email} >`,
    to: process.env.GMAIL_USER,
    subject: `[Portfolio] ${subject}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Asunto: ${subject}
      Mensaje: ${message}
    `,
    html: `
      <h2>Nuevo mensaje desde el Portfolio</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ succes: true });
  } catch (error) {
    res.status(500).json({ error: 'Error enviando el correo' });
  }
}
