const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/userModel.model');
const { blacklist } = require('../blacklist');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (blacklist.includes(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(token,"auth 52")
    if (token) {
      const decoded = jwt.verify(token, process.env.secret_key);
      
      if(decoded){
        console.log(decoded,"auth 91 decoded")
        const userId = decoded.userId;
        console.log(userId,"auth 55 userId")
      const user = await UserModel.findById(userId);
      console.log(userId,"auth 95 user")
      if (!user) {
        res.status(200).json({ msg: 'Unauthorized' });
      }
      
      req.user = user;
      next();
      }  
    } else {
      res.status(200).json({ msg: 'Please log in!' });
    }
  } catch (error) {
    res.status(200).json({ msg: error.message });
  }
};

module.exports = {
  auth
};