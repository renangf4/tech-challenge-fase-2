import jwt from "jsonwebtoken";

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