import express from "express";
import cors from "cors";
import config from "./src/config/index.js";
import { connectDB } from "./src/db/db.js";
import routes from "./src/routes/routers.js";

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