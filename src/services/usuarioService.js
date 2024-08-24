import UsuarioRepository from "../repositories/usuarioRepository.js";
import { z } from "zod";
import Hashsenha from "../util/hashSenha.js";

class UsuarioService {

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
                    invalid_type_error: "O Email tem que ser String"
                }).email({
                    message: "Email invalido!"
                }).optional(),
            });
            const filtroValidated = filtroSchema.parse(filtro)
            const response = await UsuarioRepository.findMany(filtroValidated);
            response.forEach((e) => delete e.senha);
            if (response.length === 0) throw {
                message: "Nenhum usuário encontrado",
                code: 400,
                error: true
            }
            return response
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    }
                });
                throw {
                    message: errorMessages,
                    code: 400,
                    error: true
                };
            } else {
                throw error
            }
        }
    }
    static async listarPorID(id) {
        try {
            const idSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "ID informado não é do tipo number",
                }).int({
                    message: "ID informado não é um número inteiro"
                }).positive({
                    message: "ID informado não é positivo"
                }))
            })
            const parsedIdSchema = idSchema.parse(id)
            const response = await UsuarioRepository.findById(parsedIdSchema.id)
            if (!response) {
                throw {
                    message: "Usuário não encontrado.",
                    code: 400,
                    error: true
                }
            }
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    }
                });
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
            const validacao = z.object({
                nome: z.string({
                    required_error: "Campo Nome É Obrigatório!",
                    invalid_type_error: "O nome tem que ser String"
                }).min(3, {
                    message: "O Nome Deve Conter Pelo Menos 3 Letras!"
                }),
                email: z.string({
                    required_error: "Campo Email É Obrigatório!",
                    invalid_type_error: "O Email Tem Que Ser String"
                }).email({
                    message: "Email Invalido!"
                }),
                senha: z.string({
                    required_error: "Campo Senha É Obrigatório!",
                    invalid_type_error: "O Senha Tem Que Ser String"
                }).min(8).refine(
                    (value) =>
                        /[a-z]/.test(value) &&  // Tem pelo menos uma letra minúscula
                        /[A-Z]/.test(value) &&  // Tem pelo menos uma letra maiúscula
                        /[0-9]/.test(value) &&  // Tem pelo menos um número
                        /[^a-zA-Z0-9]/.test(value),  // Tem pelo menos um símbolo
                    {
                        message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
                    }
                )
            })
            const usuarioValidated = validacao.parse(data)

            //  verificação do email repetido
            const emailRepetido = await UsuarioRepository.findMany({ email: data.email })

            if (emailRepetido.length > 0) {
                throw {
                    message: "Email Já Cadastrado!",
                    code: 400,
                    error: true
                }
            }

            //  hash senha
            const hashSenha = await Hashsenha.criarHashSenha(data.senha)
            usuarioValidated.senha = hashSenha

            const response = await UsuarioRepository.create(usuarioValidated);
            const userResponse = { //para não exibir a senha do usuário no corpo da resposta
                id: response.id,
                nome: response.nome,
                email: response.email
            };
            return userResponse
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path,
                        message: issue.message
                    }
                });
                throw {
                    message: errorMessages,
                    code: 400,
                    error: true
                };
            } else {
                throw error
            }
        }
    }

    static async atualizar(id, data) {
        try {

            const parsedId = parseInt(id);

            const usuario = await UsuarioRepository.findById(parsedId);

            if (!usuario) {
                throw {
                    message: "Usuário não encontrado!",
                    code: 400,
                    error: true
                }
            }

            const validacao = z.object({
                nome: z.string({
                    // required_error: "Campo Nome É Obrigatório!",
                    invalid_type_error: "O nome tem que ser String"
                }).min(3, {
                    message: "O Nome Deve Conter Pelo Menos 3 Letras!"
                }).optional(),
                email: z.string({
                    // required_error: "Campo Email É Obrigatório!",
                    invalid_type_error: "O Email Tem Que Ser String"
                }).email({
                    message: "Email Invalido!"
                }).optional(),
                senha: z.string({
                    // required_error: "Campo Senha É Obrigatório!",
                    invalid_type_error: "O Senha Tem Que Ser String"
                }).min(8, {
                    message: "A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
                }).refine(
                    (value) =>
                        /[a-z]/.test(value) &&  // Tem pelo menos uma letra minúscula
                        /[A-Z]/.test(value) &&  // Tem pelo menos uma letra maiúscula
                        /[0-9]/.test(value) &&  // Tem pelo menos um número
                        /[^a-zA-Z0-9]/.test(value),  // Tem pelo menos um símbolo
                    {
                        message: "A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
                    }
                ).optional()
            })

            const usuarioValidated = validacao.parse(data)

            if (usuarioValidated.senha != undefined) {
                //  hash senha
                const hashSenha = await Hashsenha.criarHashSenha(data.senha)
                usuarioValidated.senha = hashSenha
            }

            if (usuarioValidated.email != undefined) {
                //  verificação do email repitido
                const emailRepetido = await UsuarioRepository.findMany({ email: data.email })

                if (!emailRepetido) {
                    if (id != emailRepetido.id) {
                        throw {
                            message: "Email Já Cadastrado!",
                            code: 400,
                            error: true
                        }
                    }
                }
            }

            const response = await UsuarioRepository.update(id, usuarioValidated);

            delete response.senha

            return response

        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path,
                        message: issue.message
                    }
                });
                throw {
                    message: errorMessages,
                    code: 400,
                    error: true
                };
            } else {
                throw error
            }
        }

    }

    static async deletar(id) {
        try {
            const idSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "ID informado não é do tipo number",
                }).int({
                    message: "ID informado não é um número inteiro"
                }).positive({
                    message: "ID informado não é positivo"
                }))
            })
            const parsedIdSchema = idSchema.parse(id)
            const usuario = await UsuarioRepository.findById(parsedIdSchema.id)
            console.log(usuario)
            if (!usuario) {
                throw {
                    code: 400,
                    message: `Usuário não encontrado!`,
                    error: true
                }
            }
            const response = await UsuarioRepository.delete(parsedIdSchema.id);
            if (!response) {
                throw {
                    code: 400,
                    message: `Erro interno, não foi possível deletar este usuário.`,
                    error: true
                }
            }
            delete response.senha;
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    }
                });
                throw {
                    message: errorMessages,
                    code: 400,
                    error: true
                };
            } else {
                throw error
            }
        }
    }
}

export default UsuarioService;