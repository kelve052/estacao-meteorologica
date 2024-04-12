import Jwt from "jsonwebtoken";

class Autenticacao{
    login = async (req, res)=>{
        try {
          const {email, password} = req.body
          await new ServicesAuth().servValidadeCredentials(email, password)
          const token = Jwt.sign({email, password}, process.env.JWT_SECRET, {expiresIn: '30d'})

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
                message: error.message,
        })
      }
      
    }
}
export default Autenticacao;