import usuarioRepository from '../repositories/usuarioRepository.js'
import { z } from "zod";
import Jwt from "jsonwebtoken";

class AutenticacaoServices {
    static criarToken = async (data) => {
        const {email, senha} = data
        try {
            const loginSchema = z.object({
                email: z.string({
                    required_error: 'Email é obrigatório!',
                    invalid_type_error: 'Formato invalido, deve ser string!'
                }).email({
                    invalid_type_error: 'Email invalido!'
                }),
                senha: z.string({
                    required_error: 'Senha é obrigatório!',
                    invalid_type_error: 'Formato invalido, deve ser string!'
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
            });

            const loginValidated = loginSchema.required().parse(data)



            const usuario = await usuarioRepository.findMany(loginValidated)
            if (usuario.length === 0) {
                throw new Error('Email ou senha invalido')
            }
            const token = Jwt.sign({email, senha}, process.env.JWT_SECRET, {expiresIn: '30d'})
            console.log(token)
            return token

        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log('sim')
                const errosMessages = error.issues.map(error => error.message)
                throw errosMessages
            } else {
                console.log('não    ')
                throw error
            }
        }
    }
}

export default AutenticacaoServices