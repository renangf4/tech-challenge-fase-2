import mongoose from "mongoose";

const dbConnect = () => {
    mongoose.connect(process.env.DB_URI).then(()=> console.log("Conectado ao DB")).catch(()=> console.log("Erro ao conectar no DB"));
}

export default dbConnect;