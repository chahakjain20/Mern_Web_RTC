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

        res.cookie('refreshtoken',refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie('accesstoken',accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });


        const userDto = new UserDto(user);
        res.json({ user:userDto,auth:true});


    }

}

module.exports = new AuthController();