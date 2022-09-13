const User = require("../Models/UserModel.js")
const errHandler =  require("../Helpers/error_helper.js")

const getUsers = async (req, res, next) => {
	try {
		// get all user data from database and change format to json
		const response = await User.findAll();
		results=JSON.parse(JSON.stringify(response))
		
		res.app.locals.users = results

		//res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error.message);
	}
	next();
};

const getUserById = async (req, res) => {
	try {
		const response = await User.findByPk(req.params.id);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const createUser = async (req, res) => {
	try {
		await User.create(req.body);
		res.status(201).json({ msg: "User Created" });
	} catch (error) {
		res.status(400).json(errHandler(error));
	}
};

const updateUser = async (req, res) => {
	try {
		await User.update(req.body, { where: { id: req.params.id } });
		res.status(200).json({ msg: "User Updated" });
	} catch (error) {
		res.status(400).json(errHandler(error));
	}
};

const deleteUser = async (req, res) => {
	try {
		await User.destroy({ where: { id: req.params.id } });
		res.status(200).json({ msg: "User Deleted" });
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports = {
	deleteUser,
	updateUser,
	createUser,
	getUserById,
	getUsers
}