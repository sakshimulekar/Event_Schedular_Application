const express = require('express')
const { UserModel } = require('../model/userModel.model')
const userRoute = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { blacklist } = require('../blacklist')

//user register


userRoute.post("/register",async(req,res)=>{
    const {email,password} = req.body
    try {
        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({msg:"already registered!"})
        }
        if(!checkPass(password)){
            return res.status(400).json({msg:'invalid credential'})
        }
        const hash = await bcrypt.hash(password,10);
        const newUser = new UserModel({...req.body,password:hash})
        await newUser.save()
        return res.status(200).json({msg:"registered successfully",user:newUser})
    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
})


//user login
userRoute.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        console.log(user)
        if(user){
            console.log('found')
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    const token = jwt.sign({userId:user._id},process.env.secret_key)
                    console.log(token)
                    return res.status(200).json({msg:'login success',user,token})
                }
                else{
                    return res.status(400).json({err:'invalid credential'})
                }
            })
            //return res.status(200).json({msg:"user found"})
        }
        else {
            console.log('not found')
            return res.status(200).json({msg:"user not found,please Register first"})
        }
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({msg:error.message})
    }
})

userRoute.get("/logout",(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        console.log(token)
        blacklist.push(token)
        return res.status(200).json({msg:"Logout successfull!!"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})
//password validation
const checkPass=(password)=>{
    if(password.length < 8){
        return false;
    }
    let alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let nums="0123456789"
    let spec="[]{}!@#$%^&*()_-+=~`";
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    
    for(let i=0; i<password.length; i++){
        if(alpha.includes(password[i])){
            flag1 = true
        }
        if(nums.includes(password[i])){
            flag2 = true
        }
        if(spec.includes(password[i])){
            flag3 = true
        }
    }
    return flag1 && flag2 && flag3 ? true : false
}

module.exports={
    userRoute
}