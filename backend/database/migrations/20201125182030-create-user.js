'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            role: {
                type: Sequelize.STRING,
            },
            forgot_password_requested_at: {
                type: Sequelize.DATE,
            },
            forgot_password_code: {
                type: Sequelize.STRING,
            },
            password_updated_at: {
                type: Sequelize.DATE,
            },
            forgot_password_reset_password_at: {
                type: Sequelize.DATE,
            },
            is_active: {
                type: Sequelize.STRING,
            },
            verification_string: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    },
};
