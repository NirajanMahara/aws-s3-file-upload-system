const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, pin } = req.body;

  if (username === process.env.AUTH_USERNAME && pin === process.env.AUTH_PIN) {
    req.session.username = username;
    req.session.pin = pin;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
