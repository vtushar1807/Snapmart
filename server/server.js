const express = require("express");
const app = express();

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const logoutRoute = require("./routes/logout");

const {handleLogout} = require("./controllers/index")
const {connectMongodb} = require("./connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

connectMongodb('mongodb://127.0.0.1:27017/snapmart')
        .then(() => console.log("MongoDB Connected"))
        .catch(() => console.log("MongoDB not Connected"));


app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.post("/logout", handleLogout);
app.use("/", userRoute);

app.listen(1001, (err)=>{

    if(err)
        console.log("Error: ". err);
    else
        console.log("Server started at PORT 1001");
})