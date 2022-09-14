const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/dashboard', { title: 'Dashboard', layout:'./admin/layout.ejs'});
});

/* GET members page. */
router.get('/members', function (req, res, next) {
    res.render('admin/members', { title: 'Members', layout: './admin/layout.ejs' });
});

/* GET transaction page. */
router.get('/transactions', function (req, res, next) {
    res.render('admin/transactions', { title: 'Transactions', layout: './admin/layout.ejs' });
});

/* GET categories page. */
router.get('/categories', function (req, res, next) {
    res.render('admin/categories', { title: 'Categories', layout: './admin/layout.ejs' });
});

/* GET products page. */
router.get('/products', function (req, res, next) {
    res.render('admin/products', { title: 'Products', layout: './admin/layout.ejs' });
});


module.exports = router;
