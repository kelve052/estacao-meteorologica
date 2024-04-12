import Jwt from "jsonwebtoken";
import { prisma } from "../configs/prismaClient.js";

class Autenticacao{
    static login = async (req, res)=>{

      const errors = []
        try {
          const {email, senha} = req.body

          if(!email){
            errors.push('Campo email vasio')
          }

          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const validarEmail = regex.test(email);

          if(!validarEmail){
            errors.push('Email invaido!')
          }

          if(!senha){
            errors.push('Campo senha vasio')
          }

          if(errors.length != 0){
            throw Error()
          }

          const usuario  = await prisma.usuario.findFirst({
            where:{
              email: email
            }
          })

          await new ServicesAuth().servValidadeCredentials(email, senha)
          const token = Jwt.sign({email, senha}, process.env.JWT_SECRET, {expiresIn: '30d'})

          res.status(201).json({ 
            error: false, 
            code: 201,
            message: 'Token gerado com sucesso!',
            data: token
          })
        } catch (error) {
            res.status(400).json({
                error: false, 
                code: 400,
                message: errors,
        })
      }
      
    }
}
export default Autenticacao;