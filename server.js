import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { Contact } from './models.js';
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.ORIGIN,
}));
app.use(express.json());

connect(process.env.MONGODB_URI
//   , {useNewUrlParser: true,
//     useUnifiedTopology: true,
// }
)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

app.post('/api/submit-contactUs', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'anaushad246@gmail.com',
      subject: 'THEW New Form Submission',
      text: `New Contact: ${JSON.stringify(newContact, null, 2)}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error while sending email');
      } else {
        res.send('Form submitted successfully and email sent to admin');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting form: ' + error.message);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});