import User from "../Models/UserModel.js";
import { errHandler } from "../Helpers/error_helper.js";

export const getUsers = async (req, res) => {
	try {
		const response = await User.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getUserById = async (req, res) => {
	try {
		const response = await User.findByPk(req.params.id);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const createUser = async (req, res) => {
	try {
		await User.create(req.body);
		res.status(201).json({ msg: "User Created" });
	} catch (error) {
		res.status(400).json(errHandler(error));
	}
};

export const updateUser = async (req, res) => {
	try {
		await User.update(req.body, { where: { id: req.params.id } });
		res.status(200).json({ msg: "User Updated" });
	} catch (error) {
		res.status(400).json(errHandler(error));
	}
};

export const deleteUser = async (req, res) => {
	try {
		await User.destroy({ where: { id: req.params.id } });
		res.status(200).json({ msg: "User Deleted" });
	} catch (error) {
		res.status(500).json(error.message);
	}
};
