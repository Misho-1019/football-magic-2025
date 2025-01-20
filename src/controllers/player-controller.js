import { Router } from "express";
import playerService from "../services/player-service.js";

const playerController = Router();

playerController.get('/create', (req, res) => {
    res.render('create')
})

playerController.post('/create', (req, res) => {
    const newPlayer = req.body;
    console.log(newPlayer);
    

    res.end();
})

playerController.get('/:playerId/details', (req, res) => {
    const playerId = req.params.playerId;

    const player = playerService.findPlayer(playerId);

    res.render('details', { player })
})

export default playerController;