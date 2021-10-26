function getError(err) {

    // On production return general error without secured data:
    if(config.isProduction) {
        return "Some error occurred, please try again later.";
    }

    // On development return the original error:
    return err.message;
}

module.exports = {
    getError
};
