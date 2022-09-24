const express = require('express');
const router = express.Router();
const users = require('../Controller/userController.js')
const Products = require("../Controller/productController.js")
const Cart = require("../Controller/cartController.js")
const Transactions = require("../Controller/transactionController.js") 
const DetailTransaction = require("../Controller/detailTransactionController.js")

/* GET shop page.*/
router.get('/:id',users.getMemberbyID, Products.getProducts, function (req, res, next) {
    let Products = res.app.locals.Products 
    let Members = res.app.locals.Members
    console.log(Members)
    res.render('member/member', { title: 'Shop', layout: './member/layout.ejs', Products, Members });
});

/* GET cart page.*/
router.get('/cart/:id',users.getMemberbyID, Cart.getCart, function (req, res, next) {
    let Members = res.app.locals.Members
    let Cart = res.app.locals.Cart 
    let msg = res.app.locals.msg
    console.log(msg);
    res.render('member/cart', { title: 'Shopping Cart', layout: './member/layout.ejs', Cart, Members,msg },(err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});

// insert cart
router.post('/cart/:id', Cart.upsertCartbyProduct, function (req, res, next) {
    res.locals.msg = res.app.locals.msg;
    res.redirect(301, '/member/'+req.params.id);
});

// Delete cart
router.delete('/delete_cart/:id', Cart.deleteCartById, function (req, res, next) {
    res.locals.msg = res.app.locals.msg;
    res.redirect(301, '/member/cart/'+req.body.id_user);
});

// insert Transactions
router.post('/payment/:id', Transactions.upsertTransactions, Cart.deleteCartByUser, Transactions.uploadFIle, function (req, res, next) {
    res.locals.msg = res.app.locals.msg;
    
    res.redirect(301, '/member/cart/'+req.params.id);
});


/* GET transaction page. */
router.get('/history/:id', DetailTransaction.getDetailTransactionsUser, Transactions.getTransactions, function (req, res, next) {
    let detailTransaction = res.app.locals.DetailTransactions
    let msg = res.app.locals.msg
    console.log(detailTransaction)
    res.render('member/orderHistory', { title: 'Order History', layout: './member/layout.ejs', Transactions, detailTransaction,msg }, (err,html)=>{
        res.app.locals.msg = null;
        res.send(html);
    });
});



module.exports = router;
