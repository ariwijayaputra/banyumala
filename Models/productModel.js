const Sequelize = require("sequelize");
const db = require("../Config/Database.js")
const { DataTypes } = Sequelize;

const Products = db.define(
	"products",
	{
		id_product: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
		id_category: {
            type: DataTypes.INTEGER,
			allowNull: false,
        },
		name: {
            type: DataTypes.STRING,
			allowNull: false,
        },
		price:{
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		photo: {
			type: DataTypes.TEXT
		},
		description: {
			type: DataTypes.TEXT
		},
	},
	{
		freezeTableName: true,
	}
);

module.exports = Products;

(async () => {
	await db.sync();
})();
