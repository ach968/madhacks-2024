import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000 || 5000;

app.get("/", (_req, _res) => {});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
