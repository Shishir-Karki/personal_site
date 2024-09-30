const User = require ("../models/user-model");

// homepage 
const home = async (req,res) => {
    try{
        res
        .status(200)
        .send("WElcome t the controllers part or i dk");

    } catch(error){
        //console.log(error)
        next(error);

    }
}

//register a user

const register = async (req,res) =>{
    try{
        console.log(req.body);
        const {username,email,password,phone}= req.body;

        const userExist =  await User.findOne({email});
        if(userExist) {
            //return res.status(400).json({msg: "Email is already in use"});
            next(error);

        }

        //hash the password 
        // const saltRound = 10; 
        // const hash_password = await bcrypt.hash(password,saltRound);
        //creating user  object to save into database
       const userCreated =  await User.create({
        username,
        email,
        password,
        phone
    });

        res.status(201).json({
            msg:"Registration Sucessful",
            token: await userCreated.generateToken(),
            userID : userCreated._id.toString() });
        
    }catch(error){
        res.status(500).json({message:"Error in Sending data"});
        
    }
}

//Login for the user
const login = async  (req,res)=>{
    try{
        const {email, password } = req.body;
// checking for email
        const userExist = await User.findOne({email});
        console.log(userExist);

        if (!userExist ) {
            return res.status(400).json({message : "Invalid Credentials"});

        }
    // checking for correct password 

    //const user = await bcrypt.compare(password, userExist.password);
    
    const user = await userExist.comparepass(password);

    if (user) {
    
        res.status(200).json({
            msg:"Login Sucessful",
            token: await userExist.generateToken(),
            userID : userExist._id.toString(), 
        });
    }else{
        //res.status(401).json({message:"Invalid email or password"});
        next(error);
    }

    }catch(error){
        res.status(500).json({message:"Server Error"})
        
    
    }
}

 




module.exports = { home, register,login };
