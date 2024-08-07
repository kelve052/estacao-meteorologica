import estacaoRepository from "../repositories/estacaoRepository.js";

class estacaoService {
    static async listar(filtro) {
        // Regra de negócio e validações
        return await estacaoRepository.findAll(filtro);
    }

    static async listarPorID(id) {
      if (!id) {
        return res.status(404).json([{
          message: "ID não recebido",
          code: 404,
          error: true
        }])
      }
      else {
        let idestacao = parseInt(id)
        if (!idestacao) {
          throw new Error("ID invalido")
        } else {
          return await estacaoRepository.findById(idestacao)
        }
      }
    }

    static async inserir(data) {
        // Regra de negócio e validações
        return await estacaoRepository.create(data);
    }

    static async atualizar(id, data) {
        // Regra de negócio e validações
        return await estacaoRepository.update(id, data);
    }

    static async deletar(id) {
      const estacaoExists = await estacaoRepository.findById(id);
      if (!estacaoExists) {
        throw new Error('Estação não encontrada');
      }
        return await estacaoRepository.delete(id);
    }
}

export default estacaoService;