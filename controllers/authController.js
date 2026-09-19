import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService.js";
import jwt from "jsonwebtoken";
// signup controller

const SigupController = async(req, res) =>{
      try {
           const user = new UserModel(req.body);
           await user.save();
        res.status(200).json({
            message: "Signup Successful"
        })
      } catch (error) {
        res.status(500).json({
            message: "Error occurred while signing up"
        })
      }
}

// signup controller end

// login controller

const LoginController = async(req, res) =>{
      try {
          const {email, password} = req.body;
          const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({       
        message: "User not found"
        })
    }

       const Match = await bcrypt.compare(password, user.password)

       if(!Match){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
       }
        
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)
        
        res.cookie('refreshtoken', refreshToken ,{httpOnly: true})

        res.status(200).json({message: "Login Successful", accesstoken: accessToken})
      } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error occurred while logging in"
        })
      }
}

// login controller end

// refresh token controller

const RefreshTokenController = async(req,res)=>{
       
      const refreshToken = req.cookies.refreshtoken

      if(!refreshToken) {
        return res.status(401).json({
            message: "Refresh Token not found"
        })
      }

    try {
           const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
           const newAccessToken = generateAccessToken(decoded.id)

           res.status(200).json({
            message: "Access Token generated successfully",
            accessToken: newAccessToken
           })

       } catch (error) {
        res.status(403).json({
            message: "Invalid Refresh Token"
        })
       }
}

// refresh token controller end

// logout controller

const logoutController = async(req,res)=>{
    try {
        res.clearCookie('refreshtoken')
        res.status(200).json({
            message: "Logout Successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error occurred while logging out"
        })
    }
}

// logout controller end




export { SigupController, LoginController, RefreshTokenController, logoutController }