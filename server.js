import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors"
import swaggerUi from  "swagger-ui-express";

import { openApiSpec } from "./openapispec.js";

//  routers
import authRouter from "./routes/auth.routes.js";
import gameRouter from "./routes/game.routes.js";
import userRouter from "./routes/user.routes.js";
import guessRouter from "./routes/guess.routes.js";
import leaderboardRouter from "./routes/leaderboard.routes.js";

//connect db
import connectDB from "./db/connect.js";

//error handlers
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//applying thirdparty middlewares
const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser(process.env.COOKIE_SECRET));


//security packages
app.use(helmet());
app.use(cors((req, callback) => {
  const origin = req.header('Origin');
  // Allow requests from any origin but enable credentials
  callback(null, { origin: true, credentials: true });
}));
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
// app.use(apiKeyValidator);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/guess", guessRouter);
app.use("/api/v1/leaderboard", leaderboardRouter);
app.use("/documentation",swaggerUi.serve,swaggerUi.setup(openApiSpec))

app.get("*", (req, res) => {
  res.redirect("/documentation");
}); // uncomment for production

//handling errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}/...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
