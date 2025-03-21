import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.listen(port, () => console.log("server is up at " + port));