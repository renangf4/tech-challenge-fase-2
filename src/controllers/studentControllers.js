import Student from "../models/studentModel.js";
import bcrypt from "bcrypt";

export const getAllStudents = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const students = await Student.find({})
            .select("-password")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Student.countDocuments();

        if (!students.length) {
            return res.status(404).json({
                response: "Não há alunos para listar"
            });
        }

        res.status(200).json({
            data: students,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
        });
    } catch (erro) {
        res.status(404).json({
            response: "Não foi possível listar os alunos"
        });
    }
}

export const getStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id).select("-password");
        if (!student) {
            return res.status(404).json({
                response: `Aluno com id ${id} não encontrado.`
            });
        }
        res.status(200).json(student);
    } catch (erro) {
        res.status(400).json({
            response: `Erro ao buscar aluno com id ${id}.`
        });
    }
}

export const createStudent = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({
                response: "Email já cadastrado."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
            createdAt: Date.now()
        });

        await newStudent.save();

        const studentResponse = newStudent.toObject();
        delete studentResponse.password;

        res.status(201).json({
            response: "Aluno cadastrado com sucesso.",
            student: studentResponse
        });
    } catch (erro) {
        res.status(500).json({
            response: "Não foi possível cadastrar o aluno."
        });
    }
}

export const updateStudent = async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;

    try {
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        if (email) {
            const existingStudent = await Student.findOne({ email, _id: { $ne: id } });
            if (existingStudent) {
                return res.status(400).json({
                    response: "Email já cadastrado."
                });
            }
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedStudent) {
            return res.status(404).json({
                response: `Aluno com id ${id} não encontrado.`
            });
        }

        res.status(200).json({
            response: `Aluno ${id} atualizado com sucesso!`,
            student: updatedStudent
        });
    } catch (erro) {
        res.status(400).json({
            response: `Erro ao atualizar aluno com id ${id}.`
        });
    }
}

export const deleteStudent = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({
                response: `Aluno com id ${id} não encontrado.`
            });
        }
        res.status(200).json({
            response: `Aluno ${id} excluído com sucesso!`
        });
    } catch (erro) {
        res.status(400).json({
            response: `Erro ao excluir aluno ${id}`
        });
    }
}

