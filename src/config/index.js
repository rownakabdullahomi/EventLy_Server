import dotenv from "dotenv";

dotenv.config();


export default {
  port: process.env.PORT || 5000,
  database_uri: process.env.DATABASE_URI,
  jwt_secretKey: process.env.JWT_SECRET_KEY
};