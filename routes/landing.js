const express = require('express');
const router = express.Router();

/* GET home page. if going to admin-lte, delete index.html*/
router.get('/', function (req, res, next) {
    console.log(res.app.locals.users);
    res.render('landing', { title: 'Home', layout: false });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
    let messages = {
        error:null
    }
    res.render('login', { title: 'Home', layout: false , messages});
});

/* GET login page. */
router.get('/register', function (req, res, next) {
    let messages = {
        error:null
    }
    res.render('register', { title: 'Home', layout: false , messages});
});



module.exports = router;
