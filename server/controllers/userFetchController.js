const User = require('../models/User');

const getUser = async (req, res) => {
    const token = req.headers['authorization'];  // Get JWT from Authorization header

    if (!token) {
        return res.status(401).send({ message: 'No token provided. Unauthorized' });
    }

    // const userId = req.params.id;
    // Verify token and extract userId from it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;  // userId is stored in the token payload

    try {
      const user = await User.findById(userId);
      // If the user is found, send only the username
      if (user) {
        res.status(200).send({ username: user.username });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    //   res.send(user);
    } catch (err) {
      console.error(err);
    }
  };

module.exports = {
    getUser,
};