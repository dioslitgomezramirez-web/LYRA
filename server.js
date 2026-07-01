import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.js";
import { requestLogger, notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const publicPath = new URL("./", import.meta.url).pathname;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

app.use(chatRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("");
    console.log("=================================");
    console.log("Servidor iniciado correctamente");
    console.log(`Escuchando en: http://localhost:${PORT}`);
    console.log("=================================");
    console.log("");
});