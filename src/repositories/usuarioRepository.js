import { prisma } from "../configs/prismaClient.js"

class usuarioRepository {
    static async findMany(filtros) {
        try {
            return await prisma.usuario.findMany({
                where: filtros,
                select: {
                    id: true,
                    nome:true,
                    email:true,
                    senha:false
                }
            });
        } catch (error) {
            throw error
        }
    }

    static async create(data) {
        return await prisma.usuario.create({ data });
    }

    static async update(id, data) {
        return await prisma.usuario.update({ where: { id }, data });
    }

    static async delete(id) {
        return await prisma.usuario.delete({ where: { id } });
    }
}

export default usuarioRepository;