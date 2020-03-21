require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const db = require('./models');
const User = db.user;
const Comments = db.comments;
const Movie_Reviews = db.reviews;

const app = express();

app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

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
    Movie_Reviews.create(data).then(function (post) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(post));
    }).catch(function (e) {
        res.status(434).send('Unable to create the post')
    });
});


// GET MOVIES FROM REVIEW TABLE --WORKS
app.get('/api/movie_reviews', function (req, res) {
    Movie_Reviews.findAll().then((results) => {
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

app.listen(3005);
console.log('Movie Club is LIVE, 3005');
