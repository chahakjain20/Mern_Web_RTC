const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req,res) =>{
    try {
        const {username,mail,password} = req.body;

        // check if user exists
        const userExists = await User.exists({mail:mail.toLowerCase()});

        if(userExists){
            return res.status(409).send('Email already exist!');
        };

        //encrypt the password before saving in db
        const encryptedPassword = await bcrypt.hash(password,10);

        //create user and save it in db
        const user = await User.create({
            username,
            mail:mail.toLowerCase(),
            password:encryptedPassword,
        });

        //create a JWT token able to access protected route
        const token = jwt.sign(
            {
                userId: user._id,
                mail
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:'24h'
            }

        );
        
        res.status(201).json({
            userDetails:{
                mail:user.mail,
                token:token,
                username:user.username,
            }
        })
    } catch (error) {
        return res.status(500).send("Error Occured please try again!")
    }
};

module.exports = postRegister;