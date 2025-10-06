const mongoose = require("mongoose");
const USER = require("../model/auth");
const PRODUCT = require("../model/product");
const SUBS = require("../model/subscribe");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "mySuperSecretKey_1807@$";
const bcrypt = require("bcrypt");
const {hashPassword, compareWithhashed} = require("../util/bcrypt")
const {createToken} = require("../util/auth");
const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");

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
        if(!email || !password) return res.status(400).json({msg:"Credentials are required"});

        
            const user = await USER.findOne({email});
            if(!user) return res.status(404).json({msg:"User not Found"});

            const compare = await compareWithhashed(password, user.password);
            if(compare){
            const token = await createToken(user);

            res.cookie("token", token, {
                httpOnly:true,
                path:"/"
            }).status(200).json({msg:"Login Successful", user:user})
        }
        else return res.status(404).json({msg:"Invalid Credentials"});
      

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

async function handleProduct(req,res){
    
    try {
        const category = req.params.cat;
        const response = await PRODUCT.find({category:category});

        if(response){
           return res.status(200).json({msg:"Product fetched Successfully", product:response});
        }
        return res.status(400).json({msg:"Invalid Category"});

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

async function handleSubscribe(req,res){

    // const testAccount = await nodemailer.createTestAccount();

    // const transporter = await nodemailer.createTransport({
    //     host:"smtp.ethereal.email",
    //     port:587,
    //     secure:false,
    //     auth:{
    //         user:testAccount.user,
    //         pass:testAccount.pass,
    //     },
    // })

    const {email, username} = req.body;
    const checkSub = await SUBS.findOne({subscribedEmail:email});

    if(checkSub)
        return res.status(409).json({msg:"Already subscribed"});
    


    let emailHtml = '';

    try {
        const filePath = path.resolve(__dirname, '..', 'util', 'subscribeMail.html');
        emailHtml = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        console.log("Internal error in reading html: ", error);
    }

    try {
        const transporter = await nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"tusharverma1807@gmail.com",
        pass:"ytqeeqfnmjyawyke"
    }
    })
    
    const info = await transporter.sendMail({
        from:"<tusharverma1807@gmail.com>",
        to:email,
        subject:"Subscribed",
        // text:`Congratulations! You have subscribed to Snapmart`,
        html:`
        Congratulations🎉. ${username.toUpperCase()} you have successfully subscribed Snapmart.
        ${emailHtml}`
    })

    await SUBS.create({
        subscribedEmail:email,
    });
    return res.status(201).json({msg:"Subscription added successfully"});
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

async function handleProductDetail(req,res){
    try {
        const productId = parseInt(req.params.id);              //In DB it Product Id is a number

        console.log(productId);
        const productDetails = await PRODUCT.findOne({id:productId});
        console.log(productDetails);
        
        if(!productDetails) return res.status(404).json({msg:"Product not found"});
        else
        return res.status(200).json({msg:"Product details found", product:productDetails})
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

async function handleCartItems(req, res){
    try {
        const pid = parseInt(req.headers.id);
        const cartProduct = await PRODUCT.findOne({id:pid});

        if(!cartProduct) return res.status(404).json({msg:"Product not found"});
        else return res.status(200).json({msg:"Product Found", product:cartProduct});
    } catch (error) {
        return res.status(500).json({msg:"Internal server Error"});
    }
}

module.exports = {

    handleCreateNewUser,
    handleValidateLogin,
    handleHomepage,
    handleLogout,
    handleProduct,
    handleSubscribe,
    handleProductDetail,
    handleCartItems
}