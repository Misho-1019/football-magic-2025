import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [3, 'Name should be at least 3 characters long!'],
        match: [/^[a-zA-Z ]+$/, 'Name should be alphanumeric and whitespaces only!']
    },
    age: {
        type: Number,
        min: 15,
        max: 50,
    },
    established: {
        type: String,
        minLength: 10,
        match: /^[0-9]+$/
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return /^https?:\/\//.test(v)
            },
            message: (props) => `${props.value} is invalid image url!`,
        }
    },
})

const Cast = model('Cast', castSchema)

export default Cast;