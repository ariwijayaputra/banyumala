const express = require('express');
const router = express.Router();
const categories = require('../Controller/categoryController.js')

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
router.get('/categories', categories.getCategories, function (req, res, next) {
    let Categories = res.app.locals.Categories
    let msg = res.app.locals.msg
    console.log(msg)
    res.render('admin/categories', { title: 'Categories', layout: './admin/layout.ejs', Categories, msg }, (err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// Create categories
router.post('/categories', categories.upsertCategories, function (req, res, next) {
    console.log(res.app.locals.Categories);
    res.locals.msg = res.app.locals.msg;
    console.log(res.locals.msg)
    res.redirect(301, '/admin/categories');
});

// Create categories
router.delete('/categories/:id', categories.deleteCategoriesById, function (req, res, next) {
    console.log(res.app.locals.Categories);
    res.redirect(301, '/admin/categories');
});

/* GET products page. */
router.get('/products', function (req, res, next) {
    res.render('admin/products', { title: 'Products', layout: './admin/layout.ejs' });
});


module.exports = router;
