import express from "express";
import database from "./db.js";
import dotenv from "dotenv";
import router from "./Routes/router.js";
import cors from"cors";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

database();

app.use('/api/',router);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Server is running and database connected at port ${PORT}`);
});
