import { prisma } from "../configs/prismaClient.js";
import usuarioService from "../services/usuarioService.js"
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
    static listar = async (req, res) => {
        try {
            const { id, nome, email } = req.query;
      
            const filtro = {
              id: id,
              nome: nome,
              email: email
            }
      
            const response = await usuarioService.listar(filtro)
      
            res.status(200).json([{
                message: "Usuários encontrado com sucesso",
                code: 200,
                error: false,
                data: response
              }])
      
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