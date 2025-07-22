import express from "express";
import env from "dotenv";
import dbConnect from "./src/config/dbConnect.js";
import mainRoute from "./src/routes/main.js";


//Carrega configurações do arquivo ENV.
env.config();

//Inicializa o app
const app = express();

//Conecta ao DB
dbConnect();

//Middleware para fornecer a resposta em JSON
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.status(200).json({
//         "api-version": "1.0"
//     })
// })

app.use("/",mainRoute);

//Erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo deu errado!" });
});


const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Servidor Ativo na Porta: ${port}`);
})