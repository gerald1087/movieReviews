const config = {
    host: 'localhost',
    port: 5432,
    database: 'movie_review',
    user: 'postgres'
};

//env config below
// const config = {
    
//     host: process.env.DB_HOST,
//     port: 5432,
//     database: process.env.DB_NAME,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,

// }
// require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pgp = require('pg-promise')();
const db = pgp(config);
const Sequelize = require('sequelize')
const app = express();


const sequelize = new Sequelize('movie_review', 'postgres', '', {
// Alternate env line below
// const sequelize = new Sequelize(process.env.DATABASE_URL || connectionString, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());


const CommentsModel = require('./models/comments');
const UserModel = require('./models/user');
const Movie_ReviewModel = require('./models/movie_review');

const Users = UserModel(sequelize, Sequelize);
const Movie_Reviews = Movie_ReviewModel(sequelize, Sequelize);
const Comments = CommentsModel(sequelize, Sequelize);

Comments.belongsTo(Users, {foreignKey: 'user_id'});
Users.hasMany(Comments, {foreignKey: 'user_id'});

//COMMENTS
//GET all Comments /WORKING
app.get('/api/comments', function (req, res) {

    Comments.findAll({include: [Users]}).then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function (e) {
        console.log(e);
        res.status(434).send('error retrieving comments');
    })

});

//GET 1 Comment /WORKING
app.get('/api/comments/:id', function (req, res) {
    db.query('SELECT * FROM comments JOIN users on comments.user_id = users.id')
    .then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .catch((e) => {
        console.error(e);
    });
});
//GET comments by user /WORKING
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

    if(data.comment && data.moviereview_id && data.user_id) {
        Comments.create(data).then(function (post) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(post));
        }).catch(function(e){
            res.status(434).send('Unable to post the comment')
        });
    } else {
    res.status(434).send('Logged user, movie ID and a comment is required to leave a comment')
    }
});

//DELETE 1 Comment /WORKING
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
app.get('/api/movie_reviews/:id', function (req, res) {
    let id = req.params.id;

    db.one("SELECT * FROM posts WHERE id=$1", [id])
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
        .catch((e) => {
            console.error(e);
        });
});

//POST 1 Movie Review
app.post('/api/movie_reviews', function (req, res) {

    let data = {
        user_id: req.session.user_id,
        roomCategory: req.body.roomCategory,
        start_date: req.body.start_date,
        end_date: req.body.end_date
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
//UPDATE 1 Movie Review
app.put('/api/movie_review/:id', function (req, res) {
    let id = req.params.id;
    let data = {
        id: id,
        roomCategory: req.body.roomCategory,
        movie: req.body.movie,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    };
    let query = "UPDATE posts SET roomCategory=${roomCategory}, moview=${moview}, start_date=${start_date}, end_date=${end_date} WHERE id=${id}";

    db.one(query, data)
        .then((result) => {

            db.one("SELECT * FROM movie_reviews JOIN users ON movie_reviews.user_id=users.id WHERE movie_reviews.id=$1", [result.id])
                .then((results) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                })
                .catch((e) => {
                    console.error(e);
                });

        })
        .catch((e) => {
            console.error(e);
        });
});

//Delete 1 Movie Review
app.delete('/api/deletereviewlisting/:id', (req, res) => {

    let reviewId = req.params.id
        Movie_Reviews.destroy({ where: { id: userId } }).then(function (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        }).catch(function (e) {
            console.log(e, "server error message")
            res.status(434).send('Unable to delete Review Session')
        })
    
    });


app.listen(3005);
console.log('Movie Club is LIVE, 3005');