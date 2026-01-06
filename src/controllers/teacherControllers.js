import Teacher from "../models/teacherModel.js";
import bcrypt from "bcrypt";

export const getAllTeachers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const teachers = await Teacher.find({})
            .select("-password")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Teacher.countDocuments();

        if (!teachers.length) {
            return res.status(404).json({
                response: "Não há professores para listar"
            });
        }

        res.status(200).json({
            data: teachers,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
        });
    } catch (erro) {
        res.status(404).json({
            response: "Não foi possível listar os professores"
        });
    }
}

export const getTeacherById = async (req, res) => {
    const id = req.params.id;
    try {
        const teacher = await Teacher.findById(id).select("-password");
        if (!teacher) {
            return res.status(404).json({
                response: `Professor com id ${id} não encontrado.`
            });
        }
        res.status(200).json(teacher);
    } catch (erro) {
        res.status(400).json({
            response: `Erro ao buscar professor com id ${id}.`
        });
    }
}

export const createTeacher = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({
                response: "Email já cadastrado."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            createdAt: Date.now()
        });

        await newTeacher.save();

        const teacherResponse = newTeacher.toObject();
        delete teacherResponse.password;

        res.status(201).json({
            response: "Professor cadastrado com sucesso.",
            teacher: teacherResponse
        });
    } catch (erro) {
        res.status(500).json({
            response: "Não foi possível cadastrar o professor."
        });
    }
}

export const updateTeacher = async (req, res) => {
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
            const existingTeacher = await Teacher.findOne({ email, _id: { $ne: id } });
            if (existingTeacher) {
                return res.status(400).json({
                    response: "Email já cadastrado."
                });
            }
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedTeacher) {
            return res.status(404).json({
                response: `Professor com id ${id} não encontrado.`
            });
        }

        res.status(200).json({
            response: `Professor ${id} atualizado com sucesso!`,
            teacher: updatedTeacher
        });
    } catch (erro) {
        res.status(400).json({
            response: `Erro ao atualizar professor com id ${id}.`
        });
    }
}

export const deleteTeacher = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(id);
        if (!deletedTeacher) {
            return res.status(404).json({
                response: `Professor com id ${id} não encontrado.`
            });
        }
        res.status(200).json({
            response: `Professor ${id} excluído com sucesso!`
        });
    } catch (erro) {
        res.status(400).json({
            response: `Erro ao excluir professor ${id}`
        });
    }
}

