const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Genres, Movies} = require('../database/models');


const moviesController = {
    list : (req, res) => {
        db.Movies.findAll()
            .then ((movies) =>{
                res.render ('moviesList', {movies})
            })

    },

    detail: (req, res) => {
        db.Movies.findByPk(req.params.id, {
            include: [{association: "genero"}]
        })
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
    add: async (req, res) => {
        let generos = await Genres.findAll()
        
        return res.render('add', {generos}) 
    },
    create: async (req, res) => {
        let newMovie = await Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id:req.body.genre_id
        })
        return res.send(newMovie)
    },
    edit: async (req, res) => {
        let movie = await Movies.findByPk(req.params.id);
        //let generos = await Genres.findAll();

        return res.render('edit', {movie}) 
    }
    //update: 
}

module.exports = moviesController;