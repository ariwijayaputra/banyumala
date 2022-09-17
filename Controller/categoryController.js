const Categories = require("../Models/categoryModel.js")
const errHandler =  require("../Helpers/error_helper.js")

// Create/update Categories
const upsertCategories = async (req, res, next) => {
	try {
		let result = await Categories.upsert(req.body, { where: { id: req.params.id } });
        result=JSON.parse(JSON.stringify(result[0]));
		res.app.locals.Categories = result;
	} catch (error) {
		res.status(500).json(errHandler(error));
	}
    next();
};

// GET data Categories by id
const getCategoriesById = async (req, res) => {
	try {
		let result = await Categories.findOne({ where: { id: req.params.id } });
		if(!result){
            res.status(404).json({error: "data Categories tidak ditemukan"});
        }else
        res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

// GET data Categories by id
const getCategories = async (req, res, next) => {
	try {
		let result = await Categories.findAll({order:[["id_category",'DESC']]});
		if(result == ""){
            res.app.locals.Categories = {
                error: "no category exist"
            };
        }else{
            result=JSON.parse(JSON.stringify(result));
            res.app.locals.Categories = result;
        }
        
	} catch (error) {
		res.status(500).json(error.message);
	}
    next();
};

//DELETE Categories
const deleteCategoriesById = async (req, res,next) => {
	try {
		// check if the requested record exist, if exist delete
		const isExist = await Categories.findOne({ where: { id_category: req.params.id } });
		if(isExist){
			const result = await Categories.destroy({ where: { id_category: req.params.id } });
			if(result){
				res.app.locals.Categories = {msg: "data berhasil dihapus"};
			}
		}else{
			res.app.locals.Categories = {error: "Data tidak ada pada tabel"};
		}
	} catch (error) {
		res.app.locals.Categories=JSON.parse(JSON.stringify(errHandler(error)));
	}
	next();
};

module.exports = {
    upsertCategories,
    getCategoriesById,
    deleteCategoriesById,
    getCategories
}