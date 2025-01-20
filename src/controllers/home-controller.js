import { Router } from "express";
import players from "../players.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { players })
})

router.get('/about', (req, res) => {
    res.render('about')
})

export default router;