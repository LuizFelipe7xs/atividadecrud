import express from "express";
import cors from "cors";

import produtoRoutes from "./routes/produtoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API de produtos funcionando!" });
});

app.use("/produtos", produtoRoutes);

export default app;