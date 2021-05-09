const User = require("../models/user")
const { validationResult } = require("express-validator")
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")  


exports.adminAccess = async(req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user.id
        })
        if(user.isAdmin === 0)
            return res.status(status(400).json({
                msg : "Not a valid Admin"
            }))
        next()
    } catch(err){
        return res.status(500).json({msg : err.message})
    }
}

exports.signup = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    console.log(user);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "Unable to add the user : " + err
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
        const { _id, name, email, profileImgUrl, isAdmin } = user
        return res.json({
            "status": "Success",
            token,
            user: {
                _id,
                name,
                email,
                isAdmin,
                profileImgUrl
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

exports.users = (req, res) => {
    User.find({}, (err, user) => {
        if(err){
            return res.status(400).json({
                error: "No user is found"
            })
        }

        // Send response
        return res.json({
            "status": "Success",
            user: user
        })
    })
}

exports.getsingleuser = (req, res) => {
    User.findOne({"_id": req.params.id}, (err, user) => {
        if(err){
            return res.status(400).json({
                error: "No user is found"
            })
        }

        // Send response
        return res.json({
            "status": "Success",
            user: user
        })
    })
}

exports.tindercards = (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            return res.status(400).json({
                error: "No user is found"
            })
        }

        var map = []

        console.log(users)

        
        users.forEach(function(user) {
            map.push({"name": user.name, "url": user.profileImgUrl})
          })

        // Send response
        return res.json({
            user: map
        })
    })
}



// Array.prototype.unique = function(array1, array2) {
//     var array1 = this.concat();
//     for(var i=0; i<a.length; ++i) {
//         for(var j=i+1; j<a.length; ++j) {
//             if(a[i] === a[j])
//                 a.splice(j--, 1);
//         }
//     }

//     return a;
// };


exports.tinderfilteredcards = (req, res) => {

    var filteredIds = []
    User.findOne({'_id': req.params.id}, (err, passedUser) => {
        if(err){
            return res.status(400).json({
                    error: err
            })
        }

        filteredIds = filteredIds.concat(passedUser.leftSwipes)
        filteredIds = filteredIds.concat(passedUser.rightSwipes)
    });
    User.find({}, (err, users) => {
        if(err){
            return res.status(400).json({
                error: "No user is found"
            })
        }

        var map = []

        users.forEach(function(user) {
            if(user._id != req.params.id && !filteredIds.includes(''+user._id)){
                map.push({"name": user.name, "url": user.profileImgUrl})
            }
            
          })

        // Send response
        return res.json({
            user: map
        })
    })
}


exports.rightswipeupdate = (req, res) => {
    const { idfrom, idto } = req.body
    let ids = [idfrom, idto]
    User.find({'_id': { $in: ids}}, (err, users) => {
        if(err){
            return res.status(400).json({
                error: "No user is found"
            })
        }

        //update rightswipe of user 1
        User.updateOne({'_id': idfrom}, { '$addToSet' : { rightSwipes: idto} }, (err, users) => {
            if(err){
                return res.status(400).json({
                    error: "No user is found during update"
                })
            }

        })

        if(users[1].rightSwipes.includes(idto)){
            console.log("It's a match")
            //update matches of user 1
            User.updateOne({'_id': idfrom}, { '$addToSet' : { matches: idto} }, (err, users) => {
                if(err){
                    return res.status(400).json({
                        error: "No user is found during update"
                    })
                }


            })

            //update matches of user 2
            User.updateOne({'_id': idto}, { '$addToSet' : { matches: idfrom} }, (err, users) => {
                if(err){
                    return res.status(400).json({
                        error: "No user is found during update"
                    })
                }


            })
        }

        if(users[0].leftSwipes.includes(idto)){
            console.log("remove left swipe")
            User.updateOne({'_id': idfrom}, { '$pullAll' : { leftSwipes: idto} }, (err, users) => {
                if(err){
                    return res.status(400).json({
                        error: "No user is found during update"
                    })
                }


            })
        }


        // Send response
        return res.json({
            "status": "Success"
        })
    })
}


exports.leftswipeupdate = (req, res) => {
    const { idfrom, idto } = req.body
    let ids = [idfrom, idto]
    User.find({'_id': { $in: ids}}, (err, users) => {
        if(err){
            return res.status(400).json({
                error: "No user is found"
            })
        }

        //update leftswipe of user 1
        User.updateOne({'_id': idfrom}, { '$addToSet' : { leftSwipes: idto} }, (err, users) => {
            if(err){
                return res.status(400).json({
                    error: "No user is found during update"
                })
            }

        })


        if(users[0].rightSwipes.includes(idto)){
            console.log("remove right swipe")
            User.updateOne({'_id': idfrom}, { '$pullAll' : { rightSwipes: idto} }, (err, users) => {
                if(err){
                    return res.status(400).json({
                        error: "No user is found during update"
                    })
                }


            })
        }


        // Send response
        return res.json({
            "status": "Success"
        })
    })
}


exports.unmatch = (req, res) => {
    const { idfrom, idto } = req.body
    let ids = [idfrom, idto]
    User.find({'_id': { $in: ids}}, (err, users) => {
        if(err){
            return res.status(400).json({
                error: "No user is found"
            })
        }

        //update maches of user 1
        User.updateOne({'_id': idfrom}, { '$pull' : { matches: idto, rightSwipes: idto} }, (err, users) => {
            if(err){
                return res.status(400).json({
                    error: "No user is found during update"
                })
            }

        })


        // Send response
        return res.json({
            "status": "Success"
        })
    })
}


exports.updateprofile=(req,res)=> {
    console.log("Req body is:")
    console.log(req)
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    let data = req.body
    // console.log(user);
    const filter= req.params.id;
    // console.log(data);
    User.updateOne({'_id':filter},{ '$set': {name:data.name, lastname: data.lastname,bio:data.bio, profileImgUrl:data.profileImgUrl}}, function(err, data){
        if(err){
            return res.status(400).json({
                error: "No user is found"
            })
        }

        // Send response
        return res.json({
            "status": "User updated successfully",
            data: data
        })
    });
}

exports.mymatches = (req, res) => {

    matchesArray = []
    var map = []

    User.findOne({'_id': req.params.id}, (err, user) => {
        console.log(user.matches)
        matchesArray.push(user.matches)
    })

    // newMatchesArray = []

    // matchesArray.forEach((match) => {
    //     newMatchesArray.push(String(match))
    // })

    User.find({'_id': { $in: matchesArray}}, (err, matchedUsers) => {
        if(err){
            return res.status(400).json({
                    error: err
            })
        }

        console.log(typeof (matchesArray))
        console.log("Matched users"+matchedUsers)
        matchedUsers.forEach(function(user) {
             map.push({"name": user.name, "url": user.profileImgUrl, "bio": user.bio})

          })

        
    });
    

        // Send response
        return res.json({
            user: map
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