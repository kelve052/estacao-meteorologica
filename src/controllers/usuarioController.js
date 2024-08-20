import { prisma } from "../configs/prismaClient.js";
import UsuarioService from "../services/usuarioService.js";

class Usuario {
    static cadastrar = async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
            const resnponse = await UsuarioService.inserir({nome, email, senha})

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
                const response= await UsuarioService.atualizar(id, data)
           
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
        try{
          const id = parseInt(req.params.id)
          await UsuarioService.deletar(id)
          res.status(204).json()
         // a rota deletar só retorna o code: 204, não deve retornar mensagens e outras coisas
        } catch (error) {
          return res.status(error.code).json(error);
        }
    }
}

export default Usuario;