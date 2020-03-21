'use strict';
module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  reviews.associate = function(models) {
    // associations can be defined here
  };
  return reviews;
};