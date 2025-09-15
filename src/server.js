import express from "express";
import initDatabase from "./config/initDB.js";
import { configDotenv } from "dotenv";
import transactionRoutes from "./routes/transactionRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

configDotenv();

const PORT = process.env.PORT;

const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use("/api/v1", transactionRoutes);

app.get("/api/v1/health", (req, res) => {
    res.send({
        status: "OK"
    })
});

initDatabase().then(() =>{
    app.listen(PORT, () => {
        console.log("Connection successfull! ", PORT);
    });
});