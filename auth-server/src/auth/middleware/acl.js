'use strict';

module.exports = (capability) => {

  return (req, res, next) => {

    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      }
      else {
        res.status(403).json({
          status: 403,
          message: 'access denied 🥱'
        });
      }
    } catch (e) {
      next('Invalid Login');
    }

  }

}
