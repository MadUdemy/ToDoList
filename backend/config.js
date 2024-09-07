require("dotenv").config();

const PORT = 3000;
const MONGODB_URL = `mongodb+srv://sctrynext:${process.env.PASSWORD}@sertifdb.4yewhjo.mongodb.net/Todolist?retryWrites=true&w=majority&appName=SertifDB`;

module.exports = {
  PORT: PORT,
  MONGODB_URL: MONGODB_URL,
};
