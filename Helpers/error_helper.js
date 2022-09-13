
module.exports = function errHandler(err){
    if (err.name == "SequelizeValidationError") {
        const error = {};
        err.errors.map( e => {
            error[e.path] = e.message;
        });

        return error;
    }
    if (err.name == "SequelizeDatabaseError") {
        return  { error: "ada kesalahan pada request field" };
    }

    return err;
}