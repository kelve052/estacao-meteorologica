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
      res.status(error.code).json(error)
    }
  }
  // GET por ID - listar Usuario por ID 
  static listarPorId = async (req, res) => {
    try {
      const estacao = await prisma.estacao.findFirst({
        //filtro
        where: {
          id: parseInt(req.params.id),
        },
        select: {
          id: true,
          nome: true,
          endereco: true,
          latitude: true,
          longitude: true,
          ip: true,
          status: true,
          usuario_id: true,
        }
      }
      );
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
        message: err,
        code: 400,
        error: true
      }])
    }
  }

  static atualizar = async (req, res) => {
    try {
      const { id } = req.params
      const {nome, endereco,latitude, longitude,ip,status,usuario_id } = req.body
      const data = { nome, endereco,latitude, longitude,ip,status,usuario_id }
      const response = await estacaoService.atualizar(id, data)

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

  static deletar = async (req, res) => {
    const { id } = req.params;
    const intId = parseInt(id);
    try {
      const EstacaoById = await prisma.estacao.findUnique({
        where: {
          id: intId
        }
      })
      if (!EstacaoById) {
        res.status(400).json({
          error: true,
          code: 400,
          message: "Estação não encontrada."
        });
        return;
      } else {
        const deleteEstacao = await prisma.estacao.delete({
          where: {
            id: intId
          },
        });
        res.status(200).json({
          error: false,
          code: 201,
          message: 'Estação deletada com sucesso!',
          data: JSON.parse(deleteEstacao)
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

export default Estacao;