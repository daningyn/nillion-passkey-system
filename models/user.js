'use strict';
/** @type {import('sequelize').Model} */
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credentialID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    authenticator: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
  });

  return User;
  
};
