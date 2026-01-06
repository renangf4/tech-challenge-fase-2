import express from "express";
import { login } from "../controllers/authControlers.js";

const authRoute = express.Router();

authRoute.route("/v1/auth/login")
    .post(login);

export default authRoute;
