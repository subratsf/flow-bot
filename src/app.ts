import express from 'express';
import ratingRouter from './routes/ratingsRoute';

const app = express();
require('dotenv').config()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }))
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( `Server is running on ${port}.` );
} );

app.use(ratingRouter);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
