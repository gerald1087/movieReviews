<<<<<<< HEAD
=======

>>>>>>> master
require('dotenv').config();

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
<<<<<<< HEAD
=======


>>>>>>> master
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcrypt');
const passport = require('passport');
const cookieParser = require('cookie-parser');
<<<<<<< HEAD
=======

const db = require('./models');
const Users = db.user;
const Comments = db.comments;
const Movie_Reviews = db.movie_review;

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

const pgp = require('pg-promise')();
const Sequelize = require('sequelize')

>>>>>>> master

const db = require('./models');
const Users = db.user;
const Comments = db.comments;
const Movie_Reviews = db.movie_review;

const pgp = require('pg-promise')();
const Sequelize = require('sequelize')
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
const { passportLoginRoute, passportJWTStrategy } = require('./middleware/passport-config');
 
const app = express();

<<<<<<< HEAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

=======
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
// app.use(cookieParser());


// const CommentsModel = require('./models/comments');
// const UserModel = require('./models/user');
// const Movie_ReviewModel = require('./models/movie_review');

// const Users = UserModel(sequelize, Sequelize);
// const Movie_Reviews = Movie_ReviewModel(sequelize, Sequelize);
// const Comments = CommentsModel(sequelize, Sequelize);
>>>>>>> master

Comments.belongsTo(Users, {foreignKey: 'user_id'});
Users.hasMany(Comments, {foreignKey: 'user_id'});
// Movie_Reviews.belongsTo(Users, {foreignKey: 'user_id'});
// Users.hasMany(Movie_Reviews, {foreignKey: 'user_id'});

//JWT Below
// load passport configuration middleware

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

// API update a target user's info
app.put('/api/users/:id', passport.authenticate('jwt', { session: false }), function (req, res) {

    const data = {

        id: req.params.id,
        f_name: req.body.f_name.trim(),
        l_name: req.body.l_name.trim(),
        email: req.body.email.toLowerCase().trim(),
        phone: req.body.phone,
        password: req.body.password.trim(),
        admin: req.body.admin

    };

    Users.findOne({ where: { id: data.id } }).then(user => {

        if (data.password != null) {

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(data.password, salt);
            data.password = hash;

        }

        user.update({

            f_name: data.f_name,
            l_name: data.l_name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            admin: data.admin

        }).then(function (newData) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newData));
        }).catch(function (e) {
            res.status(434).send('unable to update User')
        })

    }).catch(function (e) {
        console.log(e);
        res.status(434).send(`unable to find User ${data.id}`)

    })

});

// API delete target User
app.delete('/api/users/:id', (req, res) => {

    const id = req.params.id;

    Users.findOne({ where: { id: id } }).then(user => {

        user.destroy().then(() => {

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));

        }).catch((e) => {

            console.log(e);
            res.status(434).send('unable to delete User')

        })

    }).catch((e) => {

        console.log(e);
        res.status(434).send('error retrieving info on target User');

    })

});


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

//GET comments by movie review ID for comment box 
//UNTESTED sql q

app.get('/api/comments/moviereview/:id', function (req, res) {
    let id = req.params.id;

    db.query('SELECT * FROM comments JOIN movie_reviews on comments.moviereview_id = movie_reviews.id Join users on comments.user_id = users.id'
    )
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
        .catch((e) => {
            console.error(e);
        });
});
//POST Comments //Getting 434 message, currently
app.post('/api/comments', function (req, res) {

    let data = {
        user_id: req.body.user_id,
        moviereview_id: req.body.moviereview_id,
        comment: req.body.comment,
        comment_date: req.body.comment_date
    };


    if(data.title && data.body && data.user_id) {

    // if(data.comment && data.moviereview_id && data.user_id) {

        Comments.create(data).then(function (post) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(post));
        }).catch(function(e){
            res.status(434).send('Unable to post the comment')
        });
    // } else {
    res.status(434).send('Logged user, movie and a comment is required to leave a comment')
    // }
}});

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

<<<<<<< HEAD
=======

//USERS
//GET all Users /WORKING
app.get('/api/users', function (req, res) {

    Users.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

//Get 1 User /WORKING
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

//Delete a User /WORKING
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

>>>>>>> master
 //MOVIE REVIEWS
 //GET All Movie Reviews /WORKING   
 app.get('/api/movie_reviews', function (req, res) {

    Users.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

//Get 1 Movie Review /WORKING
app.get('/api/movie_reviews/:id', function (req, res) {
    let id = req.params.id;

    Movie_Reviews.findOne({where:{id: id}})
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
        .catch((e) => {
            console.error(e);
        });
});

//POST 1 Movie Review /434 Error ~works?
app.post('/api/movie_reviews', function (req, res) {

    let data = {
        user_id: req.body.user_id,
        roomCategory: req.body.roomCategory,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    };

    Movie_Reviews.create(data).then(function (post) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(post));
    }).catch(function(e){
        res.status(434).send('Unable to post the review host')
    });
// } else {
res.status(434).send('Error reading data required to post Review Hosting')
// }
});

//UPDATE 1 Movie Review /~Working (got confirmation log success)
app.put('/api/movie_reviews/:id', function (req,res, next) {
      let id = req.params.id;

    Movie_Reviews.update(
          { movie: req.body.movie,
            roomCategory: req.body.roomCategory,
            start_date: req.body.start_date,
            end_date: req.body.end_date},

            {where:{id: id}}      
   ).then(function() { 

       console.log("Listing updated successfully!");
  
   }).error(function(err) { 
  
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


const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Movie Club API is running. app listening on port ${port}`); });

<<<<<<< HEAD
// app.listen(3005);
// console.log('Movie Club is LIVE, 3005');
=======
app.listen(3005);
console.log('Movie Club is LIVE, 3005');

>>>>>>> master
