const Sequelize = require('sequelize');
const db = require('../../database');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

const sequelize = db.connect();

class User extends Sequelize.Model { };

User.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        set(email) {
            this.setDataValue('email', email.toString().toLowerCase());
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    passwordResetToken: Sequelize.STRING,

    passwordResetExpires: Sequelize.DATE,

},
    {
        sequelize,
        modelName: 'user',
        hooks: {
            beforeCreate: async user => {
                user.password = await bcrypt.hash(user.getDataValue('password'), 10);
            },
            beforeUpdate: async user => {
                user.password = await bcrypt.hash(user.getDataValue('password'), 10);
            },
        }
    }
);

/*User.addHook('beforeCreate', async user => {
    user.password = await bcrypt.hash(user.getDataValue('password'), 10);
});*/

module.exports = User;