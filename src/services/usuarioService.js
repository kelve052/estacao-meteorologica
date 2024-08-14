import usuarioRepository from "../repositories/usuarioRepository.js";
import { z } from "zod";
import Hashsenha from "../util/hashSenha.js";

class usuarioService {
    static async listar(filtro) {
        // Regra de negócio e validações
        return await usuarioRepository.findAll(filtro);
    }

    static async inserir(data) {
        // Regra de negócio e validações
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
            const usuarioValidated = validacao.required().parse(data)

            //  verificação do email repitido
            const emailRepetido = await usuarioRepository.findMany({ email: data.email })
            console.log(emailRepetido)
            if (!emailRepetido.length == 0) {
                throw {
                    message: "Email Já Cadastrado!",
                    code: 400,
                    error: true
                }
            }


            //  hash senha
            const hashSenha = await Hashsenha.criarHashSenha(data.senha)
            usuarioValidated.senha = hashSenha




            return await usuarioRepository.create(usuarioValidated);
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

    static async atualizar(id, data) {
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
                )
            })

            const usuarioValidated = validacao.required().parse(data)

            //  hash senha
            const hashSenha = await Hashsenha.criarHashSenha(data.senha)
            usuarioValidated.senha = hashSenha

            //  verificação do email repitido
            const emailRepetido = await usuarioRepository.findMany({ email: data.email })

            if (!emailRepetido.length == 0) {
                if (id != emailRepetido[0].id) {
                    throw {
                        message: "Email Já Cadastrado!",
                        code: 400,
                        error: true
                    }
                }

            }

            return await usuarioRepository.update(id, usuarioValidated);



        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => issue.message);
                console.log(errorMessages)
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
                };
            }
        }
        
    }

    static async deletar(id) {
        // Regra de negócio e validações
        return await usuarioRepository.delete(id);
    }
}

export default usuarioService;