const Sequelize = require("sequelize");
const db = require("../Config/Database.js")
const { DataTypes } = Sequelize;

const Transactions = db.define(
	"transactions",
	{
		id_transaction: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
		id_user: {
            type: DataTypes.INTEGER,
			allowNull: false
        },
		total: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Please enter your transaction amount",
				},
			},
		},
		status: {
			type: DataTypes.STRING
		}
	},
	{
		freezeTableName: true,
	}
);

module.exports = Transactions;

(async () => {
	await db.sync();
})();
