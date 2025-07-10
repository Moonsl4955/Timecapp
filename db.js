const mongoose = require('mongoose');

const connectDB = async () => {
  try {
  await mongoose.connect('mongodb+srv://user1:anstjfls4%21@clusteraa.94bsino.mongodb.net/mydb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
    console.log('MongoDB 연결 성공');
  } catch (error) {
    console.error('MongoDB 연결 실패:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;