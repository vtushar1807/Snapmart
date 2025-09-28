const mongoose = require("mongoose");
const USER = require("../model/auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "mySuperSecretKey_1807@$";
const bcrypt = require("bcrypt");
const {hashPassword, compareWithhashed} = require("../util/bcrypt")
const {createToken} = require("../util/auth");

async function handleCreateNewUser(req, res){

        try {
            const {username, email, password} = req.body;

            if(!username || !email || !password) return res.status(400).json({msg:"Credentials are required"});

            const user = await USER.findOne({email});
            if(user) return res.status(200).json({msg:"User already exists"});

                const hashedPassword = await hashPassword(password);   //calling function to 'hash' the input password by user

                const userObj = {
                    username:username,
                    email:email,
                    password:hashedPassword,
                }
                await USER.create(userObj);
                return res.status(201).json({msg:"New User Created", user:userObj});
            
        } catch (error) {
            return res.status(500).json({msg:"Internal Server Error"});
        }
}

async function handleValidateLogin(req,res){
    try {
        const{email, password} = req.body;
        if(!email || !password) return res.status(200).json({msg:"Credentials are required"});

        const user = await USER.findOne({email});


        if(!user) return res.status(200).json({msg:"Invalid Credentials"});

            const compare = await compareWithhashed(password, user.password);

            const token = await createToken(user);

            res.cookie("token", token, {
                httpOnly:true,
                path:"/"
            }).status(200).json({msg:"Login Successful", user:user})


    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

function handleHomepage(req,res){

    try {
        const token = req.cookie.token;
        if(!token) return res.status(200).json({msg:"Authorization Failed"});

        const isverified = jwt.verify(token, SECRET_KEY);
        if(isverified && isverified.length>0) return res.status(200).json({msg:"Authorization Successful", isverified:true});
        else return res.status(401).json({msg:"User is not authorized"});

    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

async function handleLogout(req, res){

    return res.clearCookie("token", {
            httpOnly:true,
            path:"/"
    }).status(200).json({msg:"Logged Out Successfully"});

}

module.exports = {

    handleCreateNewUser,
    handleValidateLogin,
    handleHomepage,
    handleLogout
}