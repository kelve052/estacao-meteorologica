import dadosService from "../services/dadosService";

class Dados {
    static async listar(req, res) {
        try {
            const { id, temperatura, umidade, pluviosidade, velocidade_vento, direcao_vento, data_hora, estacao_id } = req.query;

            const filtro = {
                id: id,
                temperatura: temperatura,
                umidade: umidade,
                pluviosidade: pluviosidade,
                velocidade_vento: velocidade_vento,
                direcao_vento: direcao_vento,
                data_hora: data_hora,
                estacao_id: estacao_id
            }

            const response = await dadosService.listar(filtro)

            res.status(200).json(response)

        } catch (error) {
            res.status(error.code).json(error)
        }
    }

    static async inserir(req, res) {
        try {
            const { temperatura, umidade, pluviosidade, velocidade_vento, direcao_vento } = req.body;

            const data = {
                temperatura: temperatura,
                umidade: umidade,
                pluviosidade: pluviosidade,
                velocidade_vento: velocidade_vento,
                direcao_vento: direcao_vento,
            }

            const response = await dadosService.inserir(data)

            return res.status(201).json({
                data: response,
                message: 'Dados salvos com sucesso!',
                code: 201,
                error: false
            });
        } catch (error) {
            return res.status(error.code).json(error);
        }
    }
}

export default Dados