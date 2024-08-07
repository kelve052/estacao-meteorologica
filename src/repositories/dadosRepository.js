import { prisma } from "../configs/prismaClient.js"

class dadosRepository {
    static async findMany(filtro) {
        return await prisma.estacao.findMany({ where: filtro });
    }

    static async create(data) {
        return await prisma.estacao.create({ data: data });
    }

    static async update(id, data) {
        return await prisma.estacao.update({ where: { id }, data });
    }

    static async delete(id) {
        return await prisma.estacao.delete({ where: { id } });
    }
}

export default dadosRepository;