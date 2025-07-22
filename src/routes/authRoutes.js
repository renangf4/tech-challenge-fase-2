import express from "express";
import { getAuth } from "../controllers/authControlers.js";

const authRoute = express.Router();

authRoute.route("/v1/auth")
    .post(getAuth);

export default authRoute;
