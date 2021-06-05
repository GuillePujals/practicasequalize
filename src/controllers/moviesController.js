const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Genres} = require('../database/models');


const moviesController = {
    list : (req, res) => {
        db.Movies.findAll()
            .then ((movies) =>{
                res.render ('moviesList', {movies})
            })

    },

    detail: (req, res) => {
        db.Movies.findByPk(req.params.id)
            .then((movie) => {
            res.render ('moviesDetail', {movie})
            })
    },

    new: (req, res) => {
        db.Movies.findAll({
            order: [
                ['release_date', 'DESC']
            ],
        })
            .then (movies => {
            res.render ('newestMovies', {movies})
            })
    },
    recomended: (req, res) => {
        db.Movies.findAll({
            where:{
                rating: {[db.Sequelize.Op.gte]: 8}
            },
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then (movies => {
            res.render ('recommendedMovies', {movies})
            })
    },
    add: (req, res) => {
        db.Genres.findAll()
        .then(generos => {
            res.render('add', {generos})
            
        })
        
    },
    create: (req, res) => {
        db.Movies.create({
            name: req.body.name
        })
        res.send('movies/create')
    }
}

module.exports = moviesController;