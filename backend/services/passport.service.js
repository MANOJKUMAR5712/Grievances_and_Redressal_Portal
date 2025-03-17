import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/User.model.js";

passport.use(new GoogleStrategy({

            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:process.env.CALLBACK_URL

        },async(accessToken,refreshToken,profile,done)=>{
            try {
                const user = await User.findOne({googleId : profile.id});

                if(user){
                    return done(null,user);
                }

                return done(new Error('No User found'));

            } catch (error) {
                return done(error);
            }
}))

passport.serializeUser((user,done)=>{
    console.log(user);
    return done(null,user.googleId);
})

passport.deserializeUser(async(userId,done)=>{
    
    try {
        const userData = await User.findOne({googleId : userId});
        if(!userData){
            return done(new Error('User Not found'));
        }
        done(null,userData);
    } catch (error) {
        return done(error);
    } 
})