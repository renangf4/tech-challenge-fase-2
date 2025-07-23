import express from "express";
import { deletePost, erroRoute, getAllPosts, postPost } from "../controllers/postControllers.js";
import { autentication } from "../helpers/auth.js";

const postRoutes = express.Router();

//Rotas simples
postRoutes.route("/v1/posts")
  .get(autentication, getAllPosts)
  .post(autentication, postPost)

//Rotas com parâmetros de ID
postRoutes.route("/v1/posts/:id")
  .delete(autentication, deletePost)

//Rotas de excessão
postRoutes.all("/v1", erroRoute)

export default postRoutes;