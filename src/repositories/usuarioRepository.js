import { prisma } from "../configs/prismaClient.js"

class usuarioRepository {
    static async findMany(filtros) {
        return await prisma.usuario.findMany({where: filtros});
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