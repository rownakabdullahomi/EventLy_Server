import express from "express";
import cors from "cors";
import config from "./config/index.js";
import { connectDB } from "./db/db.js";
import routes from "./routes/routers.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

connectDB();

app.listen(config.port, ()=>{
    console.log(`⚡ Server is running on port: ${config.port}.`);
})

app.get("/", (req, res)=>{
    res.send({success: true, message: "⚡ Welcome to EventLy server.."});
})


// vercel live link
// https://vercel.com/rownaks-projects/evently-server