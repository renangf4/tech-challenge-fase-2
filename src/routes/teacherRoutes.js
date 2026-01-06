import express from "express";
import { deleteTeacher, getAllTeachers, createTeacher, getTeacherById, updateTeacher } from "../controllers/teacherControllers.js";
import { autentication, isTeacher } from "../helpers/auth.js";

const teacherRoutes = express.Router();

teacherRoutes.route("/v1/teachers")
  .get(autentication, isTeacher, getAllTeachers)
  .post(autentication, isTeacher, createTeacher)

teacherRoutes.route("/v1/teachers/:id")
  .get(autentication, isTeacher, getTeacherById)
  .put(autentication, isTeacher, updateTeacher)
  .delete(autentication, isTeacher, deleteTeacher)

export default teacherRoutes;

