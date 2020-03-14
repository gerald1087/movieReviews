require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const db = require('./models');
const Users = db.user;
const Comments = db.comments;
const MovieReviews = db.movie_review;

// load passport configuration middleware
const { passportLoginRoute, passportJWTStrategy } = require('./middleware/passport-config');
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

// init passport with passportJWTStrategy
passportJWTStrategy({ passport, Users });
// add login route
passportLoginRoute({ app, Users });

// API get all users
app.get('/api/users/', (req, res) => {

    Users.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function (e) {
        console.log(e);
        res.status(434).send('Error retrieving Users');
    })

});

// API get target user
app.get('/api/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    let id = req.params.id;

    Users.findOne({ where: { id: id } }).then(results => {

        if (results) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        } else {
            res.status(404).send('User does not exist is DB');
        }

    }).catch((e) => {
        console.log(e);
        res.status(500).send('error retrieving info on target User');
    })

});

// API add user
app.post('/api/users/register', (req, res) => {

    // //default admin to false if req.body.admin is null
    // if (req.body.admin == null) {
    //     req.body.admin = false;
    // }
console.log(req.body);
    const data = {
        name: req.body.name.trim(),
        username: req.body.username.trim(),
        email: req.body.email.toLowerCase().trim(),
        password: req.body.password.trim(),
        gender: req.body.gender.trim(),
    };


    if (data.name && data.username && data.email && data.password && data.gender) {

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;

        Users.create(data).then((user) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        });

    } else {

        res.status(434).send('Name, email, and password are required to register')

    }

});

// // API update a target user's info
// app.put('/api/users/:id', passport.authenticate('jwt', { session: false }), function (req, res) {

//     const data = {

//         id: req.params.id,
//         f_name: req.body.f_name.trim(),
//         l_name: req.body.l_name.trim(),
//         email: req.body.email.toLowerCase().trim(),
//         phone: req.body.phone,
//         password: req.body.password.trim(),
//         admin: req.body.admin

//     };

//     Users.findOne({ where: { id: data.id } }).then(user => {

//         if (data.password != null) {

//             var salt = bcrypt.genSaltSync(10);
//             var hash = bcrypt.hashSync(data.password, salt);
//             data.password = hash;

//         }

//         user.update({

//             f_name: data.f_name,
//             l_name: data.l_name,
//             email: data.email,
//             phone: data.phone,
//             password: data.password,
//             admin: data.admin

//         }).then(function (newData) {
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(newData));
//         }).catch(function (e) {
//             res.status(434).send('unable to update User')
//         })

//     }).catch(function (e) {
//         console.log(e);
//         res.status(434).send(`unable to find User ${data.id}`)

//     })

// });

// // API delete target User
// app.delete('/api/users/:id', (req, res) => {

//     const id = req.params.id;

//     Users.findOne({ where: { id: id } }).then(user => {

//         user.destroy().then(() => {

//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(user));

//         }).catch((e) => {

//             console.log(e);
//             res.status(434).send('unable to delete User')

//         })

//     }).catch((e) => {

//         console.log(e);
//         res.status(434).send('error retrieving info on target User');

//     })

// });

//COMMENTS
//GET all Comments
app.get('/api/comments', function (req, res) {

    Comments.findAll({include: [Users]}).then((results) => {
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
        Comments.create(data).then(function (post) {
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


const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Movie Club API is running. app listening on port ${port}`); });
