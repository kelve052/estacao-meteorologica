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

          const usuario  = await prisma.usuario.findFirst({
            where:{
              email: email
            }
          })

          if(!usuario){
            errors.push('o email inserido não pertence a nehum usuário!')
          }


          if(errors.length != 0){
            throw Error()
          }

          if(usuario.senha != senha){
            errors.push('Senha incorreta!')
          }

          if(errors.length != 0){
            throw Error()
          }
          
          const token = Jwt.sign({email, senha}, process.env.JWT_SECRET, {expiresIn: '30d'})

          res.status(201).json({ 
            error: false, 
            code: 201,
            message: 'Token gerado com sucesso!',
            token: token,
            data: usuario
          })
        } catch (error) {
          console.log(error.message)
          errors.push(error.message)
            res.status(400).json({
                error: false, 
                code: 400,
                message: errors,
        })
      }
      
    }
}
export default Autenticacao;