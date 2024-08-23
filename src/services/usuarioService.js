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
                invalid_type_error:"O Email tem que ser String"
            }).email({
                message:"Email invalido!"
            }).optional(),
        });
        const filtroValidated = filtroSchema.parse(filtro)
        const response = await UsuarioRepository.findMany(filtroValidated);
        if (response.length === 0) throw {
            message: "Nenhum usuário encontrado",
            code: 404,
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
static async listarPorID(id) {
    if (!id) {
      return res.status(404).json([{
        message: "ID não recebido",
        code: 404,
        error: true
      }])
    }
    else {
      let idusuario = parseInt(id)
      if (!idusuario) {
        throw new Error("ID invalido")
      } else {
        return await UsuarioRepository.findById(idusuario)
      }
    }
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
      const emailRepetido = await UsuarioRepository.findMany({ email: data.email })
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




      const response = await UsuarioRepository.create(usuarioValidated);
      const userResponse = { //para não exibir a senha do usuário no corpo da resposta
        id: response.id,
        nome: response.nome,
        email: response.email
      };
      return userResponse
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
      const emailRepetido = await UsuarioRepository.findMany({ email: data.email })

      if (!emailRepetido.length == 0) {
        if (id != emailRepetido[0].id) {
          throw {
            message: "Email Já Cadastrado!",
            code: 400,
            error: true
          }
        }

      }

      return await UsuarioRepository.update(id, usuarioValidated);



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
    const usuario = await UsuarioRepository.findMany({ id: id })
    if (!usuario[0]) {
      throw {
        code: 400,
        message: `Não existe usuário com este id: ${id}`,
        error: true
      }
    }
    return await UsuarioRepository.delete({ id: id });
  }
}

export default UsuarioService;