const express = require('express');
const router = express.Router();
const categories = require('../Controller/categoryController.js');
const users = require('../Controller/userController.js')
const products = require('../Controller/productController.js')
const transactions = require('../Controller/transactionController.js')
const detailTransaction = require('../Controller/detailTransactionController.js');
const path = require("path");
const auth = require('../Helpers/authentication')
const { numberToCurrency } = require('../Helpers/numberToCurrency.js');



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
    res.render('bumdes/dashboard', { title: 'Dashboard', layout:'./bumdes/layout.ejs', Categories, ProductSold, detailTransaction, Members, numberToCurrency});
});


/* GET transaction page. */
router.get('/transactions',auth.checkAutinticated, auth.checkRoleBumdes, detailTransaction.getDetailTransactions, transactions.getTransactions, function (req, res, next) {
    let Transactions = res.app.locals.Transactions
    let detailTransaction = res.app.locals.DetailTransactions
    let msg = res.app.locals.msg
    res.render('bumdes/transactions', { title: 'Transactions', layout: './bumdes/layout.ejs', Transactions, detailTransaction,msg, numberToCurrency }, (err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});


module.exports = router;
