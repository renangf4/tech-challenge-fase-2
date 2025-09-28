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
    origin: true, // Permite todas as origens
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    credentials: true,
    optionsSuccessStatus: 200 // Para compatibilidade com navegadores legados
}));

app.use(express.json());

// Middleware para tratar preflight requests manualmente se necessário
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    next();
});

app.use("/",mainRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo deu errado!" });
});


const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Servidor Ativo na Porta: ${port}`);
})