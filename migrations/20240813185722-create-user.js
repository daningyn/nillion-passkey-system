'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            address: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            publicKey: {
                allowNull: false,
                type: Sequelize.STRING
            },
            credentialID: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            authenticator: {
                allowNull: false,
                type: Sequelize.JSON
            },
            counter: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};