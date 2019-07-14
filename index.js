import express from 'express';
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import dotenv from "dotenv";
import userAPIRouter from "./routes/user";
import bodyParser from 'body-parser';
import db from './models';


dotenv.config();
const app = express();
db.sequelize.sync();

app.use(morgan("dev"));
app.use(express.json()); // json형식의 본문
app.use(express.urlencoded({ extended: true })); // form을 처리하는것
// API는 다른 서비스가 내 서비스의 기능을 실행할수 있게 열어둔 창구
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false //https를 쓸때 true
      },
      name: 'test'
    })
  );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", userAPIRouter);

app.listen(3011, () => {
  console.log(`server is running on http://localhost:3011`);
});
