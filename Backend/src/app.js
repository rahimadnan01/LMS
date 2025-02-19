import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set(express.static("public"));
export { app };

// import routes
import studentAuthRoute from "./routes/authentication/studentAuth.routes.js"
import teacherAuthRoute from "./routes/authentication/teacherAuth.routes.js"
import adminAuthRoute from "./routes/authentication/adminAuth.routes.js"
import userRoute from "./routes/user.routes.js";
import courseRoute from "./routes/course.routes.js";
import courseContentRoute from "./routes/courseContent.routes.js";
import moduleRoute from "./routes/module.routes.js";
import lectureRoute from "./routes/lecture.routes.js";
import booksRoute from "./routes/book.routes.js";
import audioRoute from "./routes/audio.routes.js";
import playlistRoute from "./routes/playlist.routes.js";
// declaring routes
app.use("/api/v1", adminAuthRoute)
app.use("/api/v1", studentAuthRoute)
app.use("/api/v1", teacherAuthRoute)
app.use("/api/v1", userRoute);
app.use("/api/v1", courseRoute);
app.use("/api/v1", courseContentRoute);
app.use("/api/v1", moduleRoute);
app.use("/api/v1", lectureRoute);
app.use("/api/v1", booksRoute);
app.use("/api/v1", audioRoute);
app.use("/api/v1", playlistRoute);
app.all("*", (req, res, next) => {
  next({ status: 500, message: "Page not found" });
});

app.use(errorHandler);
