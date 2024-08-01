import usuarioRepository from "../repositories/usuarioRepository.js";

class usuarioService {
    static async listar(filtro) {
        // Regra de negócio e validações
        return await usuarioRepository.findAll(filtro);
    }
    
    static async inserir(data) {
        // Regra de negócio e validações
        return await usuarioRepository.create(data);
    }

    static async atualizar(id, data) {
        // Regra de negócio e validações
        return await usuarioRepository.update(id, data);
    }

    static async deletar(id) {
        // Regra de negócio e validações
        return await usuarioRepository.delete(id);
    }
}

export default usuarioService;