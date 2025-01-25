import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import routes from "./routes.js";
import showRatingHelper from "./helpers/rating-helpers.js";

const app = express();

try {
    const uri = 'mongodb://localhost:27017/football-magic-jan2025';
    await mongoose.connect(uri)

    console.log('DB Connected successfully!');
} catch (err) {
    console.log('Cannot connect to DB');
    console.error(err.message);
    
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRatingHelper
    }
}))
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.use('/static', express.static('src/static'))
app.use(express.urlencoded({ extended: false }))

app.use(routes)

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))