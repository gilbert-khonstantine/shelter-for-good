const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = "secret"
// Load input validation
const validateRegistration = require("../validation/register");
const validateLogin = require("../validation/login");
// Load User model
const Admin = require("../models/admin-model");
// Load User model
const User = require("../models/user-model");
// Load Upload model
const userUpload = require("../models/userUpload-model")


router.post("/signup", (req, res) => {
    const { errors, isValid } = validateRegistration(req.body);
    // make sure input is correct
    if (!isValid) {
        return res.status(400).json(errors)
    }

    Admin.findOne({ email: req.body.email }).then(admin => {
        if (admin) {
            return res.status(400).json({ email: "email already exists" })
        } else {
            const newAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // encrypt the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAdmin.password = hash;
                    newAdmin
                        .save()
                        .then(admin => res.json(admin))
                        .catch(err => console.log(err));
                });
            });
        }
    })

})

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const password = req.body.password;
    Admin.findOne({ email: req.body.email }).then(admin => {
        if (!admin) {
            return res.status(400).json({ email: "email does not exist" })
        }

        bcrypt.compare(password, admin.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: admin.id,
                    name: admin.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        return res.status(200).json({
                            success: true,
                            token: "Bearer " + token,
                            id: admin._id,
                            domain: "admin"
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    })
})

router.get("/getAllUploads", (req, res) => {
    userUpload.find({}, (err, data) => {
        if (!data) {
            res.status(404).json("error")
        } else {
            res.json(data)
        }
    })
})

router.get("/getAllUsers", (req, res) => {
    User.find({}, (err, user) => {
        if (!user) {
            res.status(404).json("No User in database")
        } else {
            res.status(200).json(user)
        }
    })
})


module.exports = router