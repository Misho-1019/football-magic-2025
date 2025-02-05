import { Router } from "express";
import playerService from "../services/player-service.js";
import castService from "../services/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const playerController = Router();

playerController.get('/search', async (req, res) => {
    const filter = req.query;

    const players = await playerService.getAll(filter)
    res.render('search', { players, filter })
})

playerController.get('/create', isAuth, (req, res) => {
    res.render('create')
})

playerController.post('/create', isAuth, async (req, res) => {
    const newPlayer = req.body;
    const userId = req.user?.id;
    
    await playerService.create(newPlayer, userId)

    res.redirect('/');
})

playerController.get('/:playerId/details', async (req, res) => {
    const playerId = req.params.playerId;

    const player = await playerService.findPlayerWithCasts(playerId);
    const isCreator = player.creator?.equals(req.user?.id)

    res.render('player/details', { player, isCreator })
})

playerController.get('/:playerId/attach-cast', isAuth, async (req, res) => {
    const playerId = req.params.playerId;

    const player = await playerService.findPlayer(playerId)
    const casts = await castService.getAll({ exclude: player.casts })

    res.render('player/attach-cast', { player, casts })
})

playerController.post('/:playerId/attach-cast', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const playerId = req.params.playerId;

    await playerService.attachCast( playerId, castId)

    res.redirect(`/players/${playerId}/details`)
})

playerController.get('/:playerId/delete', isAuth, async (req, res) => {
    const playerId = req.params.playerId;
    const player = await playerService.findPlayer(playerId)

    if (!player.creator?.equals(req.user?.id)) {
        return res.redirect('/404')
    }

    await playerService.delete(playerId)

    res.redirect('/');
})

playerController.get('/:playerId/edit', isAuth, async (req, res) => {
    const playerId = req.params.playerId;
    const player = await playerService.findPlayer(playerId)
    
    const positions = getPositionsViewData(player.position)

    res.render('player/edit', { player, positions })
})

playerController.post('/:playerId/edit', isAuth, async (req, res) => {
    const playerData = req.body;
    const playerId = req.params.playerId;

    await playerService.update(playerId, playerData);

    res.redirect(`/players/${playerId}/details`)
})

function getPositionsViewData(position) {
    const positionsMap = {
        'goalkeeper': 'Goalkeeper',
        'defender': 'Defender',
        'midfield': 'Midfield',
        'forward': 'Forward',
    }

    const positions = Object.keys(positionsMap).map(value => ({
        value,
        label: positionsMap[value],
        selected: value === position ? 'selected' : '',
    }))

    return positions;
}

export default playerController;