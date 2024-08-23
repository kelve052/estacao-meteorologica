import { prisma } from "../configs/prismaClient.js"

class dadosRepository {
    static async findMany(filtro) {
        return await prisma.dados_diarios.findMany({ where: filtro });
    }

    static async create(data) {
        return await prisma.dados_diarios.create({ data: data });
    }

    static async update(id, data) {
        return await prisma.dados_diarios.update({ where: { id }, data });
    }

    static async delete(id) {
        return await prisma.dados_diarios.delete({ where: { id } });
    }
}

export default dadosRepository;