import express from "express";
import notificationsRoutes from "./notificationRoutes.js";
import authRoute from "./authRoutes.js";


const mainRoute = express.Router();

//Rota base / Home
mainRoute.get("/",(req,res)=>{
    res.status(200).json({
        "api-version": "1.0",
        "name" : "notifications",
        "author" : "Lucas Vida",
        "git" : "https://github.com/lucasvida"
    })
})


mainRoute.use("/", notificationsRoutes);
mainRoute.use("/", authRoute);


export default mainRoute;