import jwt from "jsonwebtoken";

export const getAuth = (req,res) => {
    const date = new Date();
    const token = jwt.sign({ user: date }, process.env.JWT_KEY, { expiresIn: "1h" });
    res.status(200).json({token});
}