const User = require("../models/user")
const { validationResult } = require("express-validator")
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")  

exports.signup = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "Unable to add the user"
            })
        }

        return res.json({
            message: "Success!",
            user
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body

    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Email was not found!"
            })
        }

        // Authenticate the user
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Email and password don't match!"
            })
        }

        //create a token
        const token = jwt.sign({ _id: user._id}, process.env.SECRET)

        //put token in a cookie
        res.cookie('token', token, {expire: new Date() + 1})

        

        // Send response
        const { _id, name, email } = user
        return res.json({
            "status": "Success",
            token,
            user: {
                _id,
                name,
                email
            }
        })
    })

    
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    return res.json({
        message: "User signout successful"
    })
}


// exports.updatetoken = (req, res) => {
//     const { email, token } = req.body

//     User.findOneAndUpdate(
//         { email: email },
//         { $set: { token: token}},{upsert:true}).then((result, err) => {
//            return res.status(200).json({ data: result, message:"Value Updated" });
//        })
// }