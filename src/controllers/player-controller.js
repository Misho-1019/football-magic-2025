import { Router } from "express";
import playerService from "../services/player-service.js";

const playerController = Router();

playerController.get('/search', (req, res) => {
    const players = playerService.getAll()
    res.render('search', { players })
})

playerController.get('/create', (req, res) => {
    res.render('create')
})

playerController.post('/create', (req, res) => {
    const newPlayer = req.body;
    
    playerService.create(newPlayer)

    res.redirect('/');
})

playerController.get('/:playerId/details', (req, res) => {
    const playerId = req.params.playerId;

    const player = playerService.findPlayer(playerId);

    res.render('details', { player })
})

export default playerController;