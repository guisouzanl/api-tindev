import Dev from '../schemas/Dev';

class DeslikesController {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev doesnt exists!' });
    }

    if (targetDev.dislikes.includes(loggedDev._id)) {
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
}

export default new DeslikesController();
