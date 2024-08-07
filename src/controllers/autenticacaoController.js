import AutenticacaoServices from "../services/autenticacaoSevices.js";

class Autenticacao {

  static login = async (req, res) => {
    try {
      const { email, senha } = req.body
      const data = { email, senha }
      const response = await AutenticacaoServices.criarToken(data)

      res.status(201).json({
        error: false,
        code: 201,
        message: 'Token gerado com sucesso!',
        token: 'token',
        data: response
      })
    } catch (error) {
      res.status(400).json({
        error: false,
        code: 400,
        message: error,
        data: false
      })
    }

  }
}
export default Autenticacao;