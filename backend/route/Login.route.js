import express from 'express';
import { passportGoogleAuthenticate , passportGoogleCallBack } from '../controllers/Login.controller.js';
import { ensureUserIsAuthenticated } from '../middlewares/auth.middleware.js';

export const router = express.Router();


router.get('/me',ensureUserIsAuthenticated,(req,res)=>{
    console.log('isAuthenticated : true');
    return res.status(200).json(req.user);
})

router.get('/auth/google',passportGoogleAuthenticate);

router.get('/auth/google/callback',passportGoogleCallBack,(req,res)=>{
    res.redirect('http://localhost:5173')
})

router.get('/logout',(req,res)=>{

        req.logout((error)=>{
            if(error) return res.status(401).json({error});
        })
        console.log('logout successfull');
        return res.status(200).send();
    
})