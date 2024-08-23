import { prisma } from "../configs/prismaClient.js"

class UsuarioRepository {
    static async findMany(filtros) {
        try {
            return await prisma.usuario.findMany({
                where: filtros,
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    senha: true
                }
            });
        } catch (error) {
            throw error
        }
    }
    static async findById(id) {
        return await prisma.usuario.findUnique({
            where: { id: id },
            select: {
                id: true,
                nome: true,
                email: true,
                senha: false
            }
        });
    }

    static async create(data) {
        return await prisma.usuario.create({ data: data });
    }

    static async update(id, data) {
        const novId = parseInt(id)
        return await prisma.usuario.update({ where: { id: novId }, data: data });
    }

    static async delete(id) {
        return await prisma.usuario.delete({ where: id });
    }
}

export default UsuarioRepository;