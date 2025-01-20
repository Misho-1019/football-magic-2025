import { v4 as uuid } from "uuid";
import players from "../players.js";

export default {
    findPlayer(playerId) {
        let result = players.find(player => player.id === playerId)

        return result;
    },
    create(playerData) {
        const newId = uuid();

        players.push({
            id: newId,
            ...playerData
        })
    }
}