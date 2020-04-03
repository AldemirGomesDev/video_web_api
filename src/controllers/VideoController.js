const { Sequelize } = require('sequelize');
const User = require('../models/User');
const Video = require('../models/Video');

module.exports = {
    async index(req, res) {
        const { user_id, page, limit } = req.params;

        const limite = parseInt(limit);
        const pageCurrent = parseInt(page);

        const offset = pageCurrent * limite;

        const video = await Video.findAll({
            where: { user_id }
        });

        const count = video.length

        const pages = Math.ceil(count / limite);

        const videos = await Video.findAll({
            where: { user_id },
            offset: offset,
            limit: limite
        });

        if (!videos) {
            return res.status(400).send({
                status: 0,
                message: 'Vídeo não encontrado!'
            });
        }

        return res.status(200).send({
            total: count,
            pages: pages,
            currentPageCount: videos.length,
            currentPage: pageCurrent + 1,
            videos
        });
    },

    async search(req, res) {
        const { user_id, page, limit } = req.params;
        const Op = Sequelize.Op;
        var name = req.query.name
        const query = `%${name}%`
        console.log(`name: ${name}`)

        const limite = parseInt(limit);
        const pageCurrent = parseInt(page);

        const offset = pageCurrent * limite;

        const video = await Video.findAll({
            where: { user_id, name: { [Op.like]: query } }
        });

        const count = video.length

        const pages = Math.ceil(count / limite);

        const videos = await Video.findAll({
            where: { user_id, name: { [Op.like]: query } },
            offset: offset,
            limit: limite
        });

        if (!videos) {
            return res.status(400).send({
                status: 0,
                message: 'Vídeo não encontrado!'
            });
        }

        return res.status(200).send({
            total: count,
            pages: pages,
            currentPageCount: videos.length,
            currentPage: pageCurrent + 1,
            videos
        });
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name, url, description } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({
                status: 0,
                message: 'Usuário não encontrado!'
            });
        }

        if (name == "" || name == null || url == "" || url == null || description == "" || description == null) {
            return res.status(400).json({
                status: 0,
                message: 'Campos obrigatório vazios!'
            });
        }

        const video = await Video.create({
            name,
            url,
            description,
            user_id,
        });

        return res.status(200).json({
            status: 1,
            message: "Vídeo cadastrado com sucesso!",
            video
        });
    },

    async delete(req, res) {
        const id = req.params.id;

        try {
            const video = await Video.findByPk(id);

            if (video) {
                await Video.destroy({ where: { id } });

                return res.status(200).json({
                    status: 1,
                    message: "Vídeo apagado com sucesso!",
                });

            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Vídeo não encontrado!'
                });
            }


        } catch (err) {
            return res.status(400).json({ error: err });
        }
    },

    async update(req, res) {
        const id = req.params.id;
        const { name, description } = req.body;

        try {
            const video = await Video.findByPk(id);

            if (video) {
                await Video.update({ name, description }, { where: { id } });

                return res.status(200).json({
                    status: 1,
                    message: "Vídeo atualizado com sucesso!",
                });

            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Vídeo não encontrado!'
                });
            }


        } catch (err) {
            return res.status(400).json({
                status: 0,
                message: 'Erro ao atualizar vídeo!'
            });
        }
    }
};