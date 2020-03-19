const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async index(req, res) {

        const user = await User.findAll();

        return res.status(200).send(user);
    },

    async store(req, res) {
        const { name, password, email, islogged } = req.body;

        const user = await User.create({ name, password, email, islogged });

        user.password = undefined

        const token = generateToken(user.id);

        return res.status(200).send({ user, token });
    },

    async auth(req, res) {
        const { password, email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send({ error: 'User not found' });

        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({ error: 'password invalid' });
        }

        user.password = undefined

        const token = generateToken(user.id);

        return res.status(200).send({ user, token });


    },

};