const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegistration(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required"
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Password need to be reconfirmed"
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password is at least 6 characters long"
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match"
    }
    return ({
        errors,
        isValid: isEmpty(errors)
    })
}