const mongoose = require('mongoose')
//user schema
const userSchema = mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    picture:{type:String},
    userId:{type:String}
},{
    versionKey:false
})
// user model
const UserModel = mongoose.model("user",userSchema)

module.exports={
    UserModel
}