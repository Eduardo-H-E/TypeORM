import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import exp from "constants";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(userRoutes);

export default app;
