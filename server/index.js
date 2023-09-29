const express = require('express')
const cors = require('cors')
const app = express()
const { userRoute } = require('./routes/userRoute.route')
const { connection } = require('./db')
const { TodoRouter } = require('./routes/TodoRouter.route')
const {passport}=require("./routes/google_auth")
const jwt = require("jsonwebtoken")
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use('/users',userRoute)
app.use('/todo',TodoRouter)

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login", // Redirect to login page if authentication fails
        session: false,
    }),
    (req, res) => {
        const user = req.user;
        // Handle successful authentication
        const token = jwt.sign({userId:user._id, user: user }, process.env.secret_key);
        const redirectUrl = `http://localhost:3000/success?token=${token}&username=${user.username}&picture=${user.picture}&id=${user._id}`;
        res.redirect(redirectUrl);
    }
);

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server run at ${process.env.port}`)
    } catch (error) {
        console.log(error.message)
    }
})
