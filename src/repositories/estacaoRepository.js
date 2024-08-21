import { prisma } from "../configs/prismaClient.js"

class estacaoRepository {
     async findMany(filtro) {
        return await prisma.estacao.findMany({
            where: filtro
        });
    }

     async create(data) {
        return await prisma.estacao.create({ data: data });
    }

     async update(id, data) {
        return await prisma.estacao.update({ where: { id: id }, data: data });
    }

     async delete(id) {
        return await prisma.estacao.delete({ where: { id } });
    }
}

export default new estacaoRepository();