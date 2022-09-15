const Categories = require("../Models/categoryModel.js")
const errHandler =  require("../Helpers/error_helper.js")

// Create/update Categories
const upsertCategories = async (req, res, next) => {
	try {
		let results = await Categories.upsert(req.body, { where: { id: req.params.id } });
        results=JSON.parse(JSON.stringify(results[0]));
		res.app.locals.Categories = results;
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
		let results = await Categories.findAll();
		if(results == ""){
            res.app.locals.Categories = {
                msg: "no category exist"
            };
        }else{
            results=JSON.parse(JSON.stringify(results));
            res.app.locals.Categories = results;
        }
        
	} catch (error) {
		res.status(500).json(error.message);
	}
    next();
};

//DELETE Categories
const deleteCategoriesById = async (req, res) => {
	try {
		// check if the requested record exist, if exist delete
		const isExist = await Categories.findOne({ where: { id: req.body.id } });
		if(isExist){
			const result = await Categories.destroy({ where: { id: req.body.id } });
			if(result){
				res.status(200).json({ msg: "Delete berhasil" });
			}
		}else{
			res.status(404).json({error: "Data tidak ada pada tabel"});
		}
	} catch (error) {
		res.status(500).json(errHandler(error));
	}
};

module.exports = {
    upsertCategories,
    getCategoriesById,
    deleteCategoriesById,
    getCategories
}