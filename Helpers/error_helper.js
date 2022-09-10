export function errHandler(err) {
    if (err.name == "SequelizeValidationError") {
        const error = {};
        err.errors.map( e => {
            error[e.path] = e.message;
        });

        return error;
    }
    return err;
}