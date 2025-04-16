import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorHandler from "./middlewares/ApiErrorHandler.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const app = express();



app.use((req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;

  if (!origin || !origin.startsWith(process.env.CORS_ORIGIN)) {
    return res.status(403).json({ message: "Access denied: Invalid origin" });
  }

  next();
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes)

app.use(errorHandler)
export { app }