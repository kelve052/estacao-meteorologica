import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";

env.config();

class Usuario{
  static criarUsuario = async (req, res) => {
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
}
export default Usuario;