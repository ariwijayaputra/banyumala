const express = require('express');
const router = express.Router();
const users = require('../Controller/userController.js')

/* GET landing page. if going to admin-lte, delete index.html*/
router.get('/', function (req, res, next) {
    console.log(res.app.locals.users);
    res.render('landing', { title: 'Home', layout: false });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
    let messages = {
        error:  res.app.locals.msg
    }
    res.render('login', { title: 'Home', layout: false, messages }, (err, html) => {
        res.app.locals.msg = null;
        res.send(html);
    });
});

/* GET Register page. */
router.get('/register', function (req, res, next) {
    let messages = res.app.locals.msg
    res.render('register', { title: 'Home', layout: false, messages }, (err, html) => {
        res.app.locals.msg = null;
        res.send(html);
    });
});

/* Post Register. create new member*/
router.post('/register', users.createMembers, users.uploadFIle, function (req, res, next) {
    
    let messages = res.app.locals.msg

    if (res.app.locals.Users) {
        res.app.locals.msg = null;
        res.redirect('login');
    } else {
        res.render('register', { title: 'Home', layout: false, messages }, (err, html) => {
            res.app.locals.msg = null;
            res.send(html);
        });
    }
});



module.exports = router;
