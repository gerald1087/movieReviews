'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    user_id: DataTypes.INTEGER,
    moviereview_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    comment_date: DataTypes.DATE
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
  };
  return comments;
};