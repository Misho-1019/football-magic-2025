import { Router } from "express";

import homeController from "./controllers/home-controller.js";
import playerController from "./controllers/player-controller.js";

const routes = Router();

routes.use(homeController)
routes.use(playerController)

routes.get('*', (req, res) => {
    res.render('404')
})

export default routes;