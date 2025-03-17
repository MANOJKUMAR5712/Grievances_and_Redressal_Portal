import express from 'express';
import passport from 'passport';
import '../services/passport.service.js'

export const passportGoogleAuthenticate = passport.authenticate('google',{scope:['profile','email']});

export const passportGoogleCallBack = passport.authenticate('google',{failureRedirect:false});
