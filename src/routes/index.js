import express from "express";
import exemplo from "./exemploRouter.js";
import estacoes from "./estacaoRouter.js"


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).json({Message: "Bem vindo ao projeto estação meteorológica!"})
    })

    app.use(    
        express.json(),
        estacoes
        // rota apenas para teste
        //demais rotas a serem criadas
    )
}

export default routes;