const User = require('../models/User');
const Video = require('../models/Video');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'videos' }
        });

        return res.json(user);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name, url } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const video = await Video.create({
            name,
            url,
            user_id,
        });

        return res.status(200).json(video);
    }
};