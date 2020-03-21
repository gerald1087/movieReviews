require('dotenv').config();

const config = {

    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
};

var express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const pgp = require('pg-promise')();
const db = pgp(config);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
const sequelize = new Sequelize(process.env.DATABASE_URL || connectionString, {

    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

const CommentsModel = require('./models/comments');
const UserModel = require('./models/user');
const MovieReviewsModel = require('./models/reviews');

const User = UserModel(sequelize, Sequelize)
const Comments = CommentsModel(sequelize, Sequelize)
const MovieReviews = MovieReviewsModel(sequelize, Sequelize)

const app = express();

app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// REGISTER ROUTE --WORKS
app.post('/api/register', function (req, res) {
    console.log(req.body)

    let data = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        is_admin: req.body.is_admin,
        age: req.body.age,
        gender: req.body.gender
    };
    console.log(data)
    if (data.name && data.email && data.password && data.username) {
        console.log(data)
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        data['password'] = hash;
        User.create(data).then(function (user) {
            console.log(user)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        });

    } else {

        res.status(434).send('Name, email, password is required to register')
    }

});

//LOGIN ROUTE --WORKS
app.post('/api/login', function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    console.log(email)
    if (email && password) {
        User.findOne({
            where: {
                email: email
            },
        }).then((results) => {
            console.log(results)
            bcrypt.compare(password, results.password).then(function (matched) {
                if (matched) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                } else {
                    res.status(434).send('Email/Password combination did not match')
                }
            });
        }).catch((e) => {
            res.status(434).send('Email does not exist in the database')
        });
    } else {
        res.status(434).send('Both email and password is required to login')
    }

});

// POST TO MOVIE REVIEW TABLE --WORKS
app.post('/api/movie_reviews', function (req, res) {

    let data = {
        title: req.body.title,
        image: req.body.image,
        year: req.body.year
    };
    MovieReviews.create(data).then(function (post) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(post));
    }).catch(function (e) {
        res.status(434).send('Unable to create the post')
    });
});


// GET MOVIES FROM REVIEW TABLE --WORKS
app.get('/api/movie_reviews', function (req, res) {
    MovieReviews.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function (e) {
        console.log(e);
        res.status(434).send('error retrieving movies');
    })
});

//Get 1 Movie Review /WORKING
app.get('/api/movie_reviews/:id', function (req, res) {
    let id = req.params.id;

    Movie_Reviews.findOne({ where: { id: id } })
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
        .catch((e) => {
            console.error(e);
        });
});

//UPDATE 1 Movie Review /~Working (got confirmation log success
app.put('/api/movie_reviews/:id', function (req, res, next) {
    let id = req.params.id;

    Movie_Reviews.update(
        {
            movie: req.body.movie,
            roomCategory: req.body.roomCategory,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        },

        { where: { id: id } }
    ).then(function () {

        console.log("Listing updated successfully!");

    }).error(function (err) {

        console.log("Listing update failed !");
    });

})

//Delete 1 Movie Review /WORKING
app.delete('/api/deletereview/:id', (req, res) => {

    let reviewId = req.params.id
    Movie_Reviews.destroy({ where: { id: reviewId } }).then(function (user) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    }).catch(function (e) {
        console.log(e, "server error message")
        res.status(434).send('Unable to delete Review Session')
    })

});

app.listen(3005);
console.log('Movie Club is LIVE, 3005');
