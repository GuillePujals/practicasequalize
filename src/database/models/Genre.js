module.exports = (sequelize, DataTypes) =>{
     let alias = 'Genres';
     let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        ranking: {
            type:DataTypes.INTEGER
        },
        active: {
            type:DataTypes.INTEGER
        }
    };
    let config = {
        tableName: "genres",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Genre = sequelize.define(alias, cols, config);
    
    Genre.associate = function(models){
        Genre.hasMany(models.Movies, {
            as: "movies",
            foreignKey: "genre_id"

        })
    }
    return Genre;
}