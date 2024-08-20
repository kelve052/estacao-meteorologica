import { prisma } from "../configs/prismaClient.js"

class UsuarioRepository {
    static async findMany(filtros) {
        try {
            return await prisma.usuario.findMany({
                where: filtros
            });
        } catch (error) {
            throw error
        }
    }

    static async create(data) {
        return await prisma.usuario.create({ data });
    }

    static async update(id, data) {
        const novId= parseInt(id)
        return await prisma.usuario.update({ where: {id: novId}, data });
    }

    static async delete(id) {
        return await prisma.usuario.delete({ where: id });
    }
}

export default UsuarioRepository;