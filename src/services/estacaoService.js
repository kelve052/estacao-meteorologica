import estacaoRepository from "../repositories/estacaoRepository.js";

class estacaoService {
    static async listar(filtro) {
        // Regra de negócio e validações
        return await estacaoRepository.findAll(filtro);
    }
    static async listarPorID(id) {
      return await estacaoRepository.findById(id);
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