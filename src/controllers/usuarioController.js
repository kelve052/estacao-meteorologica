import { response } from "express";
import { prisma } from "../configs/prismaClient.js";
import usuarioService from "../services/usuarioService.js";

class Usuario {
    static cadastrar = async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
            const resnponse = await usuarioService.inserir({nome, email, senha})

            return res.status(201).json({
                data: resnponse,
                message: 'usuario cadastrado com sucesso!',
                code: 201,
                error: false
            });
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    static atualizar = async (req, res) => {
        try {
            const {id} = req.params
                const {nome,email,senha}= req.body
                const data = {nome,email,senha}
                const response= await usuarioService.atualizar(id, data)
           
            res.status(200).json({
                message: "Usuario atualizado com sucesso!!!",
                error: false,
                code: 200,
                data: response,
            });
        } catch (error) {
            return res.status(error.code).json(error);
        }

    }

    static deletar = async (req, res) => {
        const { id } = Number(req.params);
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