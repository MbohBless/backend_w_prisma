import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
const app = express();
const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from message ${message}`);
  next();
};

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger("Custom logger"));

app.use((req, res, next) => {
  res.status(401);
  res.send("Nope");
});
app.get("/", (req, res) => {
  console.log("hello from request");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", router);

export default app;
