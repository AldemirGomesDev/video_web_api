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

        const { page, limit } = req.body;

        const user2 = await User.findAll({});

        const count = user2.length

        const pages = Math.ceil(count / limit);
        const offset = page * limit;

        const user = await User.findAll({
            offset: offset,
            limit: limit
        });

        const currentPageCount = user.length

        return res.status(200).send({
            total: count,
            pages: pages,
            currentPageCount: currentPageCount,
            currentPage: page,
            user
        });
    },

    async store(req, res) {
        const { name, password, email, islogged } = req.body;

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail já cadastrado!'
            });
        }

        const user = await User.create({ name, password, email, islogged });

        user.password = undefined

        const token = generateToken(user.id);

        return res.status(200).send({
            status: 1,
            message: "Usuário cadastrado com sucesso!",
            user, token
        });
    },

    async auth(req, res) {
        const { password, email, islogged } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!'
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!'
            });
        }

        const token = generateToken(user.id);
        const name = user.name;
        const user_id = user.id;

        await User.update({
            name, password, email, islogged
        }, {
            where: {
                id: user_id
            }
        });

        const userLogado = await User.findOne({ where: { email } });

        userLogado.password = undefined

        return res.status(200).send({
            status: 1,
            message: "Usuário logado com sucesso!",
            userLogado, token
        });


    },

    async update(req, res) {

        const { name, password, email, islogged } = req.body;

        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'Usuário não encontrado!'
            });
        } else {
            await User.update({
                name, password, email, islogged
            }, {
                where: {
                    id: user_id
                }
            });
            return res.status(200).send({
                status: 1,
                message: "Usuário atualizado com sucesso!",
            });
        }
    },

    async delete(req, res) {

        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'Usuário não encontrado!'
            });
        } else {
            await User.destroy({
                where: {
                    id: user_id
                }
            });
            return res.status(200).send({
                status: 1,
                message: "Usuário apagado com sucesso!",
            });
        }
    }

};