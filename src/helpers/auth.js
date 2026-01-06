import jwt from "jsonwebtoken";
import Teacher from "../models/teacherModel.js";

export const autentication = (req,res,next) =>{
   
        const header = req.headers["authorization"];
        const token = header && header.split(" ")[1];

        if(!token){
            return res.status(400).json({
                "erro" : "Token deve ser fornecido!"
            })
        }
        try{
        const validate = jwt.verify(token, process.env.JWT_KEY);
        req.user = validate;
        next();
    }catch(erro){
        return res.status(405).json({
            "erro": `Token inválido ou expirado`
        })
    }
}

export const isTeacher = (req, res, next) => {
    if (req.user && req.user.userType === "teacher") {
        next();
    } else {
        return res.status(403).json({
            erro: "Acesso negado. Apenas professores podem realizar esta ação."
        });
    }
}

export const allowFirstTeacherOrAuth = async (req, res, next) => {
    try {
        const teacherCount = await Teacher.countDocuments();
        if (teacherCount === 0) {
            return next();
        }
        
        const header = req.headers["authorization"];
        const token = header && header.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                erro: "Token deve ser fornecido!"
            });
        }

        try {
            const validate = jwt.verify(token, process.env.JWT_KEY);
            if (validate.userType !== "teacher") {
                return res.status(403).json({
                    erro: "Acesso negado. Apenas professores podem realizar esta ação."
                });
            }
            req.user = validate;
            next();
        } catch (erro) {
            return res.status(401).json({
                erro: "Token inválido ou expirado"
            });
        }
    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao verificar permissões."
        });
    }
}