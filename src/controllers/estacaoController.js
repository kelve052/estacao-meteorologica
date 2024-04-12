import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";


env.config();

class Estacao {

  static listar = async (req, res) => {
    try {
      const response = await prisma.estacao.findMany()
      res.status(200).json({response: response})
    } catch (error) {
      res.status(400).json({ 
        error: true, 
        code: 400, 
        message: error.message
      }
)
    }
  }
  // GET por ID - listar Usuario por ID 
  static listarPorID = async (req, res) => {
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
        error:false,
        data: estacao}])
    } catch (err) {
      console.error(err);
      res.status(400).json([{           
      message: err.message,
      code: 400,
      error:true }])
    }
  }



}

export default Estacao;