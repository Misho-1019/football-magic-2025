import { Router } from "express";
import playerService from "../services/player-service.js";

const router = Router();

router.get('/', async (req, res) => {
    const players = await playerService.getAll();
    res.render('home', { players })
})

router.get('/about', (req, res) => {
    res.render('about')
})

export default router;