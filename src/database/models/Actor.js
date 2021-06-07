module.exports = (sequelize, DataTypes) =>{
    let alias = 'Actors';
    let cols = {
       id: {
           autoIncrement: true,
           primaryKey: true,
           type: DataTypes.INTEGER
       },
       first_name: {
           allowNull: false,
           type: DataTypes.STRING
       },
       last_name: {
            allowNull: false,
            type: DataTypes.STRING
       },
       rating: {
            type:DataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
       },
       favorite_movie_id: DataTypes.INTEGER
   };
   let config = {
       tableName: "actors",
       timestamps: true,
       createdAt: 'created_at',
       updatedAt: 'updated_at',
       deletedAt: false
   };

   const Actor = sequelize.define(alias, cols, config);
   
   
   return Actor;
}