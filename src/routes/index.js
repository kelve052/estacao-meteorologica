import express from "express";
import estacoes from "./estacaoRouter.js"
import autenticacao from "./autenticacaoRouter.js";
import usuarios from "./usuarioRouter.js";
import dados from "./dadosRouter.js"



const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).json({ Message: "Bem vindo ao projeto estação meteorológica!" })
    })

    app.use(
        express.json(),
        estacoes,
        autenticacao,
        usuarios,
        dados
    )
}

export default routes;