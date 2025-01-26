
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

        const result = Player.create({
            ...playerData,
            rating: Number(playerData.rating),
            years: Number(playerData.years),
        })

        return result
    },
    async attachCast(playerId, castId) {
        const player = await Player.findById(playerId)
        player.casts.push(castId)

        await player.save();

        return player
    }
}