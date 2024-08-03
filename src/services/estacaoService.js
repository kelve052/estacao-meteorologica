import estacaoRepository from "../repositories/estacaoRepository.js";
import { z } from "zod";

class estacaoService {
    static async listar(filtro) {
        const filtroSchema = z.object({
            id: z.preprocess((val) => Number(val), z.number().int().positive().nullable()).optional(),
            nome: z.string().trim().nullable().optional(),
            endereco: z.string().trim().nullable().optional(),
            latitude: z.preprocess((val) => Number(val), z.number().nullable()).optional(),
            latitude: z.preprocess((val) => Number(val), z.number().nullable()).optional(),
            ip: z.string().ip().nullable().optional(),
            status: z.enum(['ativo', 'inativo']).nullable().optional(),
            usuario_id: z.preprocess((val) => Number(val), z.number().int().positive().nullable()).optional(),
          });
          const filtroValidated = filtroSchema.parse(filtro)
          console.log(filtroValidated)
        return await estacaoRepository.findMany(filtroValidated);
    }

    static async inserir(data) {
        // Regra de negócio e validações
        return await estacaoRepository.create(data);
    }

    static async atualizar(id, data) {
        // Regra de negócio e validações
        return await estacaoRepository.update(id, data);
    }

    static async deletar(id) {
        // Regra de negócio e validações
        return await estacaoRepository.delete(id);
    }
}

export default estacaoService;