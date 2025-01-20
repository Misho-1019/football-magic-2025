import { Router } from "express";

const routes = Router();

routes.get('/create', (req, res) => {
    res.render('create')
})

export default routes;