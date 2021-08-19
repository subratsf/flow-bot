import express from 'express';
import feedbackRoute from './routes/feedbackRoute';
import helpRouter from './routes/helpRouter';
import ratingRouter from './routes/ratingsRoute';
import leaderBoard from './routes/leader-board';
import mediaRoute from './routes/media-route';

const app = express();
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

app.use(feedbackRoute);
app.use(helpRouter);
app.use(ratingRouter);
app.use(leaderBoard);
app.use(mediaRoute);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
