import { create } from 'zustand';
import axios from '../axios.js'
import { Navigate } from 'react-router';

export const ensureAuthenticated = create((set)=>({
    isAuthenticated : false,
    setIsAuthenticated : (authStatus)=>set({isAuthenticated : authStatus}),
    getAuthStatus : async()=>{
        try {
            const res = await axios.get('/login/me',{withCredentials:true});
            if(res.status === 200){
                set({isAuthenticated : true});
                return true;
            }
            else {
                set({isAuthenticated : false});
                return false;
            }
        } catch (error) {
            set({isAuthenticated : false});
            return error;
        }
    },
    handleLogout : async()=>{
        const res = await axios.get('/login/logout',{withCredentials:true});
        try{
        if(res.status==200){
            set({isAuthenticated : false});
            console.log('Logged out successfully');
            return true;
        }
        }catch(error){
            set({isAuthenticated : false});
            console.log(error);
            return true;
        }
    }
}))