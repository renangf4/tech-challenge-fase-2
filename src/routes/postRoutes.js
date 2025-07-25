import express from "express";
import { deletePost, erroRoute, getAllPosts, postPost, getPostById, updatePost, searchPosts } from "../controllers/postControllers.js";
import { autentication } from "../helpers/auth.js";

const postRoutes = express.Router();

postRoutes.get("/v1/posts/search", autentication, searchPosts);

postRoutes.route("/v1/posts")
  .get(autentication, getAllPosts)
  .post(autentication, postPost)

postRoutes.route("/v1/posts/:id")
  .get(autentication, getPostById)
  .put(autentication, updatePost)
  .delete(autentication, deletePost)

postRoutes.all("/v1", erroRoute)

export default postRoutes;