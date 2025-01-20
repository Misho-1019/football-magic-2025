import { Router } from "express";
import playerService from "../services/player-service.js";

const routes = Router();

routes.get('/create', (req, res) => {
    res.render('create')
})

routes.get('/:playerId/details', (req, res) => {
    const playerId = req.params.playerId;

    const player = playerService.findPlayer(playerId);
    console.log(player);
    

    res.render('details')
})

export default routes;