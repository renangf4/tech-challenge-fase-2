import express from "express";
import { deleteStudent, getAllStudents, createStudent, getStudentById, updateStudent } from "../controllers/studentControllers.js";
import { autentication, isTeacher } from "../helpers/auth.js";

const studentRoutes = express.Router();

studentRoutes.route("/v1/students")
  .get(autentication, isTeacher, getAllStudents)
  .post(autentication, isTeacher, createStudent)

studentRoutes.route("/v1/students/:id")
  .get(autentication, isTeacher, getStudentById)
  .put(autentication, isTeacher, updateStudent)
  .delete(autentication, isTeacher, deleteStudent)

export default studentRoutes;

