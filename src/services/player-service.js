import { v4 as uuid } from "uuid";
import players from "../players.js";
import Player from "../models/Player.js";

export default {
    getAll(filter = {}) {
        let result = Player.find({});

        // if (filter.search) {
        //     result = result.filter(player => player.name.toLowerCase().includes(filter.search.toLowerCase()))
        // }

        // if (filter.team) {
        //     result = result.filter(player => player.team.toLowerCase().includes(filter.team.toLowerCase()))
        // }

        // if (filter.years) {
        //     result = result.filter(player => player.years == filter.years)
        // }
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