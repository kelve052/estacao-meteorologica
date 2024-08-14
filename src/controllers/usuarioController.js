import { prisma } from "../configs/prismaClient.js";
import usuarioService from "../services/usuarioService.js"

class Usuario {
    static cadastrar = async (req, res) => {
        try {
            const { nome, idade, email, senha } = req.body;
            const erros = [];

            if (!nome) {
                erros.push({ error: true, code: 400, message: "Nome não informado" });
            }
            if (!idade) {
                erros.push({ error: true, code: 400, message: "idade não informada" });
            }
            if (!email) {
                erros.push({ error: true, code: 400, message: "email não informado" });
            }
            if (!senha) {
                erros.push({ error: true, code: 400, message: "senha não informada" });
            }


            if (erros.length > 0) {
                return res.status(400).json({
                    message: erros,
                    code: 400,
                    error: true,
                });
            }

            // Verificar se o email usuário existe
            const emailUser = await prisma.usuario.findFirst({
                where: {
                    email: email,
                },
            });

            if (emailUser) {
                return res.status(400).json({
                    message: "Usuario ja Cadastrado",
                    code: 400,
                    error: true,
                });
            }

            const inserirUsuario = await prisma.usuario.create({
                data: {
                    nome: nome,
                    idade: idade,
                    email: email,
                    senha: senha
                }
            });

            return res.status(201).json({
                data: inserirUsuario,
                message: 'usuario cadastrado com sucesso!',
                code: 201,
                error: false
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: error.message,
                code: 400,
                error: true,
            });
        }
    };

    static atualizar = async (req, res) => {
        try {
            const { id } = req.params;
            const intId = parseInt(id)
            const usuarioById = await prisma.usuario.findUnique({
                where: {
                    id: intId
                }
            });
            if (!usuarioById) {
                return res.status(400).json({
                    message: "Usuario não encontrado.",
                    code: 400,
                    error: true,
                });
            }
            for (const value in req.body) {
                if (!req.body[value]) {
                    return res.status(400).json({
                        message: `Campo ${value} não específicado.`,
                        code: 400,
                        error: true,
                    });
                }
            }
            const usuarioAtualizado = await prisma.usuario.update({
                where: {
                    id: intId
                },
                data: {
                    nome: req.body.nome,
                    idade: req.body.idade,
                    email: req.body.email,
                    senha: req.body.senha

                }
            });
            res.status(200).json({
                message: "Usuario atualizado com sucesso!!!",
                error: false,
                code: 200,
                data: usuarioAtualizado,
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                code: 400,
                error: true,
            });
        }

    }

    static deletar = async (req, res) => {
        const { id } = req.params;
        const intId = parseInt(id);
        try {
            const usuarioById = await prisma.usuario.findUnique({
                where: {
                    id: intId
                }
            })
            if (!usuarioById) {
                res.status(400).json({
                    error: true,
                    code: 400,
                    message: "Usuário não encontrado."
                });
                return;
            }
            const estacaoById = await prisma.estacao.findMany({
                where: {
                    usuario_id: intId
                }
            });
            if (estacaoById.length == 0) {
                const deleteUser = await prisma.usuario.delete({
                    where: {
                        id: intId
                    },
                });
                res.status(200).json({
                    response: deleteUser
                });
            } else {
                res.status(400).json({
                    error: true,
                    code: 400,
                    message: "Este usuário não pode ser deletado, existem estações vinculadas."
                });
            }
        } catch (error) {
            res.status(400).json({
                error: true,
                code: 400,
                message: error.message
            });
        }
    }
    static listar = async (req, res) => {
        try {
            const { id, nome, email } = req.query;
      
            const filtro = {
              id: id,
              nome: nome,
              email: email
            }
      
            const response = await usuarioService.listar(filtro)
      
            res.status(200).json(response)
      
          } catch (error) {
            res.send(error)
          }
        }
        static listarPorId = async (req, res) => {
            try {
              const id = req.params.id
              let usuario = await usuarioService.listarPorID(id)
        
              if (!usuario) {
                throw new Error("Usuário não encontrado");
              }
              res.status(200).json([{
                message: "Usuário encontrado com sucesso",
                code: 200,
                error: false,
                data: usuario
              }])
            } catch (err) {
              
              res.status(400).json([{
                message: err.message,
                code: 400,
                error: true
              }])
            }
          }
    }
    


export default Usuario;