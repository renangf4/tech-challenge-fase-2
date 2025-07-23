import express from "express";
import { getAuth } from "../controllers/authControlers.js";

const authRoute = express.Router();

authRoute.route("/v1/auth")
    .get(getAuth);

export default authRoute;
