import express from "express";
import {  deleteNotification, erroRoute, getAllNotifications, postNotification } from "../controllers/notificationControllers.js";
import { autentication } from "../helpers/auth.js";

const notificationsRoutes = express.Router();

//Rotas simples
notificationsRoutes.route("/v1/notifications")
  .get(autentication,getAllNotifications)
  .post(autentication,postNotification)

  //Rotas com parâmetros de ID
notificationsRoutes.route("/v1/notifications/:id")
    .delete(autentication,deleteNotification)

//Rotas de excessão
notificationsRoutes.all("/v1",erroRoute)

export default notificationsRoutes;