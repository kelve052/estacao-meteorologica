import dadosService from "../services/dadosService.js";

class Dados {
    static async listar(req, res) {
        try {
            const { temperature, humidity, rainfall, wind_speed_kmh, data_hora } = req.query;

            const filtro = {
                temperature: temperature,
                humidity: humidity,
                rainfall: rainfall,
                wind_speed_kmh: wind_speed_kmh,
                data_hora: data_hora,
            }

            const response = await dadosService.listar(filtro)

            res.status(200).json(response)

        } catch (error) {
            res.status(error.code).json(error)
        }
    }

    static async inserir(req, res) {
        try {
            const { temperature, humidity, rainfall, wind_speed_kmh } = req.body;

            const data = {
                temperature: temperature,
                humidity: humidity,
                rainfall: rainfall,
                wind_speed_kmh: wind_speed_kmh,
                data_hora: new Date(),
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