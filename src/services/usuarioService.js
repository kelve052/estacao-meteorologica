import usuarioRepository from "../repositories/usuarioRepository.js";
import { z } from "zod";

class usuarioService {
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
                email: z.string({
                    invalid_type_error:"O Email tem que ser String"
                }).email({
                    message:"Email invalido!"
                }).optional(),
            });
            const filtroValidated = filtroSchema.parse(filtro)
            const response = await usuarioRepository.findMany(filtroValidated);
            if (response.length === 0) throw {
                message: "Nenhum usuário encontrado",
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
        return await usuarioRepository.create(data);
    }

    static async atualizar(id, data) {
        // Regra de negócio e validações
        return await usuarioRepository.update(id, data);
    }

    static async deletar(id) {
        // Regra de negócio e validações
        return await usuarioRepository.delete(id);
    }
}

export default usuarioService;