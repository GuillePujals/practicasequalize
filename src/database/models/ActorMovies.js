module.exports = (sequelize, DataTypes) =>{
    let alias = 'Actor_movie';
    let cols = {
       id: {
           autoIncrement: true,
           primaryKey: true,
           type: DataTypes.INTEGER
       },
       actor_id: {
           type: DataTypes.INTEGER
       },
       movie_id: {
        type: DataTypes.INTEGER
       }

   };
   let config = {
       tableName: "actor_movie",
       timestamps: true,
       createdAt: 'created_at',
       updatedAt: 'updated_at',
       deletedAt: false
   };

   const ActorMovie = sequelize.define(alias, cols, config);

   ActorMovie.associate = function(models){
    ActorMovie.belongsTo(models.Movies, {
           as: "movies",
           foreignKey: "movie_id"

       })
   }


   return ActorMovie;
}