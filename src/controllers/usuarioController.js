import { prisma } from "../configs/prismaClient.js";

class Usuario {
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