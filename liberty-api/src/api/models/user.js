"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE,
      phone: DataTypes.INTEGER,
      is_approved: DataTypes.BOOLEAN,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
