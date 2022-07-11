const authCheck = (req, res, next) => {
    if (req.session?.userName) {
      next();
    } else {
      res.redirect('/log/signup');
    }
  };
  
  module.exports = authCheck;
  