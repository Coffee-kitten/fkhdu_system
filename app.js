import express from "express";
import bodyParser from "body-parser";
import { routers } from "./src/routes/index.js";

const app = express();
app.use(bodyParser.json());

app.use(routers);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
