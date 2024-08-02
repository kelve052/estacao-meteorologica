import { prisma } from "../configs/prismaClient.js"

class estacaoRepository {
    static async findMany(filtros) {
        return await prisma.estacao.findMany(filtros);
    }
    static async findById(id) {
      return await prisma.estacao.findUnique({ where: { id } });
    }
    static async create(data) {
        return await prisma.estacao.create({ data });
    }

    static async update(id, data) {
        return await prisma.estacao.update({ where: { id }, data });
    }

    static async delete(id) {
        return await prisma.estacao.delete({ where: { id } });
    }
}

export default estacaoRepository;