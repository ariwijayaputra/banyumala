import { Sequelize } from "sequelize";
import db from "../Config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
	"users",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Please enter your name",
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "Please enter a valid email",
				},
				notEmpty: {
					msg: "Please enter your email",
				},
			},
		},
		gender: DataTypes.STRING,
	},
	{
		freezeTableName: true,
	}
);

export default User;

(async () => {
	await db.sync();
})();
