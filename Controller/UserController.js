const Users = require("../Models/userModel.js")
const errHandler =  require("../Helpers/error_helper.js")

// Create/update Users
const upsertUsers = async (req, res, next) => {
	try {
		let result = await Users.upsert(req.body, { where: { id: req.params.id } });
        result=JSON.parse(JSON.stringify(result[0]));
		res.app.locals.Users = result;
		res.app.locals.msg = "Success! Data has been saved";
	} catch (error) {
		res.status(500).json(errHandler(error));
	}
    next();
};




// GET all data Users
const getUsers = async (req, res, next) => {
	try {
		let result = await Users.findAll({order:[["id_user",'DESC']]});
		if(result == ""){
            res.app.locals.Users = {
                error: "no user exist"
            };
        }else{
            result=JSON.parse(JSON.stringify(result));
            res.app.locals.Users = result;
			
        }
        
	} catch (error) {
		res.status(500).json(error.message);
	}
    next();
};


//DELETE Users
const deleteUsersById = async (req, res,next) => {
	try {
		// check if the requested record exist, if exist delete
		const isExist = await Users.findOne({ where: { id_user: req.params.id } });
		if(isExist){
			const result = await Users.destroy({ where: { id_user: req.params.id } });
			if(result){
				res.app.locals.Users = {msg: "data berhasil dihapus"};
				res.app.locals.msg = "Success! Data has been deleted";
			}
		}else{
			res.app.locals.Users = {error: "Data tidak ada pada tabel"};
		}
	} catch (error) {
		res.app.locals.Users=JSON.parse(JSON.stringify(errHandler(error)));
	}
	next();
};

// Create/update Members
const upsertMembers = async (req, res, next) => {
	try {
		let result = await Users.upsert(req.body, { where: { id: req.params.id } });
        result=JSON.parse(JSON.stringify(result[0]));
		res.app.locals.Users = result;
		res.app.locals.msg = "Success! Data has been saved";
	} catch (error) {
		res.status(500).json(errHandler(error));
	}
    next();
};

// GET all members. select all user where id role = 3 (member)
const getMembers = async (req, res, next) => {
	try {
		let result = await Users.findAll({
			order:[["id_user",'DESC']],
			where: { id_role: 3 }
		});
		if(result == ""){
            res.app.locals.Members = {
                error: "no user exist"
            };
        }else{
            result=JSON.parse(JSON.stringify(result));
            res.app.locals.Members = result;
			
        }
	} catch (error) {
		res.status(500).json(error.message);
	}
    next();
};

module.exports = {
    upsertUsers,
    deleteUsersById,
    getUsers,

	upsertMembers,
	getMembers
}