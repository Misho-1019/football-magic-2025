import { Router } from "express";

const routes = Router();

routes.get('/create', (req, res) => {
    res.render('create')
})

routes.get('/:playerId/details', (req, res) => {
    res.render('details')
})

export default routes;