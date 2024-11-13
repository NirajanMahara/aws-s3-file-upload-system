// Middleware to check if user is authenticated
const authenticate = (req, res, next) => {
  if (req.session.username && req.session.pin) {
    next(); // Proceed to the next route
  } else {
    res.redirect('/auth/login'); // Redirect to login if not authenticated
  }
};

module.exports = { authenticate };
