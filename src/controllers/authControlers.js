import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                response: "Email e senha são obrigatórios."
            });
        }

        let user = await Teacher.findOne({ email });
        let userType = "teacher";

        if (!user) {
            user = await Student.findOne({ email });
            userType = "student";
        }

        if (!user) {
            return res.status(401).json({
                response: "Email ou senha incorretos."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                response: "Email ou senha incorretos."
            });
        }

        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email, 
                userType: userType,
                name: user.name 
            }, 
            process.env.JWT_KEY, 
            { expiresIn: "24h" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: userType
            }
        });
    } catch (erro) {
        res.status(500).json({
            response: "Erro ao realizar login."
        });
    }
}