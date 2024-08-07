import estacaoRepository from "../repositories/estacaoRepository.js";
import { z } from "zod";

class estacaoService {
    static async listar(filtro) {
        try {
            const filtroSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "ID informado não é do tipo number",
                }).int({
                    message: "ID informado não é um número inteiro"
                }).positive({
                    message: "ID informado não é positivo"
                })).optional(),
                nome: z.string({
                    invalid_type_error: "Nome informado não é do tipo string"
                }).trim().optional(),
                endereco: z.string({
                    invalid_type_error: "Endereço informado não é do tipo string"
                }).trim().optional(),
                latitude: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Latitude informada não é do tipo number",
                })).optional(),
                longitude: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Longitude informada não é do tipo number",
                })).optional(),
                ip: z.string({
                    invalid_type_error: "IP informado não é do tipo string",
                }).ip({
                    message: "IP informado não segue o padrão (IPv4 ou IPv6)"
                }).optional(),
                status: z.enum(['ativo', 'inativo'], {
                    invalid_type_error: "Status não é do tipo string",
                    message: "Status informado não corresponde ao formato indicado (ativo ou inativo)"
                }).optional(),
                usuario_id: z.preprocess((val) => Number(val), z.number({ 
                    invalid_type_error: "ID do usuário informado não é do tipo number"
                }).int({
                    message: "ID do usuário informado não é um número inteiro"
                }).positive({
                    message: "ID do usuário informado não é um inteiro positivo"
                })).optional(),
            });
            const filtroValidated = filtroSchema.parse(filtro)
            const response = await estacaoRepository.findMany(filtroValidated);
            if (response.length === 0) throw {
                message: "Nenhuma estação encontrada",
                code: 400,
                error: true
            }
            return response
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => issue.message);
                throw {
                    message: errorMessages,
                    code: 400,
                    error: true
                };
            } else {
                throw error;
            }

        }
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