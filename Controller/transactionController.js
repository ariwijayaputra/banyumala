const Transactions = require("../Models/transactionModel.js")
const errHandler =  require("../Helpers/error_helper.js");
const Users = require("../Models/userModel.js")
const DetailTransactions = require("../Models/detailTransactionModel.js")

// Create/update Transactions
const upsertTransactions = async (req, res, next) => {
	try {
		let result = await Transactions.upsert(req.body, { where: { id_transaction: req.body.id_transaction } });
        result=JSON.parse(JSON.stringify(result[0]));
		res.app.locals.Transactions = result;
		res.app.locals.msg = "Success! Data has been saved";
	} catch (error) {
		res.app.locals.Transactions=JSON.parse(JSON.stringify(errHandler(error)));
	}
    next();
};


// GET all data Transactions
const getTransactions = async (req, res, next) => {
	try {
		let result = await Transactions.findAll(
            { include: Users },
            { order:[["id_transaction",'DESC']] }
        );
		if(result == ""){
            res.app.locals.Transactions = {
                error: "no transaction exist"
            };
        }else{
            result=JSON.parse(JSON.stringify(result));
            //console.log(...result)
            res.app.locals.Transactions = result;
        }
        
	} catch (error) {
		
	}
    next();
};


//DELETE Transactions
const deleteTransactionsById = async (req, res,next) => {
	try {
		// check if the requested record exist, if exist delete
		const isExist = await Transactions.findOne({ where: { id_transaction: req.params.id } });
		if(isExist){
			const result = await Transactions.destroy({ where: { id_transaction: req.params.id } });
			if(result){
				res.app.locals.Transactions = {msg: "data berhasil dihapus"};
				res.app.locals.msg = "Success! Data has been deleted";
			}
		}else{
			res.app.locals.Transactions = {error: "Data tidak ada pada tabel"};
		}
	} catch (error) {
		res.app.locals.Transactions=JSON.parse(JSON.stringify(errHandler(error)));
	}
	next();
};



module.exports = {
    upsertTransactions,
    deleteTransactionsById,
    getTransactions,
}