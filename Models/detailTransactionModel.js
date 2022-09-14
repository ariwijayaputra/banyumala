const Sequelize = require("sequelize");
const db = require("../Config/Database.js")
const { DataTypes } = Sequelize;

const DetailTransaction = db.define(
	"detail_transaction",
	{
		id_detail: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
		id_transaction: {
            type: DataTypes.INTEGER,
			allowNull: false,
        },
		id_product: {
            type: DataTypes.INTEGER,
			allowNull: false,
        },
		amount: {
            type: DataTypes.INTEGER,
			allowNull: false,
        }
	},
	{
		freezeTableName: true,
	}
);

module.exports = DetailTransaction;

(async () => {
	await db.sync();
})();
