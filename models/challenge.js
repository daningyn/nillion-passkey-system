
module.exports = (sequelize, DataTypes) => {

    const Challenge = sequelize.define('Challenge', {
      userAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      challenge: {
        type: DataTypes.STRING,
        allowNull: false
      },
      challengeRawData: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING, // registration | authentication
        allowNull: false
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    return Challenge;
};
