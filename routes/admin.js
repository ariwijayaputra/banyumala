const express = require('express');
const router = express.Router();
const categories = require('../Controller/categoryController.js');
const users = require('../Controller/userController.js')
const products = require('../Controller/productController.js')
const transactions = require('../Controller/transactionController.js')
const detailTransaction = require('../Controller/detailTransactionController.js');
const path = require("path");



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/dashboard', { title: 'Dashboard', layout:'./admin/layout.ejs'});
});


/* GET members page. */
router.get('/members', users.getMembers, function (req, res, next) {
    let Members = res.app.locals.Members
    let msg = res.app.locals.msg
    console.log(Members)
    res.render('admin/members', { title: 'Members', layout: './admin/layout.ejs', Members, msg },(err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// Create members
router.post('/members', users.upsertMembers, function (req, res, next) {
    res.locals.msg = res.app.locals.msg;
    res.redirect(301, '/admin/members');
});

// Delete member
router.delete('/members/:id', users.deleteUsersById, function (req, res, next) {
    res.redirect(301, '/admin/members');
});


/* GET transaction page. */
router.get('/transactions', detailTransaction.getDetailTransactions, transactions.getTransactions, function (req, res, next) {
    let Transactions = res.app.locals.Transactions
    let detailTransaction = res.app.locals.DetailTransactions
    let msg = res.app.locals.msg
    // console.log(detailTransaction);
    // detailTransaction.forEach(transaction => {
    //     console.log(transaction.detail_transactions)
    // });
    //console.log(...Transactions);
    res.render('admin/transactions', { title: 'Transactions', layout: './admin/layout.ejs', Transactions, detailTransaction,msg }, (err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// Delete products
router.delete('/transactions/:id', transactions.deleteTransactionsById, function (req, res, next) {
    res.redirect(301, '/admin/transactions');
});

/* GET categories page. */
router.get('/categories', categories.getCategories, function (req, res, next) {
    let Categories = res.app.locals.Categories
    let msg = res.app.locals.msg
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

// Delete categories
router.delete('/categories/:id', categories.deleteCategoriesById, function (req, res, next) {
    console.log(res.app.locals.Categories);
    res.redirect(301, '/admin/categories');
});


/* GET products page. */
router.get('/products',  categories.getCategories, products.getProducts,  function (req, res, next) {
    let Products = res.app.locals.Products
    let Categories = res.app.locals.Categories
    let msg = res.app.locals.msg
    res.render('admin/products', { title: 'Products', layout: './admin/layout.ejs', Products, Categories, msg },(err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// Create categories
router.post('/products',  products.upsertProducts, products.uploadFIle, async function (req, res, next) {
    console.log(res.app.locals.Products);
    res.locals.msg = res.app.locals.msg;
    console.log(res.locals.msg)
    res.redirect(301, '/admin/products');
});

// Delete products
router.delete('/products/:id', products.deleteProductsById, function (req, res, next) {
    res.redirect(301, '/admin/products');
});

module.exports = router;
