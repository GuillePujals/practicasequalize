module.exports = (sequelize, DataTypes) =>{
     let alias = 'Movies';
     let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        rating: {
            type:DataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        awards: DataTypes.INTEGER,
        release_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        length: DataTypes.INTEGER,

        genre_id: DataTypes.INTEGER
    };
    let config = {
        tableName: "movies",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = function(models){
        Movie.belongsTo(models.Genres, {
            as: "genero",
            foreignKey: "genre_id"

        }),
        Movie.hasMany(models.Actor_movie, {
            as: "actor_movie",
            foreignKey: "movie_id"

        })
    }
    

    return Movie;
}