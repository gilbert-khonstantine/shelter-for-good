const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs")
const keys = "secret"
// Load validations
const validateRegistration = require("../validation/register");
const validateLogin = require("../validation/login");
const validateUserUpload = require("../validation/userUpload")
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
    const password = req.body.password;
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: "email does not exist" })
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
                        // expiresIn: 31556926 // 1 year in seconds
                        expiresIn: 3600 // 1 hr in seconds
                    },
                    (err, token) => {
                        return res.status(200).json({
                            success: true,
                            token: "Bearer " + token,
                            id: user._id,
                            domain: "user"
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


router.post("/upload", (req, res) => {
    console.log(req.file)
    const { errors, isValid } = validateUserUpload(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    } else {
        const newUpload = new userUpload({
            address: req.body.address,
            zipCode: req.body.zipCode,
            personID: req.body.personID,
            coordinates: req.body.viewport,
            date: req.body.date,
            description: req.body.description
        })

        if (req.body.photo && req.body.photo.length > 0) {
            console.log("img sent")
            console.log(req.body.photo)
            newUpload.img.data = fs.readFileSync(req.body.photo.path)
            newUpload.img.contentType = "image/png";
        }
        newUpload
            .save()
            .then(upload => res.json(upload))
            .catch(err => console.log(err));
    }
})

module.exports = router