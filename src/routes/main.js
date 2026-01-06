import express from "express";
import postRoutes from "./postRoutes.js";
import authRoute from "./authRoutes.js";
import teacherRoutes from "./teacherRoutes.js";
import studentRoutes from "./studentRoutes.js";


const mainRoute = express.Router();

//Rota base / Home
mainRoute.get("/",(req,res)=>{
    res.status(200).json({
        "api-version": "1.0",
        "name" : "posts",
        "author" : "Grupo FIAP",
        "git" : "https://github.com/renangf4/tech-challenge-fase-2"
    })
})


mainRoute.use("/", postRoutes);
mainRoute.use("/", authRoute);
mainRoute.use("/", teacherRoutes);
mainRoute.use("/", studentRoutes);


export default mainRoute;