const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 60,
    });
}

module.exports = {
    async findByPk(req, res) {

        console.log(`---------------------User findByPk-----------------------:`)
        const { id } = req.params;

        const user = await User.findByPk(id)

        if(!user) {
            return res.status(400).send({
                status: 0,
                message: 'Usuário não encontrado!'
            });
        }

        return res.status(200).send({ user });
    },

    async findByRegistration(req, res) {

        console.log(`---------------------User findByRegistration-----------------------:`)
        const { registration } = req.params;
        const isadmin = true;
        
        const user = await User.findOne({ where: { registration, isadmin } });

        if(!user) {
            return res.status(400).send({
                status: 0,
                message: 'Usuário não encontrado!'
            });
        }

        return res.status(200).send({ user });
    },

    async index(req, res) {

        console.log(`---------------------User index-----------------------:`)
        // const { page, limit } = req.body;
        const { page, limit } = req.params;

        const user2 = await User.findAll({});

        const count = user2.length

        const limite = parseInt(limit);
        const pageCurrent = parseInt(page);

        const pages = Math.ceil(count / limite);
        const offset = pageCurrent * limite;

        const user = await User.findAll();

        user.password = undefined
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
        const { name, password, email, islogged, isadmin, registration } = req.body;

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail já cadastrado!'
            });
        }

        const user = await User.create({ name, password, email, islogged, isadmin, registration });

        user.password = undefined

        const token = generateToken(user.id);

        return res.status(200).send({
            status: 1,
            message: "Usuário cadastrado com sucesso!",
            user, token
        });
    },

    async logout(req, res) {
        const { name, password, email, islogged } = req.body;

        const { user_id } = req.params;

        await User.update({
            name, password, email, islogged
        }, {
            where: {
                id: user_id
            }
        });
        return res.status(200).send({
            status: 1,
            message: "Usuário deslogado com sucesso!",
        });
        
    },

    async auth(req, res) {
        const { password, email, islogged, matricula } = req.body;
        
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            console.log(matricula)
            return res.status(400).json({
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

        const { name, password, email, islogged, isadmin, registration } = req.body;

        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'Usuário não encontrado!'
            });
        } else {
            // await User.create({ name, password, email, islogged, isadmin, registration });

            await User.update({
                name, password, email, islogged, isadmin, registration
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