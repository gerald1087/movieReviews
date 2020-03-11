'use strict';
module.exports = (sequelize, DataTypes) => {
  const movie_review = sequelize.define('movie_review', {
    roomCategory: DataTypes.STRING,
    movie: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {});
  movie_review.associate = function(models) {
    // associations can be defined here
  };
  return movie_review;
};