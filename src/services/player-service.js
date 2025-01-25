import { v4 as uuid } from "uuid";
import players from "../players.js";
import Player from "../models/Player.js";

export default {
    getAll(filter = {}) {
        let result = Player.find({});

        if (filter.search) {
            result = result.where({ name: filter.search })
        }

        if (filter.team) {
            result = result.where({ team: filter.team })
        }

        if (filter.years) {
            result = result.where({ years: Number(filter.years) })
        }

        return result;
    },
    findPlayer(playerId) {
        let result = Player.findById(playerId)

        return result;
    },
    create(playerData) {
        const newId = uuid();

        players.push({
            id: newId,
            ...playerData,
            rating: Number(playerData.rating),
        })
    }
}