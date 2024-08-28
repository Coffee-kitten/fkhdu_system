import express from "express";
import cors from "cors";
import { routers } from "./src/routes/index.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(routers);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
