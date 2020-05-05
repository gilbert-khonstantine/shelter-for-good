const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = "secret"
// Load input validation
const validateRegistration = require("../validation/register");
const validateLogin = require("../validation/login");
// Load User model
const User = require("../models/user-model");


router.post("/signup", (req, res) => {
    const { errors, isValid } = validateRegistration(req.body);
    // make sure input is correct
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "email already exists" })
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // encrypt the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
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

    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(400).json({ email: "email does not exist" })
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
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


module.exports = router