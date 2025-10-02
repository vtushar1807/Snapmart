const express = require("express");
const app = express();

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const productRoute = require("./routes/productRoute");
const logoutRoute = require("./routes/logout");

const {handleLogout} = require("./controllers/index")
const {connectMongodb} = require("./connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {handleSubscribe} = require("./controllers/index")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


connectMongodb('mongodb://127.0.0.1:27017/snapmart')
        .then(() => console.log("MongoDB Connected"))
        .catch(() => console.log("MongoDB not Connected"));


app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.post("/logout", handleLogout);
app.use("/product", productRoute);
app.post("/email/subscribe", handleSubscribe);
app.use("/", userRoute);


app.listen(1001, (err)=>{

    if(err)
        console.log("Error: ". err);
    else
        console.log("Server started at PORT 1001");
})