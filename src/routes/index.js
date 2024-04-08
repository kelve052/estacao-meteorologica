import express from "express";
import exemplo from "./exemploRouter.js";


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).json({Message: "Bem vindo ao projeto estação meteorológica!"})
    })

    app.use(    
        express.json(),
        exemplo // rota apenas para teste
        //demais rotas a serem criadas
    )
}

export default routes;