const express = require('express');
const router = express.Router();

/* GET home page. if going to admin-lte, delete index.html*/
router.get('/', function (req, res, next) {
    console.log(res.app.locals.users);
    res.render('landing', { title: 'Home', layout: false });
});


module.exports = router;
