const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            islogged: DataTypes.BOOLEAN,
            isadmin: DataTypes.BOOLEAN,
            registration: DataTypes.INTEGER
        }, {
            sequelize,
            hooks: {
                // beforeCreate: (user) => {
                //     const salt = bcrypt.genSaltSync();
                //     user.password = bcrypt.hashSync(user.password, salt);
                // },
                beforeValidate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            instanceMethods: {
                generateHash: function (password) {
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
                },
                validPassword: function (password) {
                    return bcrypt.compareSync(password, this.password)
                }
            }
        })
    }

    static associate(models) {
        this.hasMany(models.Video, { foreignKey: 'user_id', as: 'videos' });
    }

}

module.exports = User;