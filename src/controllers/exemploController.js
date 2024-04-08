import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";


env.config();

class ClasseExemplo {

  static listar = async (req, res) => {
    try {
      const response = await prisma.clientes.findMany()
      res.status(200).json({response: response})
    } catch (error) {
      res.status(400).json({error: error})
    }
  }
}

export default ClasseExemplo;