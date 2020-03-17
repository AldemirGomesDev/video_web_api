const User = require('../models/User');

module.exports = {
    async index(req, res) {

        const user = await User.findAll();

        return res.status(200).send(user);
    },

    async store(req, res) {
        const { name, password, email, islogged } = req.body;

        const user = await User.create({ name, password, email, islogged });

        return res.status(200).send(user);
    },

};