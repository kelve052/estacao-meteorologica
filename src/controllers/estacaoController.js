import env from "dotenv";
import EstacaoService from "../services/estacaoService.js";


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
      };
      const response = await EstacaoService.listar(filtro);
      res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: response.length > 1 ? "Estações encontradas com sucesso." : "Estação encontrada com sucesso.",
      });
    } catch (error) {
      return res.status(error.code || 500).json(error);
    };
  };

  // GET por ID - listar Usuario por ID 
  static listarPorId = async (req, res) => {
    try {
      const id = { id: req.params.id };
      const response = await EstacaoService.listarPorID(id)
      res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: "Estação encontrada com sucesso"
      })
    } catch (error) {
      return res.status(error.code || 500).json(error);
    }
  }

  static atualizar = async (req, res) => {
    try {
      const id = { id: req.params.id };
      const { nome, endereco, latitude, longitude, ip, status, usuario_id } = req.body;
      const data = {
        nome: nome,
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
        ip: ip,
        status: status,
        usuario_id: usuario_id,
      };
      const response = await EstacaoService.atualizar(id, data);
      res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: "Estação atualizada com sucesso.",
      });
    } catch (error) {
      return res.status(error.code || 500).json(error);
    };
  };

  static cadastrar = async (req, res) => {
    try {
      const { nome, endereco, latitude, longitude, ip, status, usuario_id } = req.body;
      const data = {
        nome: nome,
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
        ip: ip,
        status: status,
        usuario_id: usuario_id
      }
      const response = await EstacaoService.inserir(data);
      return res.status(201).json({
        data: response,
        error: false,
        code: 201,
        message: 'Estação cadastrada com sucesso.'
      });
    } catch (error) {
      return res.status(error.code || 500).json(error);
    };
  };

  // static deletar = async (req, res) => {
  //   try {
  //     if (!req.params.id) {
  //       return res.status(400).json([{ error: true, code: 400, message: "ID da estação é obrigatória" }]);
  //     }
  //     const id = req.params.id;
  //     const resposta = await EstacaoService.deletar(parseInt(id));
  //     return res.status(200).json({
  //       error: false,
  //       code: 200,
  //       message: "Estação excluída com sucesso",
  //       data: resposta
  //     });
  //   } catch (error) {
  //     return res.status(error.code || 500).json(error);
  //   }
  // }
};

export default Estacao;