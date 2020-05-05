const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const userRouter = require("./backend/router/user")
const adminRouter = require("./backend/router/admin")

app = express();

//app middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const db = "mongodb://localhost/shelter_for_good" || process.env.MONGODB_URI
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log("Data base connected to " + db)
    })
    .catch((err) => {
        console.log(err)
    })

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./backend/config/passport")(passport);
// Routes to call the api
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("Server is listening on " + port)
})
