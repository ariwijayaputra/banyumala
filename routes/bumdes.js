const express = require('express');
const router = express.Router();
const categories = require('../Controller/categoryController.js');
const users = require('../Controller/userController.js')
const products = require('../Controller/productController.js')
const transactions = require('../Controller/transactionController.js')
const detailTransaction = require('../Controller/detailTransactionController.js');
const path = require("path");
const auth = require('../Helpers/authentication')


/* GET home page. */
router.get('/',auth.checkAutinticated, auth.checkRoleBumdes, categories.getCategories, products.getProducts, detailTransaction.getDetailTransactions, users.getMembers, function (req, res, next) {
    let Categories = res.app.locals.Categories
    let detailTransaction = res.app.locals.DetailTransactions
    let Members = res.app.locals.Members
    let Products = res.app.locals.Products
    let ProductSold = {}
    if(!Products.error){
        Products.forEach(product => {
            ProductSold[product.name] = 0;
        });
    }
    if(!detailTransaction.error){
        detailTransaction.forEach(transaction => {
            transaction.detail_transactions.forEach(detail => {
                console.log(detail.product.name)
                console.log(detail.amount)
                if(ProductSold[detail.product.name]){
                    ProductSold[detail.product.name] += detail.amount
                }
                else
                {
                    ProductSold[detail.product.name] = detail.amount
                }
            })
        });
    }
    console.log(detailTransaction)
    
    ProductSold = JSON.stringify(ProductSold);
    res.render('bumdes/dashboard', { title: 'Dashboard', layout:'./bumdes/layout.ejs', Categories, ProductSold, detailTransaction, Members});
});


/* GET members page. */
router.get('/members', auth.checkAutinticated, auth.checkRoleBumdes,users.getMembers, function (req, res, next) {
    let Members = res.app.locals.Members
    let msg = res.app.locals.msg
    console.log(Members)
    res.render('bumdes/members', { title: 'Members', layout: './bumdes/layout.ejs', Members, msg },(err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// Create members
router.post('/members',auth.checkAutinticated, auth.checkRoleBumdes, users.upsertMembers,  function (req, res, next) {
    res.locals.msg = res.app.locals.msg;
    res.redirect(301, '/bumdes/members');
});

// Delete member
router.delete('/members/:id',auth.checkAutinticated, auth.checkRoleBumdes, users.deleteUsersById, function (req, res, next) {
    res.redirect(301, '/bumdes/members');
});


/* GET transaction page. */
router.get('/transactions',auth.checkAutinticated, auth.checkRoleBumdes, detailTransaction.getDetailTransactions, transactions.getTransactions, function (req, res, next) {
    let Transactions = res.app.locals.Transactions
    let detailTransaction = res.app.locals.DetailTransactions
    let msg = res.app.locals.msg
    res.render('bumdes/transactions', { title: 'Transactions', layout: './bumdes/layout.ejs', Transactions, detailTransaction,msg }, (err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// Delete transaction
router.delete('/transactions/:id',auth.checkAutinticated, auth.checkRoleBumdes, transactions.deleteTransactionsById, function (req, res, next) {
    res.redirect(301, '/bumdes/transactions');
});

// Create transaction
router.post('/transactions',auth.checkAutinticated, auth.checkRoleBumdes, transactions.updateTransaction, async function (req, res, next) {
    res.locals.msg = res.app.locals.msg;
    res.redirect(301, '/bumdes/transactions');
});

/* GET categories page. */
router.get('/categories',auth.checkAutinticated, auth.checkRoleBumdes, categories.getCategories, function (req, res, next) {
    let Categories = res.app.locals.Categories
    let msg = res.app.locals.msg
    res.render('bumdes/categories', { title: 'Categories', layout: './bumdes/layout.ejs', Categories, msg }, (err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// Create categories
router.post('/categories',auth.checkAutinticated, auth.checkRoleBumdes, categories.upsertCategories, function (req, res, next) {
    console.log(res.app.locals.Categories);
    res.locals.msg = res.app.locals.msg;
    console.log(res.locals.msg)
    res.redirect(301, '/bumdes/categories');
});

// Delete categories
router.delete('/categories/:id',auth.checkAutinticated, auth.checkRoleBumdes, categories.deleteCategoriesById, function (req, res, next) {
    console.log(res.app.locals.Categories);
    res.redirect(301, '/bumdes/categories');
});


/* GET products page. */
router.get('/products',auth.checkAutinticated, auth.checkRoleBumdes,  categories.getCategories, products.getProducts,  function (req, res, next) {
    let Products = res.app.locals.Products
    let Categories = res.app.locals.Categories
    let msg = res.app.locals.msg
    res.render('bumdes/products', { title: 'Products', layout: './bumdes/layout.ejs', Products, Categories, msg },(err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// Create product
router.post('/products',auth.checkAutinticated, auth.checkRoleBumdes,  products.upsertProducts, products.uploadFIle, async function (req, res, next) {
    console.log(res.app.locals.Products);
    res.locals.msg = res.app.locals.msg;
    console.log(res.locals.msg)
    res.redirect(301, '/bumdes/products');
});

// Delete products
router.delete('/products/:id',auth.checkAutinticated, auth.checkRoleBumdes, products.deleteProductsById, function (req, res, next) {
    res.redirect(301, '/bumdes/products');
});

module.exports = router;
