import { Router } from "express";
import playerService from "../services/player-service.js";
import castService from "../services/cast-service.js";

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
    const userId = req.user?.id;
    
    await playerService.create(newPlayer, userId)

    res.redirect('/');
})

playerController.get('/:playerId/details', async (req, res) => {
    const playerId = req.params.playerId;

    const player = await playerService.findPlayerWithCasts(playerId);

    res.render('player/details', { player })
})

playerController.get('/:playerId/attach-cast', async (req, res) => {
    const playerId = req.params.playerId;

    const player = await playerService.findPlayer(playerId)
    const casts = await castService.getAll({ exclude: player.casts })

    res.render('player/attach-cast', { player, casts })
})

playerController.post('/:playerId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const playerId = req.params.playerId;

    await playerService.attachCast( playerId, castId)

    res.redirect(`/players/${playerId}/details`)
})

export default playerController;