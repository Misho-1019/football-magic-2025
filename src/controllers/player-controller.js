import { Router } from "express";
import playerService from "../services/player-service.js";

const routes = Router();

routes.get('/create', (req, res) => {
    res.render('create')
})

routes.get('/:playerId/details', (req, res) => {
    const playerId = req.params.playerId;

    const player = playerService.findPlayer(playerId);

    res.render('details', { player })
})

export default routes;