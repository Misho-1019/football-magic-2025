import players from "../players.js";

export default {
    findPlayer(playerId) {
        let result = players.find(player => player.id === playerId)

        return result;
    }
}