const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Genres, Movies, Actor_movie, Actors} = require('../database/models');
const ActorMovies = require('../database/models/ActorMovies');


const moviesController = {
    list : (req, res) => {
        db.Movies.findAll()
            .then ((movies) =>{
                res.render ('moviesList', {movies})
            })

    },

    detail: async (req, res) => {
        let genero = await Genres.findAll();
        let actorMovie = Actor_movie.findAll();
        let movie = await Movies.findByPk(req.params.id, {
            include: ["genero", "actor_movie"]
        })
        
        return res.render ('moviesDetail', {movie, genero, actorMovie});
        //return res.send (movie.actor_movie.id)
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
        let generos = await Genres.findAll();

        return res.render('edit', {movie, generos}) 
    },

    update: async (req, res) => {
        await Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id:req.body.genre_id
        }, {
            where: {
                id: req.params.id
            }
        })
        return res.redirect('/movies/detail/' + req.params.id);

    },

    delete: async (req, res) =>{
        await Actor_movie.destroy({
            where: {
                movie_id:req.params.id
            }});
        await Actors.update({
            favorite_movie_id: null
        },{
            where: {
                favorite_movie_id: req.params.id
            }
        });
        await Movies.destroy({
            where:{id: req.params.id}
            });

        return res.redirect ('/movies/')
    }
}

module.exports = moviesController;