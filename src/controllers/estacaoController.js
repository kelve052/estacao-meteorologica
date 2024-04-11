import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";


env.config();

class Estacao {

  static listar = async (req, res) => {
    try {
      const response = await prisma.estacao.findMany()
      res.status(200).json({ response: response })
    } catch (error) {
      res.status(400).json({
        error: true,
        code: 400,
        message: error.message
      }
      )
    }
  }

  //rota kamila cadastrar estacao

  static cadastrarEstacao = async (req, res) => {
    try {
      const { nome, endereco, latitude, longitude, ip, status, usuario_id } = req.body;

      const erros = [];

      if (!nome) {
        erros.push({ error: true, code: 400, message: "Nome não informado: " })
      }
      if (!endereco) {
        erros.push({ error: true, code: 400, message: "Endereço não informado: " })
      }
      if (!latitude) {
        erros.push({ error: true, code: 400, message: "Latitude não informado: " })
      }
      if (!longitude) {
        erros.push({ error: true, code: 400, message: "Longitude não informado: " })
      }
      if (!ip) {
        erros.push({ error: true, code: 400, message: "Ip não informado: " })
      }
      if (!status) {
        erros.push({ error: true, code: 400, message: "Status não informado: " })
      }


    } catch (error) {
      console.log(error);
      res.status(400).json({ messagemErro: error.message });
    }
  };


}

export default Estacao;