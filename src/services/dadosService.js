import dadosRepository from "../repositories/dadosRepository"
import { z } from "zod";

class dadosService {
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
                temperatura: z.string({
                    invalid_type_error: "Temperatura informada não é do tipo string"
                }).optional(),
                umidade: z.string({
                    invalid_type_error: "Umidade informada não é do tipo string"
                }).optional(),
                pluviosidade: z.string({
                    invalid_type_error: "Pluviosidade informada não é do tipo string"
                }).optional(),
                velocidade_vento: z.string({
                    invalid_type_error: "Velocidade do vento informada não é do tipo string"
                }).optional(),
                direcao_vento: z.string({
                    invalid_type_error: "Direção do vento informada não é do tipo string"
                }).optional(),
                data_hora: z.date({
                    invalid_type_error: "Data informada não é do tipo string"
                }).optional(),
            });
            const filtroValidated = filtroSchema.parse(filtro)
            const response = await dadosRepository.findMany(filtroValidated)
            if (response.length === 0) throw {
                message: "Nenhum dado climático encontrado",
                code: 400,
                error: true
            }
            return response;

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
        try {
            const dadosSchema = z.object({
                temperatura: z.string({
                    invalid_type_error: "Temperatura informada não é do tipo string"
                }).nullable(),
                umidade: z.string({
                    invalid_type_error: "Umidade informada não é do tipo string"
                }).nullable(),
                pluviosidade: z.string({
                    invalid_type_error: "Pluviosidade informada não é do tipo string"
                }).nullable(),
                velocidade_vento: z.string({
                    invalid_type_error: "Velocidade do vento informada não é do tipo string"
                }).nullable(),
                direcao_vento: z.string({
                    invalid_type_error: "Direção do vento informada não é do tipo string"
                }).nullable(),
            });
            const dadosValidated = dadosSchema.parse(data);
            const response = dadosRepository.create(dadosValidated)
            if (!response) throw {
                message: "Não foi possível inserir os dados climáticos no banco de dados",
                code: 400,
                error: true
            }
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
}

export default dadosService