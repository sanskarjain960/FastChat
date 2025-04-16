import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorHandler from "./middlewares/ApiErrorHandler.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use((req, res, next) => {
  
    const requestOrigin = req.headers.origin;
  
    if (requestOrigin && requestOrigin !== process.env.CORS_ORIGIN) {
      return res.status(403).json({ message: "Forbidden: Invalid origin" });
    }
  
    next();
  });



app.use(cookieParser())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes)

app.use(errorHandler)
export { app }