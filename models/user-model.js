

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: { 
        type:String, 
        require:true,
    } ,
    email:{ 
        type : String,          
        require: true,
    },
    phone: {
        type: String,
        require: true,
    
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
});

userSchema.pre("save", async function (next){
    const user = this;

    if (!user.isModified("password")){
       next();
    }

    try {
        const saltRound =  await bcrypt.genSalt(10);
        const hash_password =  await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }

});

userSchema.methods.comparepass = async  function (password){
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
            {
            userID: this._id.toString(),
            email: this.email, 
            isAdmin: this.isAdmin,

             },
             process.env.TOKEN_KEY_VALUE,
             {
                expiresIn: "30d", //token will be valid for 30 days
            }
        );
    } catch (error) {
        console.error(error);
        
    }
};



//define the model or the collection name 
const User = new mongoose.model("User",userSchema);
module.exports=User;