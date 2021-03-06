const db = require('../database/models');
const sequelize = db.sequelize;




const genresController = {
    list: (req, res) => {
        db.Genres.findAll()
            .then(genres => {
                console.log(genres);
                res.render('genresList', {genres})
            })
    },
    detail: (req, res) => {
        db.Genres.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail', {genre})
            })
    }
}

module.exports = genresController;