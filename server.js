const express = require('express');
console.log('DB 연결 시도');
const connectDB = require('./db');
console.log('DB 연결 함수 호출됨');
const Letter = require('./Letter');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.post('/api/letter', async (req, res) => {
  try {
    const { nickname, email, content } = req.body;
    const letter = new Letter({ nickname, email, content });
    await letter.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000');
});

const nodemailer = require('nodemailer');



// 이메일 발송 함수
async function sendLetterEmail(letter) {
  // Gmail 예시 (구글 계정 2단계 인증 및 앱 비밀번호 필요)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_gmail@gmail.com',      // 본인 이메일
      pass: 'your_app_password'          // 앱 비밀번호
    }
  });

  await transporter.sendMail({
    from: '"Timecap" <your_gmail@gmail.com>',
    to: letter.email,
    subject: '미래의 나에게 보내는 편지',
    text: letter.content
  });
}

const cron = require('node-cron');
const Letter = require('./Letter');

// 2026년 1월 1일 0시에 실행 (서버가 켜져 있어야 함)
cron.schedule('0 0 1 1 *', async () => {
  const now = new Date();
  if (now.getFullYear() === 2026) {
    const letters = await Letter.find({});
    for (const letter of letters) {
      await sendLetterEmail(letter);
    }
    console.log('모든 편지 이메일 발송 완료');
  }
});