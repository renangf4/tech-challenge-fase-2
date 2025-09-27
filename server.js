import express from "express";
import cors from "cors";
import env from "dotenv";
import dbConnect from "./src/config/dbConnect.js";
import mainRoute from "./src/routes/main.js";

env.config();

const app = express();

dbConnect();

// Configuração do CORS
app.use(cors({
    origin: "*", // Permite todas as origens - em produção, especifique domínios específicos
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.use("/",mainRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo deu errado!" });
});


const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Servidor Ativo na Porta: ${port}`);
})