'use strict';

const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: DataTypes.STRING,
            forgot_password_requested_at: DataTypes.DATE,
            forgot_password_code: DataTypes.STRING,
            password_updated_at: DataTypes.DATE,
            forgot_password_reset_password_at: DataTypes.DATE,
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            verification_string: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'users',
            modelName: 'User',
        }
    );
    User.beforeCreate(async (user) => {
        const tempUser = user;
        tempUser.id = uuid();
        return tempUser;
    });
    return User;
};
