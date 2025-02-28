const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(morgan('dev')); // 로깅
app.use(helmet()); // 보안 헤더 설정
app.use(cors()); // CORS 활성화
app.use(express.json()); // JSON 파싱

// 레이트 리미팅 설정
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// 라우트 설정
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API!', timestamp: new Date() });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// 에러 핸들링
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
