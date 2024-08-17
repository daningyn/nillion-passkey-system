'use strict';
/** @type {import('sequelize').Model} */
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicKey: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    credentialID: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
  });

  return User;
  
};
