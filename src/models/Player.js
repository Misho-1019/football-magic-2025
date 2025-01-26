import { Schema, Types, model } from "mongoose";

const playerSchema = new Schema({
    name: String,
    team: String,
    description: String,
    imageUrl: String,
    headcoach: String,
    years: Number,
    position: String,
    rating: Number,
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
})

const Player = model('Player', playerSchema)

export default Player;