import { Router } from "express";
import playerService from "../services/player-service.js";

const playerController = Router();

playerController.get('/search', async (req, res) => {
    const filter = req.query;

    const players = await playerService.getAll(filter)
    res.render('search', { players, filter })
})

playerController.get('/create', (req, res) => {
    res.render('create')
})

playerController.post('/create', async (req, res) => {
    const newPlayer = req.body;
    
    await playerService.create(newPlayer)

    res.redirect('/');

    res.end()
})

playerController.get('/:playerId/details', async (req, res) => {
    const playerId = req.params.playerId;

    const player = await playerService.findPlayer(playerId);

    res.render('player/details', { player })
})

export default playerController;