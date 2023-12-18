require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/notFound");
const authRoute = require("./routes/auth");
const courseRoute = require("./routes/course");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/api/auth", authRoute);
app.use("/api/course", courseRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listeing on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};
start();
