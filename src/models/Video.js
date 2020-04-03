const { Model, DataTypes } = require('sequelize');

class Video extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            url: DataTypes.STRING,
            description: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Video;