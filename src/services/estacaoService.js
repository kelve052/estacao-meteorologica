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
                nome: z.string({
                    invalid_type_error: "O nome informado não é do tipo string",
                    required_error: "Nome é obrigatório",
                }),
                endereco: z.string({
                    invalid_type_error: "O email informado não é do tipo string",
                    required_error: "Email é obrigatório",
                }),
                latitude: z.preprocess((val) => Number(val), z.number()),
                longitude: z.preprocess((val) => Number(val), z.number()),
                ip: z.string({
                    invalid_type_error: "O IP informado não é do tipo string",
                    required_error: "IP é obrigatório",
                }).ip({
                    message: "O formato deste IP não é válido"
                }),
                status: z.enum(['ativo', 'inativo']),
                usuario_id: z.number({
                    required_error: "Estação sem vínculo com usuário",
                    invalid_type_error: "ID não é do tipo number"
                }).int({
                    message: "ID não é um tipo inteiro"
                }).positive()
            });
            const estacaoValidated = estacaoSchema.parse(data)
            const filtro = { id: estacaoValidated.usuario_id};
            const usuario = await usuarioRepository.findMany(filtro);
            if (usuario.length === 0) throw new Error("Usuário não encontrado");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map(issue => issue.message);
                throw errorMessages;
            } else {
                throw error;
            }
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