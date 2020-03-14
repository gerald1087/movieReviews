const config = {
    host: 'localhost',
    port: 5432,
    database: 'movie_review',
    user: 'postgres'
};
// const config = {
    
//     host: process.env.DB_HOST,
//     port: 5432,
//     database: process.env.DB_NAME,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,

// }
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const pgp = require('pg-promise')();
const db = pgp(config);

const Sequelize = require('sequelize')

const CommentsModel = require('./models/comments');
// const UserModel = require('./models/users');
// const MovieReviewsModel = require('./models/moviereviews');


//COMMENTS
//GET all Comments
app.get('/api/comments', function (req, res) {

    comments.findAll({include: [Users]}).then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });

});

//GET 1 Comment
app.get('/api/comments/:id', function (req, res) {
    let id = req.params.id;

    db.one("SELECT * FROM comments WHERE id=$1", [id])
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
        .catch((e) => {
            console.error(e);
        });
});

//GET comments by user
app.get('/api/comments/user/:id', function (req, res) {
    let id = req.params.id;

    db.query('SELECT * FROM comments JOIN users on comments.user_id = users.id WHERE users.id=$1', [id])
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
        .catch((e) => {
            console.error(e);
        });
});

//POST Comments
app.post('/api/comments', function (req, res) {

    let data = {
        user_id: req.body.user_id,
        moviereview_id: req.body.moviereview_id,
        comment: req.session.comment,
        comment_date: req.body.comment_date
    };

    if(data.title && data.body && data.user_id) {
        comments.create(data).then(function (post) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(post));
        }).catch(function(e){
            res.status(434).send('Unable to create the post')
        });
    } else {
    res.status(434).send('Title, body and username is required to making a post')
    }
});

//DELETE 1 Comment 
app.delete('/api/comments/:id', function (req, res) {
    let id = req.params.id;
    let query = `DELETE FROM comments WHERE id=${id}`;

    db.result(query)
        .then((result) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        })
        .catch((e) => {
            console.error(e);
        });
});

//USERS
//GET all Users
app.get('/api/users', function (req, res) {

    Users.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

//Get 1 User
app.get('/api/users/:id', function (req, res) {

    let id = req.params.id;
    
    Users.findOne({ where: {id: id} }).then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function (e) {
        console.log(e);
        res.status(434).send('error retrieving user info');
    })
});

//Delete a User
app.delete('/api/deleteprofile/:id', (req, res) => {

    let userId = req.params.id
    
        Users.destroy({ where: { id: userId } }).then(function (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        }).catch(function (e) {
            console.log(e, "server error message")
            res.status(434).send('unable to delete user')
        })
    
    });

 //MOVIE REVIEWS
 //GET All Movie Reviews   
 app.get('/api/movie_reviews', function (req, res) {

    Users.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

//Get 1 Movie Review

//POST 1 Movie Review

//UPDATE 1 Movie Review

//Delete 1 Movie Review


app.listen(3005);
console.log('Movie Club is active');