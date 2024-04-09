const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// تمرير خيارات لـ CORS middleware
const corsOptions = {
  origin: '*', // يمكنك تعيين النطاقات المسموح بها بدلاً من *
  methods: 'POST', // تحديد الطرق المسموح بها، يمكنك إضافة GET، PUT، DELETE، إلخ
  optionsSuccessStatus: 200 // تعيين رمز الحالة الناجحة للاستجابات الـ preflight
};

app.use(cors(corsOptions)); // استخدام middleware cors مع الخيارات المحددة

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'homos.kitsaway@gmail.com',
    pass: 'mnmf skua gzfl nmln'
  }
});

app.post('/send-email', (req, res) => {
  const { userName, userNumber, userEmail, userMessage } = req.body;

  const mailOptions = {
    from: 'homos.kitsaway@gmail.com',
    to: 'm.gamal.zaid1@gmail.com',
    subject: 'بيانات المستخدم',
    text: `الاسم: ${userName}\nالرقم: ${userNumber}\nالبريد الإلكتروني: ${userEmail}\nالتعليقات/الأسئلة: ${userMessage}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error', error: error.toString() });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Success' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
