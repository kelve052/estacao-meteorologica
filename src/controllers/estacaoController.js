import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import estacaoService from "../services/estacaoService.js";


env.config();

class Estacao {

  static listar = async (req, res) => {
    try {
      const { id, nome, endereco, latitude, longitude, ip, status, usuario_id } = req.query;

      const filtro = {
        id: id,
        nome: nome,
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
        ip: ip,
        status: status,
        usuario_id: usuario_id
      }

      const response = await estacaoService.listar(filtro)

      res.status(200).json(response)

    } catch (error) {
      res.send(error)
    }
  }
  // GET por ID - listar Usuario por ID 
  static listarPorId = async (req, res) => {
    try {
      let estacao = await estacaoService.listarPorID(req.params.id)
      console.log(req.params.id)

      if (!estacao) {
        throw new Error("Estação não encontrada");
      }
      res.status(200).json([{
        message: "Estação encontrada com sucesso",
        code: 200,
        error: false,
        data: estacao
      }])
    } catch (err) {
      console.error(err);
      res.status(400).json([{
        message: err.message,
        code: 400,
        error: true
      }])
    }
  }

  static atualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, endereco, latitude, longitude, ip, status, usuario_id, dados_diarios } = req.body;
      const parsedId = parseInt(id);
      const data = {
        nome: nome,
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
        ip: ip,
        status: status,
        usuario_id: usuario_id,
        dados_diarios: dados_diarios,
      }
      const response = await estacaoService.atualizar(parsedId, data);
      if (!response) {
        throw new Error("Não foi possível atualizar estação");
      }
      res.status(200).json({
        message: "Estação atualizada com sucesso.",
        error: false,
        code: 200,
        data: response,
      });
    } catch (error) {
      return res.status(error.code).json(error);
    }

  }

  static cadastrar = async (req, res) => {
    try {
      const { nome, endereco, latitude, longitude, ip, status, usuario_id } = req.body;
      const erros = [];

      const data = {
        nome: nome,
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
        ip: ip,
        status: status,
        usuario_id: usuario_id
      }

      if (erros.length > 0) {
        return res.status(400).json({
          message: erros,
          code: 400,
          error: true,
        });
      }

      const response = await estacaoService.inserir(data);

      return res.status(201).json({
        data: response,
        message: 'Estação cadastrada com sucesso!',
        code: 201,
        error: false
      });
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };

//   static deletar = async (req, res) => {
//     try {
//       if (!req.params.id) {
//         return res.status(400).json([{ error: true, code: 400, message: "ID da estação é obrigatória" }]);
//       }

//       const id = req.params.id;

//       const resposta = await estacaoService.deletar(parseInt(id));

//       return res.status(200).json({
//         error: false,
//         code: 200,
//         message: "Estação excluída com sucesso",
//         data:resposta
//       });

//     } catch (error) {
//       if (error.message === 'Estação não encontrada') {
//         return res.status(400).json([{ error: true, code: 400, message: error.message }]);
//       }
//       console.error(err);
//       return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
//     }
//   }

}

export default Estacao;