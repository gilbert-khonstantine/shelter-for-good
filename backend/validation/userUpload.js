const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateUserUpload(data) {
    let errors = {};
    data.address = !isEmpty(data.address) ? data.address : "";
    data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";
    data.date = !isEmpty(data.date) ? data.date : "";

    if (Validator.isEmpty(data.address)) {
        errors.address = "Address is required"
    }

    if (Validator.isEmpty(data.zipCode)) {
        errors.zipCode = "Zip Code is required"
    }

    if (Validator.isEmpty(data.date)) {
        errors.date = "Date is required"
    }
    return ({
        errors,
        isValid: isEmpty(errors)
    })
}