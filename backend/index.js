import express from "express";
import { PORT } from "./config-env.js";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./helpers/database.js";
import route from "./routes/index.js";


const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// db
connectDB();

// routers
route(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})