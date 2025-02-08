import { Schema, Types, model } from "mongoose";

const playerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters long!'],
        maxLength: 100,
        match: [/^[a-zA-Z ]+$/, 'Name should be alphanumeric and whitespaces only!'],
    },
    team: {
        type: String,
        required: [true, 'Current team is required!'],
        minLength: [3, 'Current team should be at least 3 characters long!'],
        maxLength: 100,
        match: [/^[a-zA-Z 0-9]+$/, 'Current team should be alphanumeric, digits and whitespaces only!'],
    },
    description: {
        type: String,
        minLength: 20,
        match: /^[a-zA-Z 0-9]+$/,
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
    headcoach: {
        type: String,
        minLength: [2, 'Headcoach should be at least 2 characters long!'],
        maxLength: 100,
        match: [/^[a-zA-Z ]+$/, 'Headcoach should be alphanumeric and whitespaces only!']
    },
    years: {
        type: Number,
        min: 1975,
        max: 2010,
    },
    position: {
        type: String,
        required: true,
        enum: [
            'goalkeeper',
            'defender',
            'midfield',
            'forward',
        ]
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 10,
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    },
})

const Player = model('Player', playerSchema)

export default Player;