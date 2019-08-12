import axios from 'axios';
import devSchema from '../schemas/Dev';

class DevController {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await devSchema.findById(user);

    const users = await devSchema.find({
      $and: [
        { _id: { $ne: loggedDev._id } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.deslikes } },
      ],
    });
    return res.json(users);
  }

  async store(req, res) {
    const { username } = req.body;

    const userExists = await devSchema.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await devSchema.create({
      name,
      user: username,
      bio,
      avatar,
    });

    return res.json(dev);
  }
}

export default new DevController();
