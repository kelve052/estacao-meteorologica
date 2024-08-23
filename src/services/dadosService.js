import dadosRepository from "../repositories/dadosRepository.js"
import { z } from "zod";

class dadosService {
    static async listar(filtro) {
        try {
            const filtroSchema = z.object({
                temperature: z.string({
                    invalid_type_error: "Temperatura informada não é do tipo string"
                }).optional(),
                humidity: z.number({
                    invalid_type_error: "Umidade informada não é do tipo number"
                }).optional(),
                rainfall: z.number({
                    invalid_type_error: "Pluviosidade informada não é do tipo number"
                }).optional(),
                wind_speed_kmh: z.number({
                    invalid_type_error: "Velocidade do vento informada não é do tipo number"
                }).optional(),
                data_hora: z.date({
                    invalid_type_error: "Data informada não é do tipo string/data"
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
              throw {
                message: error.message,
                code: 400,
                error: true
            }
            }
        }
    }
    static async inserir(data) {
        try {
            const dadosSchema = z.object({
                temperature: z.string({
                    invalid_type_error: "Temperatura informada não é do tipo string"
                }).nullable(),
                humidity: z.number({
                    invalid_type_error: "Umidade informada não é do tipo number"
                }).nullable(),
                rainfall: z.number({
                    invalid_type_error: "Pluviosidade informada não é do tipo number"
                }).nullable(),
                wind_speed_kmh: z.number({
                    invalid_type_error: "Velocidade do vento informada não é do tipo int"
                }).nullable(),
                data_hora: z.date({
                    invalid_type_error: "Velocidade do vento informada não é do tipo date"
                })
            });
            const dadosValidated = dadosSchema.parse(data);
            const response = dadosRepository.create(dadosValidated)
            if (!response) throw {
                message: "Não foi possível inserir os dados climáticos no banco de dados",
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
}

export default dadosService