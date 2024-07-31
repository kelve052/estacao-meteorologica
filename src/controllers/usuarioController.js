import { prisma } from "../configs/prismaClient.js";

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
}

export default Usuario;