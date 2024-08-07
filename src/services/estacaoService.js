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
                    invalid_type_error: "Nome informado não é do tipo string",
                    required_error: "Nome é obrigatório",
                }),
                endereco: z.string({
                    invalid_type_error: "Email informado não é do tipo string",
                    required_error: "Email é obrigatório",
                }),
                latitude: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Latitude informada não é do tipo number",
                    required_error: "Latitude é obrigatória"
                })),
                longitude: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Longitude informada não é do tipo number",
                    required_error: "Longitude é obrigatória"
                })),
                ip: z.string({
                    invalid_type_error: "IP informado não é do tipo string",
                    required_error: "IP é obrigatório",
                }).ip({
                    message: "Formato de IP inválido"
                }),
                status: z.enum(["ativo", "inativo"], {
                    invalid_type_error: "Status não é do tipo string",
                    required_error: "Status é obrigatório",
                    message: "Status informado não corresponde ao formato indicado (ativo ou inativo)"
                }),
                usuario_id: z.number({
                    required_error: "Estação sem vínculo com usuário",
                    invalid_type_error: "ID não é do tipo number"
                }).int({
                    message: "ID não é um tipo inteiro"
                }).positive({
                    message: "ID não é um inteiro positivo"
                })
            });
            const estacaoValidated = estacaoSchema.parse(data)

            const filtroUsuarioId = { id: estacaoValidated.usuario_id };
            const usuario = await usuarioRepository.findMany(filtroUsuarioId);
            if (usuario.length === 0) throw {
                message: "Usuário não encontrado",
                code: 400,
                error: true
            };

        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => issue.message);
                throw {
                    message: errorMessages,
                    code: 400,
                    error: true
                };
            } else {
                throw {
                    message: error,
                    code: 400,
                    error: true
                };
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