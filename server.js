require('dotenv').config();
const express  = require("express");
const app = express();
const authRouter = require("./router/auth_rout");
const connectDb =  require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
//middleware for the usae of json
app.use(express.json());

//to mount the router in the express app 
app.use("/auth", authRouter);


app.use(errorMiddleware);


const PORT = 5000;

connectDb().then(()=>{
   
    app.listen(PORT, () =>{
        console.log(`server is running at port: ${PORT} `);
    });
});