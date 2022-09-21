const Products = require("../Models/productModel.js")
const errHandler =  require("../Helpers/error_helper.js");
const Categories = require("../Models/categoryModel.js");

// Create/update Products
const upsertProducts = async (req, res, next) => {
	try {
		let result = await Products.upsert(req.body, { where: { id_product: req.body.id_product } });
        result=JSON.parse(JSON.stringify(result[0]));
		res.app.locals.Products = result;
		res.app.locals.msg = "Success! Data has been saved";
	} catch (error) {
		res.app.locals.Categories=JSON.parse(JSON.stringify(errHandler(error)));
	}
    next();
};


// GET all data Products
const getProducts = async (req, res, next) => {
	try {
		let result = await Products.findAll(
            { include: Categories },
            { order:[["id_product",'DESC']] }
        );
		if(result == ""){
            res.app.locals.Products = {
                error: "no product exist"
            };
        }else{
            result=JSON.parse(JSON.stringify(result));
            res.app.locals.Products = result;
			
        }
        
	} catch (error) {
		
	}
    next();
};


//DELETE Products
const deleteProductsById = async (req, res,next) => {
	try {
		// check if the requested record exist, if exist delete
		const isExist = await Products.findOne({ where: { id_product: req.params.id } });
		if(isExist){
			const result = await Products.destroy({ where: { id_product: req.params.id } });
			if(result){
				res.app.locals.Products = {msg: "data berhasil dihapus"};
				res.app.locals.msg = "Success! Data has been deleted";
			}
		}else{
			res.app.locals.Products = {error: "Data tidak ada pada tabel"};
		}
	} catch (error) {
		res.app.locals.Products=JSON.parse(JSON.stringify(errHandler(error)));
	}
	next();
};


const uploadFIle = async(req,res,next)=>{
    try {
        console.log(req.files)
        if(!req.files) {
            next();
        } 
        else {
            let productImg = req.files.productImg;
            let imgFormat = productImg.name;
            imgFormat = imgFormat.split(".").pop();
            let imgName = "product"+Number(res.app.locals.Products.id_product)+"."+imgFormat;
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            productImg.mv('./uploads/' + imgName);
            Products.update({photo : imgName},{where: {id_product : res.app.locals.Products.id_product}})
            next()
        }
    } catch (err) {
        
    }
}

module.exports = {
    upsertProducts,
    deleteProductsById,
    getProducts,
    uploadFIle,
}