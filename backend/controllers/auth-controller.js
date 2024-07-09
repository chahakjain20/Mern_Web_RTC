const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dtos')

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({
                message: 'Phone field is required!'
            });
        }


        //generate otp 
        const otp = await otpService.generateOtp();

        //Hash Otp 
        const ttl = 1000 * 60 * 2; // expire time
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        //sent otp
        try {
            //await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "message sending failed"
            });
        }

    }

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;

        if (!otp || !phone || !hash) {
            res.status(400).json({
                message: "All fields are required"
            });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({
                message: "OTP expired"
            });
        }

        const data = `${phone}.${otp}.${expires}`;

        const isValid = otpService.verifyOtp(hashedOtp, data);

        if (!isValid) {
            res.status(400).json({
                message: "Invalid OTP"
            })
        }

        let user;


        try {
            user = await userService.findUser({ phone: phone });
            if (!user) {
                user = await userService.createUser({ phone: phone });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Db Error"
            });
        }

        // Token generation
        const { accessToken, refreshToken} = tokenService.generateTokens({_id:user._id,activated:false});

        // storing refresh token in db
         await tokenService.storeRefreshToken(refreshToken,user._id);

        res.cookie('refreshToken',refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie('accessToken',accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });


        const userDto = new UserDto(user);
        res.json({ user:userDto,auth:true});


    }
    async refresh(req,res){
        //get refresh token from cookie/header
        const {refreshToken: refreshTokenFromCookie} = req.cookies;

        //check if token is valid 
        let userData;
        try {
           userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);

        } catch (error) {
            return res.status(401).json({message:'Invalid Token'});

        }
        // is refresh token is in database or not 
        try {
            const token = await tokenService.findRefreshToken(
                userData._id,
                refreshTokenFromCookie
            );
            
            if(!token){
                return res.status(401).json({
                    messagse:"invalid Token"
                });
            }
        } catch (error) {
            return res.status(500).json({
                messagse:"internal Error"
            })
        }
        //check if valid user
        const user = userService.findUser({_id:userData._id});
        if(!user){
            return res.status(404).json({
                messagse:"User not found"
            });

        }
        //generate new tokens - access and refresh
        const {refreshToken,accessToken} = tokenService.generateTokens({
            _id:userData._id,

        });

        //update refresh token
        try {
           await tokenService.updateRefreshToken(userData._id,refreshToken);
        } catch (error) {
            return res.status(500).json({
                messagse:"internal Error"
            })
            
        }
         // cookie ke andar daalo 
         
        res.cookie('refreshToken',refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie('accessToken',accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        //response
        const userDto = new UserDto(user);
        res.json({ user:userDto,auth:true});
         
    }

    async logout(req,res){
        const {refreshToken} = req.cookies;
        //delete refresh token from db
        await tokenService.removeToken(refreshToken);
        // delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({user:null,auth:false});

    }

}

module.exports = new AuthController();