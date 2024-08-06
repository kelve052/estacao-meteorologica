import estacaoRepository from "../repositories/estacaoRepository.js";
import usuarioRepository from "../repositories/usuarioRepository.js";
import { z } from "zod";

class estacaoService {
    static async listar(filtro) {
        // Regra de negócio e validações
        return await estacaoRepository.findAll(filtro);
    }

    static async inserir(data) {
        try {
            const estacaoSchema = z.object({
                nome: z.string(),
                endereco: z.string(),
                latitude: z.preprocess((val) => Number(val), z.number()),
                longitude: z.preprocess((val) => Number(val), z.number()),
                ip: z.string().ip(),
                status: z.enum(['ativo', 'inativo']),
                usuario_id: z.preprocess((val) => Number(val), z.number().int().positive())
            });
            const estacaoRequired = estacaoSchema.required();
            const estacaoValidated = estacaoRequired.parse(data)
    
            const filtro = { id: estacaoValidated.usuario_id};

            const usuario = await usuarioRepository.findMany(filtro);

            console.log(usuario.length);
    
            if (!usuario) throw new Error("Usuário não encontrado");
    
            // return await estacaoRepository.create(estacaoValidated);
        } catch (error) {
            return error
        }
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